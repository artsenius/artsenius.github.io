import React, { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

const ErrorContainer = styled.div<{ $isDark?: boolean }>`
  padding: 2rem;
  text-align: center;
  background-color: ${props => props.$isDark ? '#2c1810' : '#fef2f2'};
  border: 1px solid ${props => props.$isDark ? '#7c2d12' : '#fecaca'};
  border-radius: 8px;
  margin: 2rem;
  color: ${props => props.$isDark ? '#fed7aa' : '#dc2626'};
`;

const ErrorTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: inherit;
`;

const ErrorMessage = styled.p`
  margin-bottom: 1.5rem;
  font-size: 1rem;
  line-height: 1.5;
`;

const ErrorActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const ActionButton = styled.button<{ $variant?: 'primary' | 'secondary'; $isDark?: boolean }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => props.$variant === 'primary' ? `
    background-color: ${props.$isDark ? '#2563eb' : '#3b82f6'};
    color: white;
    
    &:hover {
      background-color: ${props.$isDark ? '#1d4ed8' : '#1e40af'};
    }
  ` : `
    background-color: ${props.$isDark ? '#374151' : '#f3f4f6'};
    color: ${props.$isDark ? '#d1d5db' : '#374151'};
    border: 1px solid ${props.$isDark ? '#4b5563' : '#d1d5db'};
    
    &:hover {
      background-color: ${props.$isDark ? '#4b5563' : '#e5e7eb'};
    }
  `}
`;

const ErrorDetails = styled.details<{ $isDark?: boolean }>`
  margin-top: 1.5rem;
  text-align: left;
  
  summary {
    cursor: pointer;
    font-weight: 500;
    margin-bottom: 1rem;
    color: ${props => props.$isDark ? '#9ca3af' : '#6b7280'};
    
    &:hover {
      color: ${props => props.$isDark ? '#d1d5db' : '#374151'};
    }
  }
`;

const ErrorStack = styled.pre<{ $isDark?: boolean }>`
  background-color: ${props => props.$isDark ? '#1f2937' : '#f9fafb'};
  border: 1px solid ${props => props.$isDark ? '#374151' : '#e5e7eb'};
  border-radius: 4px;
  padding: 1rem;
  font-size: 0.875rem;
  overflow-x: auto;
  white-space: pre-wrap;
  color: ${props => props.$isDark ? '#d1d5db' : '#374151'};
`;

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Here you could send error reports to a service like Sentry
    // Example: Sentry.captureException(error, { contexts: { react: errorInfo } });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  public render() {
    if (this.state.hasError) {
      // Check if we're in dark mode by looking at the theme in localStorage
      const isDark = localStorage.getItem('theme') === 'dark';

      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorContainer $isDark={isDark}>
          <ErrorTitle>Oops! Something went wrong</ErrorTitle>
          <ErrorMessage>
            We're sorry, but something unexpected happened. This error has been logged 
            and we'll look into it. You can try refreshing the page or going back to the home page.
          </ErrorMessage>
          
          <ErrorActions>
            <ActionButton $variant="primary" $isDark={isDark} onClick={this.handleRetry}>
              Try Again
            </ActionButton>
            <ActionButton $variant="secondary" $isDark={isDark} onClick={this.handleReload}>
              Refresh Page
            </ActionButton>
            <ActionButton $variant="secondary" $isDark={isDark} onClick={this.handleGoHome}>
              Go Home
            </ActionButton>
          </ErrorActions>

          {process.env.NODE_ENV === 'development' && this.state.error && (
            <ErrorDetails $isDark={isDark}>
              <summary>Error Details (Development Only)</summary>
              <ErrorStack $isDark={isDark}>
                <strong>Error:</strong> {this.state.error.message}
                {this.state.error.stack && (
                  <>
                    <br /><br />
                    <strong>Stack Trace:</strong>
                    <br />
                    {this.state.error.stack}
                  </>
                )}
                {this.state.errorInfo?.componentStack && (
                  <>
                    <br /><br />
                    <strong>Component Stack:</strong>
                    <br />
                    {this.state.errorInfo.componentStack}
                  </>
                )}
              </ErrorStack>
            </ErrorDetails>
          )}
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;