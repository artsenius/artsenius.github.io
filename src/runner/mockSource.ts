import {
  ActiveRun,
  RunnerDataSource,
  RunInProgressError,
  RunStatus,
  RunSummary,
  TestResult,
} from './types';

// In-memory stand-in for the backend. Behaves like a real server:
// single active run (lock), state derived from elapsed wall-clock time so
// polling is deterministic, and finished runs feed the duration estimate.
// Swap this for an HTTP source later without touching the UI.

// The simple demo suite — these mirror the real Playwright specs that test
// THIS site's behavior (kept in sync with about-me-automation).
const SUITE: Array<{ suite: string; name: string }> = [
  { suite: 'hero.spec', name: 'boot sequence types and resolves' },
  { suite: 'hero.spec', name: 'name + CTAs reveal on load' },
  { suite: 'skills.spec', name: 'category filter narrows the grid' },
  { suite: 'experience.spec', name: 'timeline + achievements render' },
  { suite: 'personal.spec', name: 'gallery tiles reveal on scroll' },
  { suite: 'runner.spec', name: 'run is locked while in progress' },
  { suite: 'contact.spec', name: 'copy email writes to clipboard' },
  { suite: 'a11y.spec', name: 'sections expose aria labels' },
];

const QUEUE_MS = 2200; // time spent "queued" in GitHub Actions before running
const TAIL_MS = 1200; // wrap-up after the last test finishes
const DEFAULT_ESTIMATE_MS = 17000;

interface InternalRun {
  runId: string;
  startedAt: number;
  estimatedDurationMs: number;
  actualDurationMs: number;
}

let active: InternalRun | null = null;
const history: RunSummary[] = [];

const nextEstimate = (): number => {
  if (history.length === 0) return DEFAULT_ESTIMATE_MS;
  const recent = history.slice(0, 5);
  return Math.round(recent.reduce((s, r) => s + r.durationMs, 0) / recent.length);
};

// When does test i finish, relative to startedAt?
const testFinishTime = (i: number, run: InternalRun): number => {
  const window = run.actualDurationMs - QUEUE_MS - TAIL_MS;
  return QUEUE_MS + (window * (i + 1)) / SUITE.length;
};

const buildResults = (run: InternalRun, elapsed: number): TestResult[] => {
  const out: TestResult[] = [];
  for (let i = 0; i < SUITE.length; i++) {
    if (elapsed >= testFinishTime(i, run)) {
      const prev = i === 0 ? QUEUE_MS : testFinishTime(i - 1, run);
      out.push({
        id: `${run.runId}-${i}`,
        suite: SUITE[i].suite,
        name: SUITE[i].name,
        status: 'passed',
        durationMs: Math.round(testFinishTime(i, run) - prev),
      });
    }
  }
  return out;
};

const finalize = (run: InternalRun) => {
  const passed = SUITE.length;
  history.unshift({
    runId: run.runId,
    startedAt: run.startedAt,
    durationMs: run.actualDurationMs,
    conclusion: 'success',
    passed,
    failed: 0,
  });
};

const settle = (ms: number) => new Promise(r => setTimeout(r, ms));

export const mockSource: RunnerDataSource = {
  async getActive() {
    await settle(120);
    if (!active) return null;
    if (Date.now() - active.startedAt >= active.actualDurationMs) {
      finalize(active);
      active = null;
      return null;
    }
    return { runId: active.runId, startedAt: active.startedAt, estimatedDurationMs: active.estimatedDurationMs };
  },

  async trigger() {
    await settle(220);
    if (active && Date.now() - active.startedAt < active.actualDurationMs) {
      throw new RunInProgressError();
    }
    const estimate = nextEstimate();
    active = {
      runId: `run_${Date.now().toString(36)}`,
      startedAt: Date.now(),
      estimatedDurationMs: estimate,
      // Real runs vary; jitter ±12% so the optimistic bar genuinely reconciles.
      actualDurationMs: Math.round(estimate * (0.88 + Math.random() * 0.24)),
    };
    return { runId: active.runId, startedAt: active.startedAt, estimatedDurationMs: active.estimatedDurationMs };
  },

  async getStatus(runId: string): Promise<RunStatus> {
    await settle(150);
    if (!active || active.runId !== runId) {
      // Run already finished — report a completed status from history.
      const h = history.find(r => r.runId === runId);
      const done: RunStatus = {
        runId,
        phase: 'completed',
        conclusion: h?.conclusion ?? 'success',
        startedAt: h?.startedAt ?? Date.now(),
        finishedAt: (h?.startedAt ?? Date.now()) + (h?.durationMs ?? 0),
        estimatedDurationMs: h?.durationMs ?? DEFAULT_ESTIMATE_MS,
        totalTests: SUITE.length,
        completedTests: SUITE.length,
        results: [],
      };
      return done;
    }

    const run = active;
    const elapsed = Date.now() - run.startedAt;
    const results = buildResults(run, elapsed);
    let phase: RunStatus['phase'] = 'in_progress';
    if (elapsed < QUEUE_MS) phase = 'queued';
    if (elapsed >= run.actualDurationMs) phase = 'completed';

    const status: RunStatus = {
      runId: run.runId,
      phase,
      startedAt: run.startedAt,
      estimatedDurationMs: run.estimatedDurationMs,
      totalTests: SUITE.length,
      completedTests: results.length,
      currentTest:
        phase === 'in_progress' && results.length < SUITE.length
          ? SUITE[results.length]
          : null,
      results,
    };

    if (phase === 'completed') {
      status.conclusion = 'success';
      status.finishedAt = run.startedAt + run.actualDurationMs;
      finalize(run);
      active = null;
    }
    return status;
  },

  async getHistory(limit: number) {
    await settle(120);
    return history.slice(0, limit);
  },
};
