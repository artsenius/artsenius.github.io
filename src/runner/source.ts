import { RunnerDataSource } from './types';
import { simulation } from './simulation';

// The runner is a self-contained front-end simulation: the suite mirrors the
// checks a real Playwright run would make against this site, and the
// viewport renders the section under test live. No backend required.
export const runnerSource: RunnerDataSource = simulation;
