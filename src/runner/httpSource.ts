import { API_ENDPOINTS } from '../config/api';
import {
  ActiveRun,
  RunInProgressError,
  RunnerDataSource,
  RunStatus,
  RunSummary,
  TestResult,
} from './types';

// Real backend data source. Drop this in for mockSource in source.ts once the
// backend env (GITHUB_TOKEN, RUN_CALLBACK_SECRET, …) is configured + deployed.

const mapResults = (runId: string, tests: any[] = []): TestResult[] =>
  tests.map((t, i) => ({
    id: t.id || `${runId}-${i}`,
    suite: t.suite || 'suite',
    name: t.name || t.title || 'test',
    status: t.status === 'passed' ? 'passed' : 'failed',
    durationMs: t.durationMs ?? t.duration ?? 0,
    error: t.error,
  }));

export const httpSource: RunnerDataSource = {
  async getActive(): Promise<ActiveRun | null> {
    const res = await fetch(API_ENDPOINTS.RUNNER_ACTIVE);
    if (!res.ok) throw new Error(`active failed (${res.status})`);
    const data = await res.json();
    return data || null;
  },

  async trigger(): Promise<ActiveRun> {
    const res = await fetch(API_ENDPOINTS.RUNNER_TRIGGER, { method: 'POST' });
    if (res.status === 409) throw new RunInProgressError();
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.message || `trigger failed (${res.status})`);
    }
    const data = await res.json();
    return {
      runId: data.runId,
      startedAt: data.startedAt,
      estimatedDurationMs: data.estimatedDurationMs,
    };
  },

  async getStatus(runId: string): Promise<RunStatus> {
    const res = await fetch(API_ENDPOINTS.RUNNER_STATUS(runId));
    if (!res.ok) throw new Error(`status failed (${res.status})`);
    const d = await res.json();
    return {
      runId: d.runId,
      phase: d.phase,
      conclusion: d.conclusion,
      startedAt: d.startedAt,
      finishedAt: d.finishedAt,
      estimatedDurationMs: d.estimatedDurationMs,
      totalTests: d.totalTests ?? 0,
      completedTests: d.completedTests ?? 0,
      currentTest: d.currentTest ?? null,
      results: mapResults(d.runId, d.results),
    };
  },

  async getHistory(limit: number): Promise<RunSummary[]> {
    const res = await fetch(`${API_ENDPOINTS.RUNNER_SUMMARY}?limit=${limit}`);
    if (!res.ok) throw new Error(`history failed (${res.status})`);
    const rows = await res.json();
    return (Array.isArray(rows) ? rows : [])
      .filter((r: any) => r.phase === 'completed' || r.status === 'completed')
      .map((r: any) => ({
        runId: r.correlationId || r._id,
        startedAt: new Date(r.startedAt).getTime(),
        durationMs: r.duration || 0,
        conclusion: r.conclusion || ((r.results?.failed || 0) > 0 ? 'failure' : 'success'),
        passed: r.results?.passed || 0,
        failed: r.results?.failed || 0,
      }));
  },
};
