// Types for the simulated live test runner. The whole run lifecycle is
// front-end theater: a scheduled "suite" plays out against wall-clock time
// while the UI renders the section under test in a mini viewport.

export type RunPhase = 'queued' | 'in_progress' | 'completed';
export type RunConclusion = 'success' | 'failure';
export type TestStatus = 'passed' | 'failed';

/** Section of the page a test exercises — rendered live in the viewport. */
export type SectionId = 'hero' | 'contact' | 'skills' | 'experience' | 'personal';

/** Highlight rectangle inside the virtual viewport, in percentages. */
export interface TargetRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface SuiteTestDef {
  suite: string;
  name: string;
  section: SectionId;
  /** Playwright-style step captions, one per target. */
  steps: string[];
  /** Where the highlight box sits during each step. */
  targets: TargetRect[];
}

export interface CurrentTest extends SuiteTestDef {
  index: number;
  startedAt: number; // epoch ms
  durationMs: number; // planned duration for this test
}

export interface TestResult {
  id: string;
  suite: string;
  name: string;
  status: TestStatus;
  durationMs: number;
  error?: string;
}

export interface RunStatus {
  runId: string;
  phase: RunPhase;
  conclusion?: RunConclusion;
  startedAt: number; // epoch ms
  finishedAt?: number;
  estimatedDurationMs: number;
  totalTests: number;
  completedTests: number;
  currentTest?: CurrentTest | null;
  results: TestResult[];
}

export interface ActiveRun {
  runId: string;
  startedAt: number;
  estimatedDurationMs: number;
}

export interface RunSummary {
  runId: string;
  project?: string;
  startedAt: number;
  durationMs: number;
  conclusion: RunConclusion;
  passed: number;
  failed: number;
}

export interface RunnerDataSource {
  getActive(): Promise<ActiveRun | null>;
  trigger(): Promise<ActiveRun>;
  getStatus(runId: string): Promise<RunStatus>;
  getHistory(limit: number): Promise<RunSummary[]>;
}

export class RunInProgressError extends Error {
  constructor() {
    super('A test run is already in progress.');
    this.name = 'RunInProgressError';
  }
}
