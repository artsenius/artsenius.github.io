import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { API_ENDPOINTS, fetchWithErrorHandling } from '../config/api';

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

    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

const Title = styled.h1`
    color: #2c3e50;
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
    }
`;

const TestRunList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-height: 400px; /* Ensure consistent height even when loading */
    width: 100%;
    overflow-x: hidden;
    box-sizing: border-box;
`;

const TestRunCard = styled.div<{ $isDark: boolean }>`
    background-color: ${props => props.$isDark ? 'transparent' : 'white'};
    border-radius: 8px;
    box-shadow: ${props => props.$isDark ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.1)'};
    overflow: hidden;
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
    padding: 1rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }
`;

const ChevronIcon = styled.span<{ isExpanded: boolean }>`
    display: inline-block;
    margin-right: 0.5rem;
    transition: transform 0.3s ease;
    transform: ${props => props.isExpanded ? 'rotate(-180deg)' : 'rotate(0)'};
    font-size: 0.8rem;
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
    gap: 1rem;

    @media (max-width: 768px) {
        flex-wrap: wrap;
        gap: 0.75rem;
    }
`;

const StatItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.25rem;

    @media (max-width: 768px) {
        font-size: 0.9rem;
    }
`;

const TestRunContent = styled.div<{ isExpanded: boolean; $isDark: boolean }>`
    height: auto;
    max-height: ${props => props.isExpanded ? 'none' : '0'};
    overflow: hidden;
    transition: padding 0.3s ease-in-out, background-color 0.3s;
    padding: ${props => props.isExpanded ? '1rem' : '0'};
    background-color: ${props => props.$isDark ? '#23272f' : '#fff'};
    
    @media (max-width: 768px) {
        padding: ${props => props.isExpanded ? '0.75rem' : '0'};
    }
`;

const ErrorMessage = styled.div`
    text-align: center;
    padding: 2rem;
    color: #e74c3c;
    font-size: 1.2rem;
`;

const fadeInAnimation = keyframes`
    0% {
        opacity: 0;
        transform: translateY(10px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;

const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

const shimmerAnimation = keyframes`
    0% {
        background-position: -1200px 0;
    }
    100% {
        background-position: 1200px 0;
    }
`;

const shimmerStyle = css<{ $isDark?: boolean }>`
    background: linear-gradient(to right, ${props => props.$isDark ? '#23272f 8%, #374151 18%, #23272f 33%' : '#f6f7f8 8%, #edeef1 18%, #f6f7f8 33%'});
    background-size: 2400px 100%;
    animation: ${shimmerAnimation} 1.5s linear infinite;
`;

const LoadingCard = styled.div<{ index: number; $isDark: boolean }>`
    background-color: ${props => props.$isDark ? '#23272f' : 'white'};
    border-radius: 8px;
    box-shadow: 0 2px 4px ${props => props.$isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.1)'};
    overflow: hidden;
    opacity: 0;
    animation: ${fadeInAnimation} 0.5s ease forwards;
    animation-delay: ${props => props.index * 0.1}s;
    
    @media (max-width: 768px) {
        height: auto;
    }
`;

const LoadingHeader = styled.div<{ $isDark: boolean }>`
    height: 60px;
    background-color: ${props => props.$isDark ? '#23272f' : '#f8f8f8'};
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

const LoadingProjectIcon = styled.div<{ $isDark: boolean }>`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    ${shimmerStyle}
`;

const LoadingProjectName = styled.div<{ $isDark: boolean }>`
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

const LoadingStatIcon = styled.div<{ type: 'pass' | 'fail' | 'date'; $isDark: boolean }>`
    width: 16px;
    height: 16px;
    border-radius: ${props => props.type === 'date' ? '3px' : '50%'};
    ${shimmerStyle}
`;

const LoadingStatValue = styled.div<{ width: string; $isDark: boolean }>`
    width: ${props => props.width};
    height: 16px;
    ${shimmerStyle}
    border-radius: 3px;
`;

const LoadingPlaceholder = () => (
    <TestRunList data-testid="loading-placeholder">
        {[1, 2, 3, 4, 5].map((_, index) => (
            <LoadingCard key={index} index={index} $isDark={true}>
                <LoadingHeader $isDark={true}>
                    <LoadingTitle>
                        <LoadingProjectIcon $isDark={true} />
                        <LoadingProjectName $isDark={true} />
                    </LoadingTitle>
                    <LoadingStats>
                        <LoadingStatWrapper>
                            <LoadingStatIcon type="pass" $isDark={true} />
                            <LoadingStatValue width="24px" $isDark={true} />
                        </LoadingStatWrapper>
                        <LoadingStatWrapper>
                            <LoadingStatIcon type="fail" $isDark={true} />
                            <LoadingStatValue width="24px" $isDark={true} />
                        </LoadingStatWrapper>
                        <LoadingStatWrapper>
                            <LoadingStatIcon type="date" $isDark={true} />
                            <LoadingStatValue width="120px" $isDark={true} />
                        </LoadingStatWrapper>
                    </LoadingStats>
                </LoadingHeader>
            </LoadingCard>
        ))}
    </TestRunList>
);

const LoadingExpandedContent = styled.div`
    animation: ${fadeInAnimation} 0.3s ease-in-out;
`;

const LoadingTestSummary = styled.div<{ $isDark: boolean }>`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 1rem;
    background-color: ${props => props.$isDark ? '#23272f' : '#f8fafc'};
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

const LoadingSummaryLabel = styled.div<{ $isDark: boolean }>`
    height: 0.8rem;
    width: 60%;
    border-radius: 4px;
    ${shimmerStyle}

    @media (max-width: 768px) {
        width: 40%;
    }
`;

const LoadingSummaryValue = styled.div<{ $isDark: boolean }>`
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

const LoadingTestSuite = styled.div<{ $isDark: boolean }>`
    margin-bottom: 1rem;
`;

const LoadingSuiteTitle = styled.div<{ $isDark: boolean }>`
    height: 0.95rem;
    width: 70%;
    margin: 0.25rem 0;
    border-radius: 4px;
    ${shimmerStyle}
`;

const LoadingTestCase = styled.div<{ $isDark: boolean }>`
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
    border-top: 3px solid #3498db;
    border-radius: 50%;
    width: 1.2em;
    height: 1.2em;
    animation: spin 0.7s linear infinite;
    display: inline-block;
    vertical-align: middle;
    margin-right: 0.5em;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
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

    useEffect(() => {
        fetchTestRuns(limit);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit]);

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
        if (expandedRuns[id]) {
            const newExpandedRuns = { ...expandedRuns };
            delete newExpandedRuns[id];
            setExpandedRuns(newExpandedRuns);
            return;
        }

        // Set loading state immediately
        setLoadingDetails(prev => ({ ...prev, [id]: true }));

        try {
            const data = await fetchWithErrorHandling(API_ENDPOINTS.TEST_RUN_DETAILS(id));
            setExpandedRuns(prev => ({
                ...prev,
                [id]: data
            }));
        } catch (err) {
            setError('Failed to load test run details. Please try again.');
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
            <LoadingTestSummary $isDark={isDark}>
                {Array(8).fill(null).map((_, index) => (
                    <LoadingSummaryItem key={index}>
                        <LoadingSummaryLabel $isDark={isDark} />
                        <LoadingSummaryValue $isDark={isDark} />
                    </LoadingSummaryItem>
                ))}
            </LoadingTestSummary>
            <LoadingTestDetails>
                {Array(3).fill(null).map((_, suiteIndex) => (
                    <LoadingTestSuite key={suiteIndex} $isDark={isDark}>
                        <LoadingSuiteTitle $isDark={isDark} />
                        {Array(2).fill(null).map((_, caseIndex) => (
                            <LoadingTestCase key={caseIndex} $isDark={isDark} />
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
        <TestCase key={`${runId}-${index}`} status={test.status} $isDark={isDark}>
            <ErrorWrapper>
                <TestInfo>
                    <TestName
                        status={test.status}
                        $isDark={isDark}
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
            <TestAutomationSection>
                <LoadingPlaceholder />
            </TestAutomationSection>
        );
    }

    if (error) {
        return (
            <TestAutomationSection>
                <ErrorMessage>{error}</ErrorMessage>
            </TestAutomationSection>
        );
    }

    const canLoadMore = testRuns.length >= limit && limit < MAX_RESULTS;

    return (
        <TestAutomationSection data-testid="test-automation-section">
            <TestRunList data-testid="test-run-list">
                {testRuns.map((run) => (
                    <TestRunCard key={run._id} data-testid={`test-run-card-${run._id}`} $isDark={isDark}>
                        <TestRunHeader
                            status={run.status}
                            passed={run.results.passed}
                            failed={run.results.failed}
                            $isDark={isDark}
                            onClick={() => toggleRunDetails(run._id)}
                            data-testid={`test-run-header-${run._id}`}
                        >
                            <TestRunTitleWrapper>
                                <ChevronIcon isExpanded={!!expandedRuns[run._id] || !!loadingDetails[run._id]}>▼</ChevronIcon>
                                <TestRunTitle>{run.project}</TestRunTitle>
                            </TestRunTitleWrapper>
                            <TestRunStats>
                                <StatItem>✅ {run.results.passed}</StatItem>
                                <StatItem>❌ {run.results.failed}</StatItem>
                                <StatItem>{formatDate(run.startedAt)}</StatItem>
                            </TestRunStats>
                        </TestRunHeader>
                        <TestRunContent data-testid="test-run-content" isExpanded={!!expandedRuns[run._id] || !!loadingDetails[run._id]} $isDark={isDark}>
                            {loadingDetails[run._id] && renderLoadingExpandedContent()}
                            {expandedRuns[run._id] && (
                                <ExpandedContent data-testid={`expanded-content-${run._id}`}>
                                    <TestSummary data-testid={`test-summary-${run._id}`} $isDark={isDark}>
                                        <SummaryItem data-testid="test-run-duration">
                                            <SummaryLabel>Duration</SummaryLabel>
                                            <SummaryValue>{(expandedRuns[run._id].duration / 1000).toFixed(2)}s</SummaryValue>
                                        </SummaryItem>
                                        <SummaryItem data-testid="test-run-success-rate">
                                            <SummaryLabel>Success Rate</SummaryLabel>
                                            <SummaryValue>
                                                {Math.round((expandedRuns[run._id].results.passed /
                                                    (expandedRuns[run._id].results.passed + expandedRuns[run._id].results.failed)) * 100)}%
                                            </SummaryValue>
                                        </SummaryItem>
                                        <SummaryItem data-testid="test-run-passed-tests">
                                            <SummaryLabel>Passed Tests</SummaryLabel>
                                            <SummaryValue>{expandedRuns[run._id].results.passed}</SummaryValue>
                                        </SummaryItem>
                                        <SummaryItem data-testid="test-run-failed-tests">
                                            <SummaryLabel>Failed Tests</SummaryLabel>
                                            <SummaryValue>{expandedRuns[run._id].results.failed}</SummaryValue>
                                        </SummaryItem>
                                        <SummaryItem>
                                            <SummaryLabel>Skipped Tests</SummaryLabel>
                                            <SummaryValue>{expandedRuns[run._id].results.skipped || 0}</SummaryValue>
                                        </SummaryItem>
                                        <SummaryItem>
                                            <SummaryLabel>Blocked Tests</SummaryLabel>
                                            <SummaryValue>{expandedRuns[run._id].results.blocked || 0}</SummaryValue>
                                        </SummaryItem>
                                    </TestSummary>
                                    <TestDetails data-testid={`test-details-${run._id}`}>
                                        {expandedRuns[run._id].results.tests?.map((test: any, index: number) => (
                                            <TestSuite data-testid={`test-suite-${run._id}`} key={index} $isDark={isDark}>
                                                <SuiteTitle data-testid={`test-suite-title-${run._id}`} $isDark={isDark}>{test.suite}</SuiteTitle>
                                                <TestCase status={test.status} $isDark={isDark}>
                                                    <ErrorWrapper>
                                                        <TestInfo>
                                                            <TestName status={test.status} $isDark={isDark}
                                                                onMouseEnter={() => test.error && setHoveredError({
                                                                    id: `${run._id}-${index}`,
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
                                                        {hoveredError?.id === `${run._id}-${index}` && (
                                                            <Tooltip>{hoveredError.error}</Tooltip>
                                                        )}
                                                    </ErrorWrapper>
                                                </TestCase>
                                            </TestSuite>
                                        ))}
                                        {expandedRuns[run._id].results.details?.map((suite: any, suiteIndex: number) => (
                                            <TestSuite key={`detail-${suiteIndex}`} $isDark={isDark}>
                                                <SuiteTitle $isDark={isDark}>{suite.suite}</SuiteTitle>
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
                    <LoadMoreWrapper>
                        <LoadMoreButton
                            onClick={() => setLimit(l => Math.min(l + PAGE_SIZE, MAX_RESULTS))}
                            disabled={loadingMore}
                            $isDark={isDark}
                            data-testid="load-more-button"
                        >
                            {loadingMore ? <><Spinner />Loading...</> : 'Load more results'}
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

const TestSummary = styled.div<{ $isDark: boolean }>`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 1rem;
    background-color: ${props => props.$isDark ? '#23272f' : '#f8fafc'};
    color: ${props => props.$isDark ? '#ecf0f1' : '#2c3e50'};
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
    color: #64748b;
    font-size: 0.9rem;

    @media (max-width: 768px) {
        font-size: 0.8rem;
    }
`;

const SummaryValue = styled.div`
    font-size: 1.1rem;
    font-weight: 500;

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

const TestSuite = styled.div<{ $isDark: boolean }>`
    background-color: ${props => props.$isDark ? '#23272f' : '#f8fafc'};
    color: ${props => props.$isDark ? '#ecf0f1' : '#2c3e50'};
    padding: 1rem;
    border-radius: 6px;

    @media (max-width: 768px) {
        padding: 0.75rem;
    }
`;

const SuiteTitle = styled.h4<{ $isDark: boolean }>`
    color: ${props => props.$isDark ? '#f3f4f6' : '#2c3e50'};
    margin: 0 0 0.75rem;
    font-size: 1.1rem;
    border-bottom: 1px solid ${props => props.$isDark ? '#374151' : '#e2e8f0'};
    padding-bottom: 0.5rem;

    @media (max-width: 768px) {
        font-size: 1rem;
        margin-bottom: 0.5rem;
    }
`;

const TestCase = styled.div<{ status: string; $isDark: boolean }>`
    padding: 0.75rem;
    margin: 0.5rem 0;
    border-radius: 4px;
    position: relative;
    background-color: ${props => {
        if (props.$isDark) {
            if (props.status === 'passed') return '#14532d';
            if (props.status === 'failed') return '#7f1d1d';
            if (props.status === 'skipped') return '#23272f';
            return '#23272f';
        } else {
            if (props.status === 'passed') return '#f0fdf4';
            if (props.status === 'failed') return '#fef2f2';
            if (props.status === 'skipped') return '#f8fafc';
            return '#fff';
        }
    }};
    border: 1px solid ${props => {
        if (props.$isDark) {
            if (props.status === 'passed') return '#22c55e';
            if (props.status === 'failed') return '#ef4444';
            if (props.status === 'skipped') return '#374151';
            return '#374151';
        } else {
            if (props.status === 'passed') return '#86efac';
            if (props.status === 'failed') return '#fecaca';
            if (props.status === 'skipped') return '#e2e8f0';
            return '#e2e8f0';
        }
    }};
    color: ${props => props.$isDark ? '#ecf0f1' : '#1e293b'};

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

const TestName = styled.div<{ status: string; $isDark: boolean }>`
    font-size: 0.95rem;
    color: ${props => props.$isDark ? '#ecf0f1' : '#1e293b'};
    flex: 1;
    min-width: 200px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: ${props => props.status === 'failed' ? 'help' : 'default'};

    &::before {
        content: "${props => props.status === 'passed' ? '✓' : props.status === 'failed' ? '✘' : ''}";
        color: ${props => {
            if (props.status === 'passed') return props.$isDark ? '#22c55e' : '#16a34a';
            if (props.status === 'failed') return props.$isDark ? '#ef4444' : '#dc2626';
            return props.$isDark ? '#ecf0f1' : 'inherit';
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
    color: #64748b;
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
    color: #64748b;
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

const LoadMoreWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding: 1rem;
`;

const LoadMoreButton = styled.button<{ $isDark: boolean }>`
    background-color: ${props => props.$isDark ? '#23272f' : '#f8f8f8'};
    color: ${props => props.$isDark ? '#ecf0f1' : '#2c3e50'};
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;

    &:hover {
        background-color: ${props => props.$isDark ? '#374151' : '#e2e8f0'};
    }

    &:disabled {
        background-color: ${props => props.$isDark ? '#374151' : '#e2e8f0'};
        cursor: not-allowed;
    }
`;

export default LiveTestAutomation;
