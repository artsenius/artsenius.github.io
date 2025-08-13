import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { API_ENDPOINTS, fetchWithErrorHandling } from '../config/api';

import { fadeInUp, fadeIn, shimmer, spin } from '../styles/animations';

interface TestRun {
    _id: string;
    project: string;
    status: string;
    startedAt: string;
    finishedAt: string;
    results: {
        passed: number;
        failed: number;
        skipped?: number;
        blocked?: number;
        tests?: Array<{
            suite: string;
            title: string;
            status: string;
            browser: string;
            duration: number;
            error?: string;
        }>;
        details?: Array<{
            suite: string;
            tests: Array<{
                name: string;
                status: string;
                browser?: string;
                duration?: number;
                error?: string;
            }>;
        }>;
    };
}

interface TestRunDetail extends TestRun {
    duration: number;
    results: TestRun['results'];
}

interface LiveTestAutomationProps {
    isDark: boolean;
}

const TestAutomationSection = styled.section`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    overflow-x: hidden;
    box-sizing: border-box;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    transition: background-color 0.3s ease, color 0.3s ease;

    @media (max-width: 768px) {
        padding: 1rem;
    }
`;



const TestRunList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    min-height: 400px;
    width: 100%;
    overflow-x: hidden;
    box-sizing: border-box;
`;

const TestRunCard = styled.div`
    background-color: ${props => props.theme.colors.surface};
    border-radius: 12px;
    box-shadow: 0 4px 6px ${props => props.theme.colors.shadow};
    border: 1px solid ${props => props.theme.colors.border};
    overflow: hidden;
    transition: all 0.2s ease-in-out;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 15px ${props => props.theme.colors.shadow};
    }
`;

const getStatusColor = (status: string, passed: number, failed: number, isDark: boolean) => {
    if (status === 'completed' || status === 'passed') {
        if (failed === 0 && passed > 0) return isDark ? 'rgb(20, 83, 45)' : '#27ae60'; // Green for all passed in dark mode
        if (failed > 0 && passed > 0) return isDark ? '#b45309' : '#f39c12'; // Darker orange for dark mode
        if (failed > 0 && passed === 0) return isDark ? '#b91c1c' : '#e74c3c'; // Darker red for dark mode
    }
    return isDark ? '#374151' : '#7f8c8d'; // Grey for other statuses
};

const TestRunHeader = styled.div<{ status: string; passed: number; failed: number; $isDark: boolean }>`
    background-color: ${props => getStatusColor(props.status, props.passed, props.failed, props.$isDark)};
    color: white;
    padding: 1.25rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.2s ease-in-out;
    position: relative;
    
    &:hover {
        opacity: 0.9;
    }
    
    &:focus-visible {
        outline: 3px solid ${props => props.theme.colors.accent};
        outline-offset: 2px;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
        padding: 1rem;
    }
`;

const StatusBadge = styled.span<{ status: string }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.375rem;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.025em;
    min-width: 90px;
    white-space: nowrap;
    text-align: center;
    box-sizing: border-box;
    background-color: ${props => {
        const isSuccess = props.status === 'completed' || props.status === 'passed';
        return isSuccess ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)';
    }};
    color: ${props => {
        const isSuccess = props.status === 'completed' || props.status === 'passed';
        return isSuccess ? '#10b981' : '#ef4444';
    }};
    border: 1px solid ${props => {
        const isSuccess = props.status === 'completed' || props.status === 'passed';
        return isSuccess ? '#10b981' : '#ef4444';
    }};
    
    &::before {
        content: '';
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: currentColor;
    }

    @media (max-width: 768px) {
        min-width: 80px;
    }
`;

const ChevronIcon = styled.span<{ isExpanded: boolean }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.75rem;
    width: 20px;
    height: 20px;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: ${props => props.isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'};
    font-size: 0.875rem;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.1);
    
    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;

const TestRunTitleWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const TestRunTitle = styled.h3`
    margin: 0;
    font-size: 1.2rem;

    @media (max-width: 768px) {
        font-size: 1rem;
    }
`;

const TestRunStats = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;

    @media (max-width: 768px) {
        flex-wrap: wrap;
        gap: 1rem;
    }
`;

const StatItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.25rem 0.75rem;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 500;
    backdrop-filter: blur(4px);
    min-width: 210px;
    box-sizing: border-box;
    white-space: nowrap;
    
    &:first-child {
        border: 1px solid rgba(34, 197, 94, 0.3);
    }
    
    &:nth-child(2) {
        border: 1px solid rgba(239, 68, 68, 0.3);
    }
    
    @media (max-width: 768px) {
        min-width: 180px;
    }
`;

const DateBadge = styled(StatItem)`
    width: 260px;
    font-variant-numeric: tabular-nums;
    @media (max-width: 768px) {
        width: 260px;
    }
`;

const TestRunContent = styled.div<{ isExpanded: boolean }>`
    background-color: ${props => props.theme.colors.background};
    border-top: 1px solid ${props => props.theme.colors.border};
    padding: ${props => props.isExpanded ? '1.5rem' : '0'};
    display: ${props => props.isExpanded ? 'block' : 'none'};

    @media (max-width: 768px) {
        padding: ${props => props.isExpanded ? '1rem' : '0'};
    }
`;

const ErrorMessage = styled.div`
    text-align: center;
    padding: 2rem;
    color: #e74c3c;
    font-size: 1.2rem;
`;

const fadeInAnimation = fadeInUp;

const shimmerStyle = css`
    background: linear-gradient(to right, ${props => props.theme.colors.surface} 8%, ${props => props.theme.colors.border} 18%, ${props => props.theme.colors.surface} 33%);
    background-size: 2400px 100%;
    animation: ${shimmer} 1.5s linear infinite;
`;

const LoadingCard = styled.div<{ index: number }>`
    background-color: ${props => props.theme.colors.surface};
    border-radius: 8px;
    box-shadow: 0 2px 4px ${props => props.theme.colors.shadow};
    overflow: hidden;
    opacity: 0;
    animation: ${fadeInAnimation} 0.5s ease forwards;
    animation-delay: ${props => props.index * 0.1}s;
    
    @media (max-width: 768px) {
        height: auto;
    }
`;

const LoadingHeader = styled.div`
    height: 60px;
    background-color: ${props => props.theme.colors.surface};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    position: relative;

    @media (max-width: 768px) {
        height: auto;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
        min-height: 80px;
    }
`;

const LoadingTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const LoadingProjectIcon = styled.div`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    ${shimmerStyle}
`;

const LoadingProjectName = styled.div`
    width: 120px;
    height: 20px;
    ${shimmerStyle}
    border-radius: 4px;
`;

const LoadingStats = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;

    @media (max-width: 768px) {
        flex-wrap: wrap;
        gap: 0.75rem;
    }
`;

const LoadingStatWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const LoadingStatIcon = styled.div<{ type: 'pass' | 'fail' | 'date' }>`
    width: 16px;
    height: 16px;
    border-radius: ${props => props.type === 'date' ? '3px' : '50%'};
    ${shimmerStyle}
`;

const LoadingStatValue = styled.div<{ width: string }>`
    width: ${props => props.width};
    height: 16px;
    ${shimmerStyle}
    border-radius: 3px;
`;

const LoadingPlaceholder = () => {
    return (
        <TestRunList data-testid="loading-placeholder">
            {[1, 2, 3, 4, 5].map((_, index) => (
                <LoadingCard key={index} index={index}>
                    <LoadingHeader>
                        <LoadingTitle>
                            <LoadingProjectIcon />
                            <LoadingProjectName />
                        </LoadingTitle>
                        <LoadingStats>
                            <LoadingStatWrapper>
                                <LoadingStatIcon type="pass" />
                                <LoadingStatValue width="24px" />
                            </LoadingStatWrapper>
                            <LoadingStatWrapper>
                                <LoadingStatIcon type="fail" />
                                <LoadingStatValue width="24px" />
                            </LoadingStatWrapper>
                            <LoadingStatWrapper>
                                <LoadingStatIcon type="date" />
                                <LoadingStatValue width="120px" />
                            </LoadingStatWrapper>
                        </LoadingStats>
                    </LoadingHeader>
                </LoadingCard>
            ))}
        </TestRunList>
    );
};

const LoadingExpandedContent = styled.div`
    animation: ${fadeInAnimation} 0.3s ease-in-out;
`;

const LoadingTestSummary = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 1rem;
    background-color: ${props => props.theme.colors.surface};
    padding: 0.75rem;
    border-radius: 6px;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 0.75rem;
        padding: 0.75rem;
    }
`;

const LoadingSummaryItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    @media (max-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
`;

const LoadingSummaryLabel = styled.div`
    height: 0.8rem;
    width: 60%;
    border-radius: 4px;
    ${shimmerStyle}

    @media (max-width: 768px) {
        width: 40%;
    }
`;

const LoadingSummaryValue = styled.div`
    height: 0.9rem;
    width: 80%;
    border-radius: 4px;
    ${shimmerStyle}

    @media (max-width: 768px) {
        width: 50%;
    }
`;

const LoadingTestDetails = styled.div`
    margin-top: 0.5rem;
`;

const LoadingTestSuite = styled.div`
    margin-bottom: 1rem;
`;

const LoadingSuiteTitle = styled.div`
    height: 0.95rem;
    width: 70%;
    margin: 0.25rem 0;
    border-radius: 4px;
    ${shimmerStyle}
`;

const LoadingTestCase = styled.div`
    height: 2.5rem;
    padding: 0.5rem;
    margin: 0.25rem 0;
    border-radius: 4px;
    ${shimmerStyle}
`;

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    }).format(date);
};

const MAX_RESULTS = 30;
const PAGE_SIZE = 5;

const Spinner = styled.div`
    border: 3px solid rgba(255,255,255,0.2);
    border-top: 3px solid ${props => props.theme.colors.accent};
    border-radius: 50%;
    width: 1.2em;
    height: 1.2em;
    animation: ${spin} 0.7s linear infinite;
    display: inline-block;
    vertical-align: middle;
    margin-right: 0.5em;
`;

const LiveTestAutomation: React.FC<LiveTestAutomationProps> = ({ isDark }) => {
    const [testRuns, setTestRuns] = useState<TestRun[]>([]);
    const [expandedRuns, setExpandedRuns] = useState<{ [key: string]: TestRunDetail }>({});
    const [loadingDetails, setLoadingDetails] = useState<{ [key: string]: boolean }>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [hoveredError, setHoveredError] = useState<{ id: string; error: string } | null>(null);
    const [limit, setLimit] = useState(PAGE_SIZE);
    const [loadingMore, setLoadingMore] = useState(false);
    const [announceText, setAnnounceText] = useState<string>('');
    const announcementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchTestRuns(limit);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit]);

    const announceToScreenReader = useCallback((message: string) => {
        setAnnounceText(message);
        setTimeout(() => setAnnounceText(''), 1000);
    }, []);

    const handleKeyDown = useCallback((event: React.KeyboardEvent, action: () => void) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            action();
        }
    }, []);

    const fetchTestRuns = async (currentLimit: number) => {
        setLoading(currentLimit === PAGE_SIZE); // Only show main loader on first load
        setLoadingMore(currentLimit > PAGE_SIZE); // Show loading more only for subsequent loads
        try {
            const url = `${API_ENDPOINTS.TEST_RUNS_SUMMARY}?limit=${currentLimit}`;
            const data = await fetchWithErrorHandling(url);
            setTestRuns(data);
            setError(null);
        } catch (error: any) {
            console.error('Fetch error details:', error);
            setError(`Failed to load test runs: ${error.message || 'Unknown error'}`);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const toggleRunDetails = async (id: string) => {
        const testRun = testRuns.find(run => run._id === id);
        const projectName = testRun?.project || 'test run';
        
        if (expandedRuns[id]) {
            const newExpandedRuns = { ...expandedRuns };
            delete newExpandedRuns[id];
            setExpandedRuns(newExpandedRuns);
            announceToScreenReader(`Collapsed details for ${projectName}`);
            return;
        }

        // Set loading state immediately
        setLoadingDetails(prev => ({ ...prev, [id]: true }));
        announceToScreenReader(`Loading details for ${projectName}`);

        try {
            const data = await fetchWithErrorHandling(API_ENDPOINTS.TEST_RUN_DETAILS(id));
            setExpandedRuns(prev => ({
                ...prev,
                [id]: data
            }));
            announceToScreenReader(`Loaded details for ${projectName}. ${data.results.passed} tests passed, ${data.results.failed} tests failed.`);
        } catch (err) {
            const errorMessage = 'Failed to load test run details. Please try again.';
            setError(errorMessage);
            announceToScreenReader(errorMessage);
        } finally {
            setLoadingDetails(prev => {
                const next = { ...prev };
                delete next[id];
                return next;
            });
        }
    };

    const renderLoadingExpandedContent = () => (
        <LoadingExpandedContent>
            <LoadingTestSummary>
                {Array(8).fill(null).map((_, index) => (
                    <LoadingSummaryItem key={index}>
                        <LoadingSummaryLabel />
                        <LoadingSummaryValue />
                    </LoadingSummaryItem>
                ))}
            </LoadingTestSummary>
            <LoadingTestDetails>
                {Array(3).fill(null).map((_, suiteIndex) => (
                    <LoadingTestSuite key={suiteIndex}>
                        <LoadingSuiteTitle />
                        {Array(2).fill(null).map((_, caseIndex) => (
                            <LoadingTestCase key={caseIndex} />
                        ))}
                    </LoadingTestSuite>
                ))}
            </LoadingTestDetails>
        </LoadingExpandedContent>
    );

    const getErrorMessage = (error: any): string => {
        if (!error) return '';
        if (typeof error === 'string') return error;
        if (typeof error === 'object') {
            if (error.message) return error.message;
            try {
                return JSON.stringify(error);
            } catch {
                return 'Unknown error';
            }
        }
        return String(error);
    };

    const renderTestCase = (test: any, index: string | number, runId: string) => (
        <TestCase key={`${runId}-${index}`} status={test.status}>
            <ErrorWrapper>
                <TestInfo>
                    <TestName
                        status={test.status}
                        onMouseEnter={() => test.error && setHoveredError({
                            id: `${runId}-${index}`,
                            error: getErrorMessage(test.error)
                        })}
                        onMouseLeave={() => setHoveredError(null)}
                    >
                        {test.title || test.name}
                    </TestName>
                    <TestMeta>
                        <TestBrowser>
                            {test.browser === 'chromium' ? '🌐' : '📱'} {test.browser || 'chromium'}
                        </TestBrowser>
                        <TestDuration>{test.duration ? `${(test.duration / 1000).toFixed(2)}s` : 'N/A'}</TestDuration>
                    </TestMeta>
                </TestInfo>
                {hoveredError?.id === `${runId}-${index}` && (
                    <Tooltip>{hoveredError.error}</Tooltip>
                )}
            </ErrorWrapper>
        </TestCase>
    );

    if (loading) {
        return (
            <TestAutomationSection 
                data-testid="test-automation-section-loading"
                role="main"
                aria-label="Loading test automation results"
                aria-busy="true"
            >
                <VisuallyHidden 
                    data-testid="loading-announcement" 
                    aria-live="polite" 
                    aria-atomic="true"
                >
                    Loading test automation results, please wait.
                </VisuallyHidden>
                <LoadingPlaceholder />
            </TestAutomationSection>
        );
    }

    if (error) {
        return (
            <TestAutomationSection 
                data-testid="test-automation-section-error"
                role="main"
                aria-label="Test automation error"
            >
                <ErrorMessage 
                    data-testid="error-message"
                    role="alert"
                    aria-live="assertive"
                    tabIndex={0}
                >
                    {error}
                </ErrorMessage>
            </TestAutomationSection>
        );
    }

    const canLoadMore = testRuns.length >= limit && limit < MAX_RESULTS;

    return (
        <TestAutomationSection 
            data-testid="test-automation-section"
            role="main"
            aria-label="Test Automation Results"
        >
            {/* Screen reader announcements */}
            <VisuallyHidden
                ref={announcementRef}
                aria-live="polite"
                aria-atomic="true"
                data-testid="screen-reader-announcements"
            >
                {announceText}
            </VisuallyHidden>

            <TestRunList 
                data-testid="test-run-list"
                role="list"
                aria-label={`${testRuns.length} test runs available`}
            >
                {testRuns.map((run, index) => (
                    <TestRunCard 
                        key={run._id} 
                        data-testid={`test-run-card-${run._id}`} 
                        role="listitem"
                    >
                        <TestRunHeader
                            status={run.status}
                            passed={run.results.passed}
                            failed={run.results.failed}
                            $isDark={isDark}
                            onClick={() => toggleRunDetails(run._id)}
                            onKeyDown={(e) => handleKeyDown(e, () => toggleRunDetails(run._id))}
                            data-testid={`test-run-header-${run._id}`}
                            role="button"
                            tabIndex={0}
                            aria-expanded={!!expandedRuns[run._id] || !!loadingDetails[run._id]}
                            aria-controls={`test-run-content-${run._id}`}
                            aria-describedby={`test-run-stats-${run._id}`}
                            aria-label={`${run.project} test run. ${run.results.passed} passed, ${run.results.failed} failed. ${!!expandedRuns[run._id] ? 'Expanded' : 'Collapsed'}. Press Enter or Space to toggle details.`}
                        >
                            <TestRunTitleWrapper>
                                <ChevronIcon 
                                    isExpanded={!!expandedRuns[run._id] || !!loadingDetails[run._id]}
                                    aria-hidden="true"
                                    data-testid={`chevron-icon-${run._id}`}
                                >
                                    ▼
                                </ChevronIcon>
                                <TestRunTitle data-testid={`test-run-title-${run._id}`}>
                                    {run.project}
                                </TestRunTitle>
                            </TestRunTitleWrapper>
                            <TestRunStats 
                                id={`test-run-stats-${run._id}`}
                                data-testid={`test-run-stats-${run._id}`}
                            >
                                <StatusBadge 
                                    status={run.status} 
                                    data-testid={`status-badge-${run._id}`}
                                    aria-label={`Status: ${run.status}`}
                                >
                                    {run.status}
                                </StatusBadge>
                                <DateBadge data-testid={`date-stat-${run._id}`} aria-label={`Started at ${formatDate(run.startedAt)}`}>
                                    🕒 {formatDate(run.startedAt)}
                                </DateBadge>
                            </TestRunStats>
                        </TestRunHeader>
                        <TestRunContent 
                            id={`test-run-content-${run._id}`}
                            data-testid={`test-run-content-${run._id}`}
                            isExpanded={!!expandedRuns[run._id] || !!loadingDetails[run._id]} 
                            role="region"
                            aria-labelledby={`test-run-title-${run._id}`}
                            aria-hidden={!expandedRuns[run._id] && !loadingDetails[run._id]}
                        >
                            {loadingDetails[run._id] && (
                                <div data-testid={`loading-details-${run._id}`} aria-label="Loading test details">
                                    {renderLoadingExpandedContent()}
                                </div>
                            )}
                            {expandedRuns[run._id] && (
                                <ExpandedContent 
                                    data-testid={`expanded-content-${run._id}`}
                                    role="tabpanel"
                                    aria-labelledby={`test-run-title-${run._id}`}
                                >
                                    <TestSummary 
                                        data-testid={`test-summary-${run._id}`} 
                                        role="group"
                                        aria-label="Test run summary statistics"
                                    >
                                        <SummaryItem data-testid={`duration-${run._id}`}>
                                            <SummaryLabel>Duration</SummaryLabel>
                                            <SummaryValue aria-label={`Total duration: ${(expandedRuns[run._id].duration / 1000).toFixed(2)} seconds`}>
                                                {(expandedRuns[run._id].duration / 1000).toFixed(2)}s
                                            </SummaryValue>
                                        </SummaryItem>
                                        <SummaryItem data-testid={`success-rate-${run._id}`}>
                                            <SummaryLabel>Success Rate</SummaryLabel>
                                            <SummaryValue aria-label={`Success rate: ${Math.round((expandedRuns[run._id].results.passed / (expandedRuns[run._id].results.passed + expandedRuns[run._id].results.failed)) * 100)} percent`}>
                                                {Math.round((expandedRuns[run._id].results.passed /
                                                    (expandedRuns[run._id].results.passed + expandedRuns[run._id].results.failed)) * 100)}%
                                            </SummaryValue>
                                        </SummaryItem>
                                        <SummaryItem data-testid={`passed-tests-${run._id}`}>
                                            <SummaryLabel>Passed Tests</SummaryLabel>
                                            <SummaryValue aria-label={`${expandedRuns[run._id].results.passed} tests passed`}>
                                                {expandedRuns[run._id].results.passed}
                                            </SummaryValue>
                                        </SummaryItem>
                                        <SummaryItem data-testid={`failed-tests-${run._id}`}>
                                            <SummaryLabel>Failed Tests</SummaryLabel>
                                            <SummaryValue aria-label={`${expandedRuns[run._id].results.failed} tests failed`}>
                                                {expandedRuns[run._id].results.failed}
                                            </SummaryValue>
                                        </SummaryItem>
                                        <SummaryItem data-testid={`skipped-tests-${run._id}`}>
                                            <SummaryLabel>Skipped Tests</SummaryLabel>
                                            <SummaryValue aria-label={`${expandedRuns[run._id].results.skipped || 0} tests skipped`}>
                                                {expandedRuns[run._id].results.skipped || 0}
                                            </SummaryValue>
                                        </SummaryItem>
                                        <SummaryItem data-testid={`blocked-tests-${run._id}`}>
                                            <SummaryLabel>Blocked Tests</SummaryLabel>
                                            <SummaryValue aria-label={`${expandedRuns[run._id].results.blocked || 0} tests blocked`}>
                                                {expandedRuns[run._id].results.blocked || 0}
                                            </SummaryValue>
                                        </SummaryItem>
                                    </TestSummary>
                                    <TestDetails 
                                        data-testid={`test-details-${run._id}`}
                                        role="group"
                                        aria-label="Individual test case results"
                                    >
                                        {expandedRuns[run._id].results.tests?.map((test: any, index: number) => (
                                            <TestSuite 
                                                data-testid={`test-suite-${run._id}-${index}`} 
                                                key={index} 
                                                role="group"
                                                aria-labelledby={`suite-title-${run._id}-${index}`}
                                            >
                                                <SuiteTitle 
                                                    id={`suite-title-${run._id}-${index}`}
                                                    data-testid={`test-suite-title-${run._id}-${index}`} 
                                                >
                                                    {test.suite}
                                                </SuiteTitle>
                                                <TestCase 
                                                    status={test.status} 
                                                    data-testid={`test-case-${run._id}-${index}`}
                                                    role="listitem"
                                                    aria-label={`Test: ${test.title || test.name}. Status: ${test.status}. Browser: ${test.browser || 'chromium'}. Duration: ${test.duration ? `${(test.duration / 1000).toFixed(2)} seconds` : 'N/A'}`}
                                                >
                                                    <ErrorWrapper>
                                                        <TestInfo>
                                                            <TestName 
                                                                status={test.status} 
                                                                onMouseEnter={() => test.error && setHoveredError({
                                                                    id: `${run._id}-${index}`,
                                                                    error: getErrorMessage(test.error)
                                                                })}
                                                                onMouseLeave={() => setHoveredError(null)}
                                                                onFocus={() => test.error && setHoveredError({
                                                                    id: `${run._id}-${index}`,
                                                                    error: getErrorMessage(test.error)
                                                                })}
                                                                onBlur={() => setHoveredError(null)}
                                                                data-testid={`test-name-${run._id}-${index}`}
                                                                tabIndex={test.error ? 0 : -1}
                                                                role={test.error ? "button" : undefined}
                                                                aria-describedby={test.error ? `error-${run._id}-${index}` : undefined}
                                                            >
                                                                {test.title || test.name}
                                                            </TestName>
                                                            <TestMeta data-testid={`test-meta-${run._id}-${index}`}>
                                                                <TestBrowser data-testid={`test-browser-${run._id}-${index}`}>
                                                                    {test.browser === 'chromium' ? '🌐' : '📱'} {test.browser || 'chromium'}
                                                                </TestBrowser>
                                                                <TestDuration data-testid={`test-duration-${run._id}-${index}`}>
                                                                    {test.duration ? `${(test.duration / 1000).toFixed(2)}s` : 'N/A'}
                                                                </TestDuration>
                                                            </TestMeta>
                                                        </TestInfo>
                                                        {hoveredError?.id === `${run._id}-${index}` && (
                                                            <Tooltip 
                                                                id={`error-${run._id}-${index}`}
                                                                data-testid={`error-tooltip-${run._id}-${index}`}
                                                                role="tooltip"
                                                                aria-live="polite"
                                                            >
                                                                {hoveredError.error}
                                                            </Tooltip>
                                                        )}
                                                    </ErrorWrapper>
                                                </TestCase>
                                            </TestSuite>
                                        ))}
                                        {expandedRuns[run._id].results.details?.map((suite: any, suiteIndex: number) => (
                                            <TestSuite key={`detail-${suiteIndex}`}>
                                                <SuiteTitle>{suite.suite}</SuiteTitle>
                                                {suite.tests?.map((test: any, testIndex: number) =>
                                                    renderTestCase(test, `${suiteIndex}-${testIndex}`, run._id)
                                                )}
                                            </TestSuite>
                                        ))}
                                    </TestDetails>
                                </ExpandedContent>
                            )}
                        </TestRunContent>
                    </TestRunCard>
                ))}
                {(canLoadMore || loadingMore) && (
                    <LoadMoreWrapper data-testid="load-more-wrapper">
                        <LoadMoreButton
                            onClick={() => {
                                setLimit(l => Math.min(l + PAGE_SIZE, MAX_RESULTS));
                                announceToScreenReader(`Loading ${PAGE_SIZE} more test runs`);
                            }}
                            disabled={loadingMore}
                            data-testid="load-more-button"
                            aria-label={loadingMore ? 'Loading more test runs' : `Load ${PAGE_SIZE} more test runs. Currently showing ${testRuns.length} of up to ${MAX_RESULTS} results.`}
                            aria-live="polite"
                        >
                            {loadingMore ? (
                                <>
                                    <Spinner data-testid="load-more-spinner" aria-hidden="true" />
                                    Loading...
                                </>
                            ) : (
                                'Load more results'
                            )}
                        </LoadMoreButton>
                    </LoadMoreWrapper>
                )}
            </TestRunList>
        </TestAutomationSection>
    );
};

const ExpandedContent = styled.div`
    margin-top: 0.5rem;
    animation: ${fadeInAnimation} 0.3s ease-in-out;
`;

const TestSummary = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 1rem;
    background-color: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.text};
    padding: 1rem;
    border-radius: 6px;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 0.75rem;
        padding: 0.75rem;
    }
`;

const SummaryItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    @media (max-width: 768px) {
        font-size: 0.9rem;
    }
`;

const SummaryLabel = styled.div`
    color: ${props => props.theme.colors.textSecondary};
    font-size: 0.9rem;

    @media (max-width: 768px) {
        font-size: 0.8rem;
    }
`;

const SummaryValue = styled.div`
    font-size: 1.1rem;
    font-weight: 500;
    color: ${props => props.theme.colors.text};

    @media (max-width: 768px) {
        font-size: 0.9rem;
    }
`;

const TestDetails = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-top: 1rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 0.75rem;
    }
`;

const TestSuite = styled.div`
    background-color: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.text};
    padding: 1rem;
    border-radius: 6px;

    @media (max-width: 768px) {
        padding: 0.75rem;
    }
`;

const SuiteTitle = styled.h4`
    color: ${props => props.theme.colors.text};
    margin: 0 0 0.75rem;
    font-size: 1.1rem;
    border-bottom: 1px solid ${props => props.theme.colors.border};
    padding-bottom: 0.5rem;

    @media (max-width: 768px) {
        font-size: 1rem;
        margin-bottom: 0.5rem;
    }
`;

const TestCase = styled.div<{ status: string }>`
    padding: 0.75rem;
    margin: 0.5rem 0;
    border-radius: 4px;
    position: relative;
    background-color: ${props => {
        if (props.status === 'passed') return props.theme.colors.surface;
        if (props.status === 'failed') return props.theme.colors.surface;
        if (props.status === 'skipped') return props.theme.colors.surface;
        return props.theme.colors.surface;
    }};
    border: 1px solid ${props => {
        if (props.status === 'passed') return '#22c55e';
        if (props.status === 'failed') return '#ef4444';
        if (props.status === 'skipped') return props.theme.colors.border;
        return props.theme.colors.border;
    }};
    color: ${props => props.theme.colors.text};

    @media (max-width: 768px) {
        padding: 0.6rem;
        margin: 0.4rem 0;
    }
`;

const TestInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    position: relative;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 0.5rem;
    }
`;

const TestName = styled.div<{ status: string }>`
    font-size: 0.95rem;
    color: ${props => props.theme.colors.text};
    flex: 1;
    min-width: 200px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: ${props => props.status === 'failed' ? 'help' : 'default'};

    &::before {
        content: "${props => props.status === 'passed' ? '✓' : props.status === 'failed' ? '✘' : ''}";
        color: ${props => {
            if (props.status === 'passed') return '#22c55e';
            if (props.status === 'failed') return '#ef4444';
            return props.theme.colors.text;
        }};
        font-weight: bold;
    }

    @media (max-width: 768px) {
        font-size: 0.9rem;
    }
`;

const TestMeta = styled.div`
    display: flex;
    gap: 1rem;
    color: ${props => props.theme.colors.textSecondary};
    font-size: 0.9rem;
    white-space: nowrap;
    margin-left: auto;

    @media (max-width: 768px) {
        font-size: 0.85rem;
        gap: 0.75rem;
        margin-left: 1.5rem; // Align with the test name after the ✓/✘ icon
    }
`;

const TestBrowser = styled.span`
    display: flex;
    align-items: center;
    gap: 0.25rem;
`;

const TestDuration = styled.span`
    color: ${props => props.theme.colors.textSecondary};
`;

const Tooltip = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #fee2e2;
    border: 1px solid #fecaca;
    color: #dc2626;
    padding: 0.75rem;
    border-radius: 4px;
    font-size: 0.85rem;
    margin-top: 0.5rem;
    z-index: 10;
    white-space: pre-wrap;
    width: 100%;
    max-width: 100vw;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    animation: ${fadeIn} 0.2s ease-in-out;
    max-height: calc(100vh - 300px); // Dynamic height based on viewport
    overflow-y: auto;
    overflow-x: hidden; // Prevent horizontal scroll
    font-family: monospace; // Better for error messages

    &::before {
        content: '';
        position: absolute;
        top: -6px;
        left: 16px;
        width: 10px;
        height: 10px;
        background: #fee2e2;
        border-left: 1px solid #fecaca;
        border-top: 1px solid #fecaca;
        transform: rotate(45deg);
    }

    @media (max-width: 768px) {
        font-size: 0.8rem;
        padding: 0.6rem;
        width: 100%;
    }
`;

const ErrorWrapper = styled.div`
    position: relative;
    width: 100%;
`;

const VisuallyHidden = styled.div`
    position: absolute !important;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
`;

const LoadMoreWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding: 1rem;
`;

const LoadMoreButton = styled.button`
    background-color: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.text};
    padding: 0.75rem 1rem;
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${props => props.theme.colors.hover};
    }

    &:disabled {
        background-color: ${props => props.theme.colors.hover};
        cursor: not-allowed;
    }
`;

export default LiveTestAutomation;
