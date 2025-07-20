import React from 'react';
import styled from 'styled-components';
import { usePWA } from '../hooks/usePWA';

const UpdateBanner = styled.div<{ $isVisible: boolean; $isDark: boolean }>`
  position: fixed;
  top: ${props => props.$isVisible ? '0' : '-100px'};
  left: 0;
  right: 0;
  background: ${props => props.$isDark ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)'};
  color: white;
  padding: 1rem;
  z-index: 10001;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const UpdateContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 0.75rem;
  }
`;

const UpdateMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const UpdateIcon = styled.div`
  font-size: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const UpdateText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const UpdateTitle = styled.h4`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const UpdateDescription = styled.p`
  margin: 0;
  font-size: 0.875rem;
  opacity: 0.9;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const UpdateActions = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const UpdateButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(5px);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    flex: 1;
    padding: 0.625rem 1rem;
    max-width: 120px;
  }
`;

const DismissButton = styled.button`
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: white;
    border-color: rgba(255, 255, 255, 0.4);
  }

  @media (max-width: 768px) {
    flex: 1;
    padding: 0.625rem 1rem;
    max-width: 120px;
  }
`;

const OfflineBanner = styled.div<{ $isVisible: boolean; $isDark: boolean }>`
  position: fixed;
  bottom: ${props => props.$isVisible ? '20px' : '-100px'};
  left: 20px;
  background: ${props => props.$isDark ? '#e74c3c' : '#e74c3c'};
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
  z-index: 10000;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;

  @media (max-width: 768px) {
    left: 10px;
    right: 10px;
    font-size: 0.8rem;
  }
`;

interface PWAUpdateNotificationProps {
  isDark?: boolean;
}

const PWAUpdateNotification: React.FC<PWAUpdateNotificationProps> = ({ isDark = false }) => {
  const { isOnline, isUpdateAvailable, updateServiceWorker } = usePWA();
  const [showUpdate, setShowUpdate] = React.useState(false);

  React.useEffect(() => {
    if (isUpdateAvailable) {
      setShowUpdate(true);
    }
  }, [isUpdateAvailable]);

  const handleUpdate = () => {
    updateServiceWorker();
    setShowUpdate(false);
  };

  const handleDismiss = () => {
    setShowUpdate(false);
  };

  return (
    <>
      {/* Update Available Notification */}
      <UpdateBanner $isVisible={showUpdate && isUpdateAvailable} $isDark={isDark}>
        <UpdateContent>
          <UpdateMessage>
            <UpdateIcon>🚀</UpdateIcon>
            <UpdateText>
              <UpdateTitle>New Update Available!</UpdateTitle>
              <UpdateDescription>
                A new version of the app is ready. Update now for the latest features and improvements.
              </UpdateDescription>
            </UpdateText>
          </UpdateMessage>
          <UpdateActions>
            <UpdateButton onClick={handleUpdate}>
              Update Now
            </UpdateButton>
            <DismissButton onClick={handleDismiss}>
              Later
            </DismissButton>
          </UpdateActions>
        </UpdateContent>
      </UpdateBanner>

      {/* Offline Notification */}
      <OfflineBanner $isVisible={!isOnline} $isDark={isDark}>
        <span>📴</span>
        <span>You're offline. Some features may be limited.</span>
      </OfflineBanner>
    </>
  );
};

export default PWAUpdateNotification;