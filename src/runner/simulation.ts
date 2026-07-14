import {
  ActiveRun,
  RunnerDataSource,
  RunInProgressError,
  RunStatus,
  RunSummary,
  SuiteTestDef,
  TestResult,
} from './types';

// Simulated test runner. A run is a schedule laid out against wall-clock
// time at trigger; getStatus derives everything from elapsed time, so
// polling is deterministic and survives re-renders. No backend involved —
// the "suite" mirrors the real checks a Playwright suite would make against
// this site, and the viewport renders the section under test live.

const SUITE: SuiteTestDef[] = [
  {
    suite: 'hero.spec',
    name: 'boot sequence types and resolves',
    section: 'hero',
    steps: [
      "page.goto('https://www.arthursenko.com')",
      'expect(bootLine).toBeVisible()',
      "expect(bootLine).toContainText('✓')",
    ],
    targets: [
      { x: 4, y: 4, w: 92, h: 90 },
      { x: 6, y: 8, w: 32, h: 7 },
      { x: 6, y: 8, w: 36, h: 7 },
    ],
  },
  {
    suite: 'hero.spec',
    name: 'name and call-to-actions reveal',
    section: 'hero',
    steps: [
      'expect(profileName).toBeVisible()',
      'expect(runTestsCta).toBeEnabled()',
      "expect(resumeLink).toHaveAttribute('href')",
    ],
    targets: [
      { x: 6, y: 18, w: 42, h: 34 },
      { x: 6, y: 66, w: 22, h: 9 },
      { x: 30, y: 66, w: 22, h: 9 },
    ],
  },
  {
    suite: 'skills.spec',
    name: 'category filter narrows the grid',
    section: 'skills',
    steps: [
      "getByTestId('filter-automation').click()",
      'expect(skillChips).toHaveCount(6)',
      "expect(chip('Playwright')).toBeVisible()",
    ],
    targets: [
      { x: 14, y: 42, w: 15, h: 6 },
      { x: 4, y: 52, w: 90, h: 30 },
      { x: 24, y: 53, w: 12, h: 7 },
    ],
  },
  {
    suite: 'experience.spec',
    name: 'timeline shows the current role',
    section: 'experience',
    steps: [
      "expect(roleTitle).toContainText('Lead SDET')",
      "expect(duration).toContainText('Present')",
      'expect(achievements).toHaveCount(5)',
    ],
    targets: [
      { x: 8, y: 34, w: 38, h: 7 },
      { x: 8, y: 42, w: 26, h: 5 },
      { x: 8, y: 48, w: 74, h: 40 },
    ],
  },
  {
    suite: 'personal.spec',
    name: 'gallery photos all load',
    section: 'personal',
    steps: [
      'expect(gallery).toBeVisible()',
      'waitForAllImages()',
      'expect(tiles).toHaveCount(6)',
    ],
    targets: [
      { x: 4, y: 38, w: 92, h: 55 },
      { x: 4, y: 38, w: 45, h: 55 },
      { x: 52, y: 38, w: 44, h: 55 },
    ],
  },
  {
    suite: 'contact.spec',
    name: 'copy email gives feedback',
    section: 'contact',
    steps: [
      'contactCard.scrollIntoViewIfNeeded()',
      "getByTestId('contact-copy-email').click()",
      "expect(copyButton).toContainText('Copied')",
    ],
    targets: [
      { x: 5, y: 34, w: 28, h: 55 },
      { x: 11, y: 72, w: 16, h: 7 },
      { x: 11, y: 72, w: 16, h: 7 },
    ],
  },
  {
    suite: 'a11y.spec',
    name: 'landmarks and labels are present',
    section: 'contact',
    steps: [
      'scanLandmarks(page)',
      'expect(ariaLabels).toBeComplete()',
      'expect(contrast).toMeetAA()',
    ],
    targets: [
      { x: 3, y: 6, w: 94, h: 88 },
      { x: 5, y: 34, w: 90, h: 55 },
      { x: 3, y: 6, w: 94, h: 88 },
    ],
  },
  {
    suite: 'navigation.spec',
    name: 'section dots track scroll position',
    section: 'hero',
    steps: [
      "getByTestId('nav-dot-skills').click()",
      'expect(activeDot).toBe(skills)',
      'expect(progressBar).toAdvance()',
    ],
    targets: [
      { x: 90, y: 30, w: 7, h: 40 },
      { x: 90, y: 40, w: 7, h: 8 },
      { x: 2, y: 1, w: 96, h: 4 },
    ],
  },
];

const QUEUE_MS = 1600; // "launching chromium…"
const TAIL_MS = 900; // teardown after the last test

interface ScheduledRun {
  runId: string;
  startedAt: number;
  estimatedDurationMs: number;
  /** Planned duration per test, laid out at trigger time. */
  plan: number[];
  totalMs: number;
}

let active: ScheduledRun | null = null;
const history: RunSummary[] = [];

const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo);

// A believable day of activity: a few green runs earlier today.
const seedHistory = () => {
  const now = Date.now();
  const hoursAgo = [1.7, 4.2, 7.6, 10.9];
  for (const h of hoursAgo) {
    history.push({
      runId: `seed_${h}`,
      project: 'Live demo suite',
      startedAt: now - h * 3600_000 - rand(0, 900_000),
      durationMs: Math.round(rand(19_000, 26_000)),
      conclusion: 'success',
      passed: SUITE.length,
      failed: 0,
    });
  }
};
seedHistory();

const testStart = (run: ScheduledRun, i: number) =>
  run.startedAt + QUEUE_MS + run.plan.slice(0, i).reduce((s, d) => s + d, 0);

const buildResults = (run: ScheduledRun, completed: number): TestResult[] =>
  SUITE.slice(0, completed).map((t, i) => ({
    id: `${run.runId}-${i}`,
    suite: t.suite,
    name: t.name,
    status: 'passed',
    durationMs: run.plan[i],
  }));

const finalize = (run: ScheduledRun) => {
  history.unshift({
    runId: run.runId,
    project: 'Live demo suite',
    startedAt: run.startedAt,
    durationMs: run.totalMs,
    conclusion: 'success',
    passed: SUITE.length,
    failed: 0,
  });
};

export const simulation: RunnerDataSource = {
  async getActive() {
    if (!active) return null;
    if (Date.now() - active.startedAt >= active.totalMs) {
      finalize(active);
      active = null;
      return null;
    }
    return {
      runId: active.runId,
      startedAt: active.startedAt,
      estimatedDurationMs: active.estimatedDurationMs,
    };
  },

  async trigger(): Promise<ActiveRun> {
    if (active && Date.now() - active.startedAt < active.totalMs) {
      throw new RunInProgressError();
    }
    const plan = SUITE.map(() => Math.round(rand(2_300, 3_300)));
    const totalMs = QUEUE_MS + plan.reduce((s, d) => s + d, 0) + TAIL_MS;
    active = {
      runId: `run_${Date.now().toString(36)}`,
      startedAt: Date.now(),
      // Estimate is slightly off on purpose so the bar visibly reconciles.
      estimatedDurationMs: Math.round(totalMs * rand(0.94, 1.08)),
      plan,
      totalMs,
    };
    return {
      runId: active.runId,
      startedAt: active.startedAt,
      estimatedDurationMs: active.estimatedDurationMs,
    };
  },

  async getStatus(runId: string): Promise<RunStatus> {
    if (!active || active.runId !== runId) {
      const h = history.find(r => r.runId === runId);
      return {
        runId,
        phase: 'completed',
        conclusion: h?.conclusion ?? 'success',
        startedAt: h?.startedAt ?? Date.now(),
        finishedAt: (h?.startedAt ?? Date.now()) + (h?.durationMs ?? 0),
        estimatedDurationMs: h?.durationMs ?? 0,
        totalTests: SUITE.length,
        completedTests: SUITE.length,
        currentTest: null,
        results: [],
      };
    }

    const run = active;
    const now = Date.now();
    const elapsed = now - run.startedAt;

    let completed = 0;
    while (completed < SUITE.length && now >= testStart(run, completed) + run.plan[completed]) {
      completed += 1;
    }

    let phase: RunStatus['phase'] = 'in_progress';
    if (elapsed < QUEUE_MS) phase = 'queued';
    if (elapsed >= run.totalMs) phase = 'completed';

    const running = phase === 'in_progress' && completed < SUITE.length;
    const status: RunStatus = {
      runId: run.runId,
      phase,
      startedAt: run.startedAt,
      estimatedDurationMs: run.estimatedDurationMs,
      totalTests: SUITE.length,
      completedTests: completed,
      currentTest: running
        ? {
            ...SUITE[completed],
            index: completed,
            startedAt: testStart(run, completed),
            durationMs: run.plan[completed],
          }
        : null,
      results: buildResults(run, completed),
    };

    if (phase === 'completed') {
      status.conclusion = 'success';
      status.finishedAt = run.startedAt + run.totalMs;
      status.completedTests = SUITE.length;
      status.results = buildResults(run, SUITE.length);
      finalize(run);
      active = null;
    }
    return status;
  },

  async getHistory(limit: number) {
    return history.slice(0, limit);
  },
};
