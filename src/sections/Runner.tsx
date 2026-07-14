import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from '../motion/Reveal';
import { Kicker, SectionTitle, Lead } from './shared';
import { useRunner } from '../runner/RunnerProvider';
import { accent, cinematic } from '../styles/tokens';

const fmt = (ms: number) => `${(ms / 1000).toFixed(1)}s`;

const fmtDate = (ms: number) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(ms));

const Terminal = styled.div`
  background: ${cinematic.bg};
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
`;

const Bar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.85rem 1.1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  .dot { width: 11px; height: 11px; border-radius: 50%; background: rgba(255,255,255,0.18); }
  .title {
    margin-left: 0.5rem;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: ${cinematic.textMuted};
  }
`;

const phasePulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
`;

const Badge = styled.span<{ $tone: 'idle' | 'queued' | 'running' | 'pass' | 'fail' }>`
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.25rem 0.7rem;
  border-radius: 999px;
  color: ${p =>
    p.$tone === 'pass' ? accent.terminal
    : p.$tone === 'fail' ? accent.red
    : p.$tone === 'running' ? accent.blue
    : p.$tone === 'queued' ? accent.amber
    : cinematic.textMuted};
  border: 1px solid currentColor;
  background: rgba(255, 255, 255, 0.04);

  &::before {
    content: '';
    width: 6px; height: 6px; border-radius: 50%;
    background: currentColor;
    animation: ${p => (p.$tone === 'running' || p.$tone === 'queued' ? phasePulse : 'none')} 1.1s ease-in-out infinite;
  }
`;

const Body = styled.div`
  padding: 1.1rem 1.1rem 1.25rem;
  color: ${cinematic.text};
`;

const StatusRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: ${cinematic.textMuted};
  margin-bottom: 0.6rem;
`;

const Track = styled.div`
  height: 10px;
  background: rgba(255, 255, 255, 0.07);
  border-radius: 999px;
  overflow: hidden;
`;

const Fill = styled.div<{ $tone: string }>`
  height: 100%;
  background: ${p => p.$tone};
  border-radius: 999px;
  transition: width 0.25s ease;
`;

const Ticker = styled.div`
  font-family: var(--font-mono);
  font-size: 0.82rem;
  margin: 0.75rem 0 0.25rem;
  min-height: 1.2em;
  color: ${cinematic.text};

  .muted { color: ${cinematic.textMuted}; }
  .accent { color: ${accent.blue}; }
`;

const Log = styled.div`
  margin-top: 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  line-height: 1.8;
  max-height: 230px;
  overflow-y: auto;
`;

const LogRow = styled(motion.div)`
  display: flex;
  gap: 0.5rem;
  align-items: baseline;

  .ic-pass { color: ${accent.terminal}; }
  .ic-fail { color: ${accent.red}; }
  .suite { color: ${cinematic.textMuted}; }
  .dur { margin-left: auto; color: ${cinematic.textMuted}; }
`;

const RunButton = styled.button<{ $busy: boolean }>`
  margin-top: 1.15rem;
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  padding: 0.9rem 1.4rem;
  border: none;
  border-radius: 10px;
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: ${p => (p.$busy ? 'rgba(255,255,255,0.1)' : `linear-gradient(135deg, ${accent.blue}, ${accent.blueDeep})`)};
  cursor: ${p => (p.$busy ? 'not-allowed' : 'pointer')};
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  box-shadow: ${p => (p.$busy ? 'none' : `0 8px 24px ${accent.blue}40`)};

  &:not(:disabled):hover { transform: translateY(-2px); }
  &:focus-visible { outline: 3px solid ${accent.blue}88; outline-offset: 3px; }
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  margin-top: 1.25rem;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Metric = styled.div`
  background: ${p => p.theme.colors.surface};
  border: 1px solid ${p => p.theme.colors.border};
  border-radius: 12px;
  padding: 0.9rem 1rem;

  .label { font-size: 0.75rem; color: ${p => p.theme.colors.textSecondary}; text-transform: uppercase; letter-spacing: 0.05em; }
  .value { font-size: 1.5rem; font-weight: 700; margin-top: 0.2rem; }
`;

const History = styled.div`
  margin-top: 1.5rem;
`;

const HistoryTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.75rem;
  color: ${p => p.theme.colors.text};
`;

const RunRow = styled.div<{ $live?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 1rem;
  border-radius: 12px;
  border: 1px solid ${p => (p.$live ? accent.blue : p.theme.colors.border)};
  background: ${p => p.theme.colors.surface};
  margin-bottom: 0.5rem;
  font-size: 0.88rem;
  color: ${p => p.theme.colors.text};

  .when {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: ${p => p.theme.colors.textSecondary};
  }
  .project {
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .spacer { margin-left: auto; }
  .counts {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    white-space: nowrap;
    .p { color: ${accent.green}; }
    .f { color: ${accent.red}; }
  }
  .dur {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: ${p => p.theme.colors.textSecondary};
    min-width: 3.5rem;
    text-align: right;
  }

  @media (max-width: 640px) {
    flex-wrap: wrap;
    .when { width: 100%; order: 3; }
  }
`;

const RowDot = styled.span<{ $tone: 'ok' | 'bad' | 'live' | 'queued' }>`
  flex: none;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${p =>
    p.$tone === 'ok' ? accent.green
    : p.$tone === 'bad' ? accent.red
    : p.$tone === 'queued' ? accent.amber
    : accent.blue};
  animation: ${p => (p.$tone === 'live' || p.$tone === 'queued' ? phasePulse : 'none')} 1.1s ease-in-out infinite;
`;

const GhLink = styled.a`
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: ${accent.blue};
  &:hover { text-decoration: underline; }
`;

const ErrorNote = styled.div`
  margin-top: 0.75rem;
  color: ${accent.red};
  font-family: var(--font-mono);
  font-size: 0.82rem;
`;

const Runner: React.FC = () => {
  const r = useRunner();
  const logRef = useRef<HTMLDivElement>(null);

  const liveRun = r.phase === 'queued' || r.phase === 'in_progress';
  // The just-finished mock run isn't stored in the backend, so keep it visible
  // by merging lastSummary in until the backend takes over as the source.
  const completedRows = React.useMemo(() => {
    const merged =
      r.lastSummary && !r.history.some(h => h.runId === r.lastSummary!.runId)
        ? [r.lastSummary, ...r.history]
        : r.history;
    return merged.slice(0, 6);
  }, [r.lastSummary, r.history]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [r.results.length]);

  const tone =
    r.phase === 'completed' ? (r.conclusion === 'failure' ? 'fail' : 'pass')
    : r.phase === 'in_progress' ? 'running'
    : r.phase === 'queued' ? 'queued'
    : 'idle';

  const badgeText =
    r.phase === 'completed' ? (r.conclusion === 'failure' ? 'failed' : 'passed')
    : r.phase === 'in_progress' ? 'running'
    : r.phase === 'queued' ? 'queued'
    : r.phase === 'error' ? 'error'
    : 'idle';

  const fillTone =
    r.phase === 'completed' ? (r.conclusion === 'failure' ? accent.red : accent.terminal) : accent.blue;

  const remaining = Math.max(0, r.estimatedDurationMs - r.elapsedMs);

  const statusLeft =
    r.phase === 'idle' ? 'ready — trigger the Playwright suite'
    : r.phase === 'queued' ? 'queued on GitHub Actions…'
    : r.phase === 'in_progress' ? `~${fmt(remaining)} remaining (est.)`
    : r.phase === 'completed' ? `${r.passed}/${r.totalTests} passed in ${fmt(r.elapsedMs)}`
    : 'error';

  const btnLabel =
    r.phase === 'queued' ? 'Queued…'
    : r.phase === 'in_progress' ? 'Running…'
    : r.locked ? 'Run in progress…'
    : 'Run the test suite';

  return (
    <>
      <Reveal>
        <Kicker>06 · live</Kicker>
        <SectionTitle data-testid="runner-title">Live test runner</SectionTitle>
        <Lead>
          This isn't a screenshot. Press run and a real Playwright suite fires against
          this site on GitHub Actions — progress streams back here while you keep scrolling.
        </Lead>
      </Reveal>

      <Reveal delay={0.05}>
        <Terminal data-testid="runner-terminal">
          <Bar>
            <span className="dot" /><span className="dot" /><span className="dot" />
            <span className="title">playwright · arthursenko.com</span>
            <Badge $tone={tone} data-testid="runner-status-badge">{badgeText}</Badge>
          </Bar>
          <Body>
            <StatusRow>
              <span data-testid="runner-status-text">{statusLeft}</span>
              <span style={{ display: 'flex', gap: '0.9rem' }}>
                {r.githubRunUrl && (
                  <GhLink
                    href={r.githubRunUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="runner-github-link"
                  >
                    view on GitHub ↗
                  </GhLink>
                )}
                <span>{r.estimatedDurationMs ? `est. ${fmt(r.estimatedDurationMs)}` : ''}</span>
              </span>
            </StatusRow>

            <Track aria-hidden="true">
              <Fill
                $tone={fillTone}
                style={{ width: `${Math.round(r.progress * 100)}%` }}
                data-testid="runner-progress-fill"
              />
            </Track>

            <Ticker data-testid="runner-ticker">
              {r.phase === 'in_progress' && r.currentTest ? (
                <><span className="accent">running</span> · <span className="muted">{r.currentTest.suite}</span> › {r.currentTest.name}</>
              ) : r.phase === 'queued' ? (
                <span className="muted">waiting for a runner…</span>
              ) : r.phase === 'completed' ? (
                <span className="muted">run complete</span>
              ) : (
                <span className="muted">idle</span>
              )}
            </Ticker>

            <Log ref={logRef} role="log" aria-live="polite" data-testid="runner-log">
              <AnimatePresence initial={false}>
                {r.results.map(t => (
                  <LogRow
                    key={t.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    data-testid={`runner-log-${t.id}`}
                  >
                    <span className={t.status === 'passed' ? 'ic-pass' : 'ic-fail'}>
                      {t.status === 'passed' ? '✓' : '✗'}
                    </span>
                    <span className="suite">{t.suite}</span>›&nbsp;{t.name}
                    <span className="dur">{fmt(t.durationMs)}</span>
                  </LogRow>
                ))}
              </AnimatePresence>
            </Log>

            {r.error && <ErrorNote data-testid="runner-error">{r.error}</ErrorNote>}

            <RunButton
              onClick={r.run}
              disabled={!r.canRun}
              $busy={!r.canRun}
              data-testid="runner-run-button"
              aria-label={btnLabel}
            >
              {r.canRun ? '▶ ' : ''}{btnLabel}
            </RunButton>
          </Body>
        </Terminal>
      </Reveal>

      {r.lastSummary && (
        <Reveal delay={0.05}>
          <SummaryGrid data-testid="runner-summary">
            <Metric><div className="label">Result</div><div className="value" style={{ color: r.lastSummary.conclusion === 'failure' ? accent.red : accent.green }}>{r.lastSummary.conclusion === 'failure' ? 'Failed' : 'Passed'}</div></Metric>
            <Metric><div className="label">Passed</div><div className="value">{r.lastSummary.passed}</div></Metric>
            <Metric><div className="label">Failed</div><div className="value">{r.lastSummary.failed}</div></Metric>
            <Metric><div className="label">Duration</div><div className="value">{fmt(r.lastSummary.durationMs)}</div></Metric>
          </SummaryGrid>
        </Reveal>
      )}

      {(liveRun || completedRows.length > 0) && (
        <Reveal delay={0.05}>
          <History data-testid="runner-history">
            <HistoryTitle>Recent runs</HistoryTitle>
            {liveRun && (
              <RunRow $live data-testid="runner-history-live">
                <RowDot $tone={r.phase === 'queued' ? 'queued' : 'live'} aria-hidden="true" />
                <span className="project">Live demo suite</span>
                <span className="when">
                  {r.phase === 'queued' ? 'queued…' : `running · ${fmt(r.elapsedMs)} elapsed`}
                </span>
                <span className="spacer" />
                <span className="counts">
                  <span className="p">{r.passed} passed</span> · <span className="f">{r.failed} failed</span>
                </span>
              </RunRow>
            )}
            {completedRows.map(h => (
              <RunRow key={h.runId} data-testid={`runner-history-${h.runId}`}>
                <RowDot $tone={h.conclusion === 'failure' ? 'bad' : 'ok'} aria-hidden="true" />
                <span className="project">{h.project || 'Live demo suite'}</span>
                <span className="when">{fmtDate(h.startedAt)}</span>
                <span className="spacer" />
                <span className="counts">
                  <span className="p">{h.passed} passed</span> · <span className="f">{h.failed} failed</span>
                </span>
                <span className="dur">{fmt(h.durationMs)}</span>
              </RunRow>
            ))}
          </History>
        </Reveal>
      )}
    </>
  );
};

export default Runner;
