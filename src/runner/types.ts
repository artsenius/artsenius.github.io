// Contract shared by the mock data source (now) and the real backend (later).
// The backend's GET /test-runs/status/:id etc. will return these exact shapes,
// so swapping the data source is a one-line change in source.ts.

export type RunPhase = 'queued' | 'in_progress' | 'completed';
export type RunConclusion = 'success' | 'failure';
export type TestStatus = 'passed' | 'failed';

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
  // The test currently executing (not yet in results), for the live ticker.
  currentTest?: { suite: string; name: string } | null;
  // Streamed incrementally as tests finish.
  results: TestResult[];
}

export interface ActiveRun {
  runId: string;
  startedAt: number;
  estimatedDurationMs: number;
}

export interface RunSummary {
  runId: string;
  startedAt: number;
  durationMs: number;
  conclusion: RunConclusion;
  passed: number;
  failed: number;
}

export interface RunnerDataSource {
  // Current in-flight run (server truth) — used to resume + enforce the lock
  // even on a fresh page load. Null when nothing is running.
  getActive(): Promise<ActiveRun | null>;
  // Acquire the single-flight lock and fire the run. Rejects if one is active.
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
