import { RunnerDataSource } from './types';
import { mockSource } from './mockSource';
import { httpSource } from './httpSource';

// Flip to `true` once the backend live-runner endpoints are deployed
// (GITHUB_TOKEN + RUN_CALLBACK_SECRET configured, automation `live-run.yml` in place).
// Until then the mock behaves exactly like the real backend so the UI is fully demoable.
const USE_REAL_BACKEND = false;

export const runnerSource: RunnerDataSource = USE_REAL_BACKEND ? httpSource : mockSource;
