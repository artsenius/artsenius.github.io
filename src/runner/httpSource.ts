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
      githubRunUrl: d.githubRunUrl,
      results: mapResults(d.runId, d.results),
    };
  },

  // Reads /test-runs/summary, which also contains legacy nightly-run records
  // (status 'passed'/'failed'/'completed', no phase field) — map both shapes.
  async getHistory(limit: number): Promise<RunSummary[]> {
    const res = await fetch(`${API_ENDPOINTS.RUNNER_SUMMARY}?limit=${limit}`);
    if (!res.ok) throw new Error(`history failed (${res.status})`);
    const rows = await res.json();
    return (Array.isArray(rows) ? rows : [])
      .filter((r: any) => r.phase !== 'queued' && r.phase !== 'in_progress')
      .map((r: any) => {
        const startedAt = new Date(r.startedAt).getTime();
        const finishedAt = r.finishedAt ? new Date(r.finishedAt).getTime() : startedAt;
        const failed = r.results?.failed ?? 0;
        return {
          runId: r.correlationId || r._id,
          project: r.project,
          startedAt,
          durationMs: r.duration || Math.max(0, finishedAt - startedAt),
          conclusion:
            r.conclusion || (failed > 0 || r.status === 'failed' ? 'failure' : 'success'),
          passed: r.results?.passed ?? 0,
          failed,
        };
      });
  },
};
