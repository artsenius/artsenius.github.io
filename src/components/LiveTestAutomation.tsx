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

const TestAutomationSection = styled.section`
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;

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
`;

const TestRunCard = styled.div`
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
`;

const getStatusColor = (status: string, passed: number, failed: number) => {
    if (status === 'completed' || status === 'passed') {
        if (failed === 0 && passed > 0) return '#27ae60'; // Green for all passed
        if (failed > 0 && passed > 0) return '#f39c12'; // Orange for mixed results
        if (failed > 0 && passed === 0) return '#e74c3c'; // Red for all failed
    }
    return '#7f8c8d'; // Grey for other statuses (like pending or error)
};

const TestRunHeader = styled.div<{ status: string; passed: number; failed: number }>`
    background-color: ${props => getStatusColor(props.status, props.passed, props.failed)};
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

const TestRunContent = styled.div<{ isExpanded: boolean }>`
    height: auto;
    max-height: ${props => props.isExpanded ? 'none' : '0'};
    overflow: hidden;
    transition: padding 0.3s ease-in-out;
    padding: ${props => props.isExpanded ? '1rem' : '0'};
    
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

const shimmerAnimation = keyframes`
    0% {
        background-position: -1200px 0;
    }
    100% {
        background-position: 1200px 0;
    }
`;

const shimmerStyle = css`
    background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
    background-size: 2400px 100%;
    animation: ${shimmerAnimation} 1.5s linear infinite;
`;

const LoadingCard = styled.div<{ index: number }>`
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
    background-color: #f8f8f8;
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

const LoadingPlaceholder = () => (
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

const LoadingExpandedContent = styled.div`
    animation: ${fadeInAnimation} 0.3s ease-in-out;
`;

const LoadingTestSummary = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 1rem;
    background-color: #f8fafc;
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

const LiveTestAutomation: React.FC = () => {
    const [testRuns, setTestRuns] = useState<TestRun[]>([]);
    const [expandedRuns, setExpandedRuns] = useState<{ [key: string]: TestRunDetail }>({});
    const [loadingDetails, setLoadingDetails] = useState<{ [key: string]: boolean }>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTestRuns();
    }, []);

    const fetchTestRuns = async () => {
        try {
            const data = await fetchWithErrorHandling(API_ENDPOINTS.TEST_RUNS_SUMMARY);
            setTestRuns(data);
            setLoading(false);
        } catch (error: any) {
            console.error('Fetch error details:', error);
            setError(`Failed to load test runs: ${error.message || 'Unknown error'}`);
            setLoading(false);
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

    if (loading) {
        return (
            <TestAutomationSection>
                <Title>Live Test Automation</Title>
                <LoadingPlaceholder />
            </TestAutomationSection>
        );
    }

    if (error) {
        return (
            <TestAutomationSection>
                <Title>Live Test Automation</Title>
                <ErrorMessage>{error}</ErrorMessage>
            </TestAutomationSection>
        );
    }

    return (
        <TestAutomationSection data-testid="test-automation-section">
            <Title data-testid="test-automation-title">Live Test Automation</Title>
            <TestRunList data-testid="test-run-list">
                {testRuns.map((run) => (
                    <TestRunCard key={run._id} data-testid={`test-run-card-${run._id}`}>
                        <TestRunHeader
                            status={run.status}
                            passed={run.results.passed}
                            failed={run.results.failed}
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
                        <TestRunContent data-testid="test-run-content" isExpanded={!!expandedRuns[run._id] || !!loadingDetails[run._id]}>
                            {loadingDetails[run._id] && renderLoadingExpandedContent()}
                            {expandedRuns[run._id] && (
                                <ExpandedContent data-testid={`expanded-content-${run._id}`}>
                                    <TestSummary data-testid={`test-summary-${run._id}`}>
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
                                        <SummaryItem data-testid="test-run-skipped-tests">
                                            <SummaryLabel>Skipped Tests</SummaryLabel>
                                            <SummaryValue>{expandedRuns[run._id].results.skipped || 0}</SummaryValue>
                                        </SummaryItem>
                                        <SummaryItem data-testid="test-run-blocked-tests">
                                            <SummaryLabel>Blocked Tests</SummaryLabel>
                                            <SummaryValue>{expandedRuns[run._id].results.blocked || 0}</SummaryValue>
                                        </SummaryItem>
                                    </TestSummary>
                                    <TestDetails data-testid={`test-details-${run._id}`}>
                                        {expandedRuns[run._id].results.tests?.map((test: any, index: number) => (
                                            <TestSuite key={index}>
                                                <SuiteTitle>{test.suite}</SuiteTitle>
                                                <TestCase status={test.status}>
                                                    <TestInfo>
                                                        <TestName status={test.status}>{test.title}</TestName>
                                                        <TestMeta>
                                                            <TestBrowser>
                                                                {test.browser === 'chromium' ? '🌐' : '📱'} {test.browser}
                                                            </TestBrowser>
                                                            <TestDuration>{(test.duration / 1000).toFixed(2)}s</TestDuration>
                                                        </TestMeta>
                                                    </TestInfo>
                                                </TestCase>
                                            </TestSuite>
                                        ))}
                                        {expandedRuns[run._id].results.details?.map((test: any, index: number) => (
                                            <TestSuite key={`detail-${index}`}>
                                                <SuiteTitle>{test.suite}</SuiteTitle>
                                                {test.tests?.map((t: any, i: number) => (
                                                    <TestCase key={i} status={t.status}>
                                                        <TestInfo>
                                                            <TestName status={t.status}>{t.name}</TestName>
                                                            <TestMeta>
                                                                <TestBrowser>
                                                                    {t.browser === 'chromium' ? '🌐' : '📱'} {t.browser || 'chromium'}
                                                                </TestBrowser>
                                                                <TestDuration>{t.duration ? `${(t.duration / 1000).toFixed(2)}s` : 'N/A'}</TestDuration>
                                                            </TestMeta>
                                                        </TestInfo>
                                                        {t.error && (
                                                            <TestError>
                                                                {t.error}
                                                            </TestError>
                                                        )}
                                                    </TestCase>
                                                ))}
                                            </TestSuite>
                                        ))}
                                    </TestDetails>
                                </ExpandedContent>
                            )}
                        </TestRunContent>
                    </TestRunCard>
                ))}
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
    background-color: #f8fafc;
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

const TestSuite = styled.div`
    background-color: #f8fafc;
    padding: 1rem;
    border-radius: 6px;

    @media (max-width: 768px) {
        padding: 0.75rem;
    }
`;

const SuiteTitle = styled.h4`
    color: #2c3e50;
    margin: 0 0 0.75rem;
    font-size: 1.1rem;
    border-bottom: 1px solid #e2e8f0;
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
    background-color: ${props =>
        props.status === 'passed' ? '#f0fdf4' : // Light green for passed
            props.status === 'failed' ? '#fef2f2' : // Light red for failed
                props.status === 'skipped' ? '#f8fafc' :
                    '#fff'};
    border: 1px solid ${props =>
        props.status === 'passed' ? '#86efac' : // Green border for passed
            props.status === 'failed' ? '#fecaca' : // Red border for failed
                props.status === 'skipped' ? '#e2e8f0' :
                    '#e2e8f0'};

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

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 0.5rem;
    }
`;

const TestName = styled.div<{ status: string }>`
    font-size: 0.95rem;
    color: #1e293b;
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before {
        content: "${props => props.status === 'passed' ? '✓' : props.status === 'failed' ? '✘' : ''}";
        color: ${props => props.status === 'passed' ? '#16a34a' : props.status === 'failed' ? '#dc2626' : 'inherit'};
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

    @media (max-width: 768px) {
        font-size: 0.85rem;
        gap: 0.75rem;
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

const TestError = styled.pre`
    margin: 0.5rem 0 0;
    padding: 0.75rem;
    background-color: #fff1f2;
    border-radius: 4px;
    font-size: 0.85rem;
    color: #e11d48;
    overflow-x: auto;
    white-space: pre-wrap;

    @media (max-width: 768px) {
        font-size: 0.8rem;
        padding: 0.6rem;
    }
`;

export default LiveTestAutomation;
