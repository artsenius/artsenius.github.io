import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { runnerSource } from './source';
import { httpSource } from './httpSource';
import { RunInProgressError, RunStatus, RunSummary, TestResult } from './types';

type UiPhase = 'idle' | 'queued' | 'in_progress' | 'completed' | 'error';

interface RunnerContextValue {
  phase: UiPhase;
  conclusion: 'success' | 'failure' | null;
  progress: number; // 0..1
  elapsedMs: number;
  estimatedDurationMs: number;
  results: TestResult[];
  currentTest: { suite: string; name: string } | null;
  passed: number;
  failed: number;
  totalTests: number;
  lastSummary: RunSummary | null;
  history: RunSummary[];
  /** True until the backend answers the first history fetch (cold start can take ~1 min). */
  historyLoading: boolean;
  githubRunUrl: string | null;
  error: string | null;
  /** True while any run is active (server truth) — disables the Run button. */
  locked: boolean;
  canRun: boolean;
  run: () => void;
}

const RunnerContext = createContext<RunnerContextValue | undefined>(undefined);

const POLL_MS = 4000;
const TICK_MS = 200;

interface RunMeta {
  runId: string;
  startedAt: number;
  estimatedDurationMs: number;
  totalTests: number;
  completedTests: number;
  phase: RunStatus['phase'];
}

export const RunnerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [phase, setPhase] = useState<UiPhase>('idle');
  const [conclusion, setConclusion] = useState<'success' | 'failure' | null>(null);
  const [progress, setProgress] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [estimatedDurationMs, setEstimatedDurationMs] = useState(0);
  const [results, setResults] = useState<TestResult[]>([]);
  const [currentTest, setCurrentTest] = useState<{ suite: string; name: string } | null>(null);
  const [totalTests, setTotalTests] = useState(0);
  const [lastSummary, setLastSummary] = useState<RunSummary | null>(null);
  const [history, setHistory] = useState<RunSummary[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [githubRunUrl, setGithubRunUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);

  const metaRef = useRef<RunMeta | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval>>();
  const tickRef = useRef<ReturnType<typeof setInterval>>();
  const progressRef = useRef(0);

  const stopTimers = useCallback(() => {
    if (pollRef.current) clearInterval(pollRef.current);
    if (tickRef.current) clearInterval(tickRef.current);
    pollRef.current = undefined;
    tickRef.current = undefined;
  }, []);

  // History always comes from the real backend: it holds the stored runs
  // (including legacy nightly ones) even while the run lifecycle is mocked.
  const refreshHistory = useCallback(async (): Promise<boolean> => {
    try {
      setHistory(await httpSource.getHistory(8));
      setHistoryLoading(false);
      return true;
    } catch {
      // Non-fatal: backend unreachable or still waking up.
      return false;
    }
  }, []);

  const applyStatus = useCallback((s: RunStatus) => {
    metaRef.current = {
      runId: s.runId,
      startedAt: s.startedAt,
      estimatedDurationMs: s.estimatedDurationMs,
      totalTests: s.totalTests,
      completedTests: s.completedTests,
      phase: s.phase,
    };
    setEstimatedDurationMs(s.estimatedDurationMs);
    setTotalTests(s.totalTests);
    if (s.results.length) setResults(s.results);
    setCurrentTest(s.currentTest ?? null);
    if (s.githubRunUrl) setGithubRunUrl(s.githubRunUrl);

    if (s.phase === 'queued') setPhase('queued');
    else if (s.phase === 'in_progress') setPhase('in_progress');
    else if (s.phase === 'completed') {
      setPhase('completed');
      setConclusion(s.conclusion ?? 'success');
      setCurrentTest(null);
      progressRef.current = 1;
      setProgress(1);
      setLocked(false);
      stopTimers();
      const passed = s.results.filter(r => r.status === 'passed').length;
      const failed = s.results.filter(r => r.status === 'failed').length;
      const finishedAt = s.finishedAt ?? Date.now();
      setLastSummary({
        runId: s.runId,
        startedAt: s.startedAt,
        durationMs: finishedAt - s.startedAt,
        conclusion: s.conclusion ?? (failed ? 'failure' : 'success'),
        passed,
        failed,
      });
      refreshHistory();
    }
  }, [refreshHistory, stopTimers]);

  const poll = useCallback(async () => {
    const meta = metaRef.current;
    if (!meta) return;
    try {
      applyStatus(await runnerSource.getStatus(meta.runId));
    } catch (e: any) {
      setError(e?.message || 'Lost connection to the test runner.');
    }
  }, [applyStatus]);

  // Smooth, monotonic, optimistic progress between polls.
  const tick = useCallback(() => {
    const meta = metaRef.current;
    if (!meta) return;
    const elapsed = Date.now() - meta.startedAt;
    setElapsedMs(elapsed);
    const optimistic = Math.min(elapsed / Math.max(meta.estimatedDurationMs, 1), 0.95);
    const serverFrac = meta.totalTests ? meta.completedTests / meta.totalTests : 0;
    const target = Math.min(Math.max(optimistic, serverFrac), 0.95);
    if (meta.phase !== 'completed') {
      const next = Math.max(progressRef.current, target);
      progressRef.current = next;
      setProgress(next);
    }
  }, []);

  const startTimers = useCallback(() => {
    stopTimers();
    tick();
    poll();
    tickRef.current = setInterval(tick, TICK_MS);
    pollRef.current = setInterval(poll, POLL_MS);
  }, [poll, tick, stopTimers]);

  const run = useCallback(async () => {
    if (locked || phase === 'queued' || phase === 'in_progress') return;
    setError(null);
    setResults([]);
    setConclusion(null);
    setGithubRunUrl(null);
    progressRef.current = 0;
    setProgress(0);
    setLocked(true);
    setPhase('queued');
    try {
      const active = await runnerSource.trigger();
      metaRef.current = {
        runId: active.runId,
        startedAt: active.startedAt,
        estimatedDurationMs: active.estimatedDurationMs,
        totalTests: metaRef.current?.totalTests ?? 0,
        completedTests: 0,
        phase: 'queued',
      };
      setEstimatedDurationMs(active.estimatedDurationMs);
      startTimers();
    } catch (e) {
      if (e instanceof RunInProgressError) {
        // Someone else's run is active — sync to it instead of erroring.
        const active = await runnerSource.getActive().catch(() => null);
        if (active) {
          metaRef.current = {
            runId: active.runId,
            startedAt: active.startedAt,
            estimatedDurationMs: active.estimatedDurationMs,
            totalTests: 0,
            completedTests: 0,
            phase: 'in_progress',
          };
          startTimers();
          return;
        }
      }
      setLocked(false);
      setPhase('error');
      setError((e as Error)?.message || 'Could not start the test run.');
    }
  }, [locked, phase, startTimers]);

  // On load: resume an in-flight run (and lock) if one exists, and start
  // warming the backend immediately. The Azure free tier falls asleep when
  // idle and the first request can take up to a minute, so we fire right at
  // page load (while the visitor reads the hero) and retry until it answers.
  useEffect(() => {
    let alive = true;
    (async () => {
      const active = await runnerSource.getActive().catch(() => null);
      if (alive && active) {
        metaRef.current = {
          runId: active.runId,
          startedAt: active.startedAt,
          estimatedDurationMs: active.estimatedDurationMs,
          totalTests: 0,
          completedTests: 0,
          phase: 'in_progress',
        };
        setEstimatedDurationMs(active.estimatedDurationMs);
        setLocked(true);
        setPhase('in_progress');
        startTimers();
      }
      for (let attempt = 0; attempt < 15 && alive; attempt++) {
        if (await refreshHistory()) break;
        await new Promise(res => setTimeout(res, 6000));
      }
      if (alive) setHistoryLoading(false);
    })();
    return () => {
      alive = false;
      stopTimers();
    };
  }, [refreshHistory, startTimers, stopTimers]);

  const passed = results.filter(r => r.status === 'passed').length;
  const failed = results.filter(r => r.status === 'failed').length;
  const canRun = !locked && phase !== 'queued' && phase !== 'in_progress';

  const value: RunnerContextValue = {
    phase,
    conclusion,
    progress,
    elapsedMs,
    estimatedDurationMs,
    results,
    currentTest,
    passed,
    failed,
    totalTests,
    lastSummary,
    history,
    historyLoading,
    githubRunUrl,
    error,
    locked,
    canRun,
    run,
  };

  return <RunnerContext.Provider value={value}>{children}</RunnerContext.Provider>;
};

export const useRunner = (): RunnerContextValue => {
  const ctx = useContext(RunnerContext);
  if (!ctx) throw new Error('useRunner must be used within a RunnerProvider');
  return ctx;
};
