import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { runnerSource } from './source';
import { CurrentTest, RunInProgressError, RunStatus, RunSummary, TestResult } from './types';

type UiPhase = 'idle' | 'queued' | 'in_progress' | 'completed' | 'error';

interface RunnerContextValue {
  phase: UiPhase;
  conclusion: 'success' | 'failure' | null;
  progress: number; // 0..1
  elapsedMs: number;
  estimatedDurationMs: number;
  results: TestResult[];
  currentTest: CurrentTest | null;
  passed: number;
  failed: number;
  totalTests: number;
  lastSummary: RunSummary | null;
  history: RunSummary[];
  error: string | null;
  /** True while a run is active — disables the Run button. */
  locked: boolean;
  canRun: boolean;
  run: () => void;
}

const RunnerContext = createContext<RunnerContextValue | undefined>(undefined);

// The simulation is local and cheap, so poll fast enough that step-level
// theater (current test, viewport highlights) stays fluid.
const POLL_MS = 700;
const TICK_MS = 150;

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
  const [currentTest, setCurrentTest] = useState<CurrentTest | null>(null);
  const [totalTests, setTotalTests] = useState(0);
  const [lastSummary, setLastSummary] = useState<RunSummary | null>(null);
  const [history, setHistory] = useState<RunSummary[]>([]);
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

  const refreshHistory = useCallback(async () => {
    try {
      setHistory(await runnerSource.getHistory(6));
    } catch {
      /* non-fatal */
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
        project: 'Live demo suite',
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
      setError(e?.message || 'The test runner hit a snag.');
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
        totalTests: 0,
        completedTests: 0,
        phase: 'queued',
      };
      setEstimatedDurationMs(active.estimatedDurationMs);
      startTimers();
    } catch (e) {
      if (e instanceof RunInProgressError) {
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

  // On load: resume an in-flight run if one exists; seed the history list.
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
      if (alive) refreshHistory();
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
