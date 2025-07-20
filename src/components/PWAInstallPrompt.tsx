import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const InstallBanner = styled.div<{ $isVisible: boolean; $isDark: boolean }>`
  position: fixed;
  bottom: ${props => props.$isVisible ? '20px' : '-100px'};
  left: 50%;
  transform: translateX(-50%);
  background: ${props => props.$isDark ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'linear-gradient(135deg, #3498db 0%, #2c3e50 100%)'};
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 10000;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 90vw;
  width: fit-content;

  @media (max-width: 768px) {
    bottom: ${props => props.$isVisible ? '10px' : '-100px'};
    left: 10px;
    right: 10px;
    transform: none;
    max-width: none;
    width: auto;
    padding: 0.875rem 1rem;
    flex-direction: column;
    text-align: center;
    gap: 0.75rem;
  }
`;

const InstallContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const InstallTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const InstallDescription = styled.p`
  margin: 0;
  font-size: 0.875rem;
  opacity: 0.9;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const InstallActions = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const InstallButton = styled.button`
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
  }
`;

const InstallIcon = styled.div`
  font-size: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

interface PWAInstallPromptProps {
  isDark?: boolean;
}

const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = ({ isDark = false }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Check if running as PWA (iOS Safari)
    if ((window.navigator as any).standalone === true) {
      setIsInstalled(true);
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show install prompt after a delay
      setTimeout(() => {
        const dismissed = localStorage.getItem('pwa-install-dismissed');
        if (!dismissed) {
          setShowInstallPrompt(true);
        }
      }, 3000);
    };

    // Listen for successful installation
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
      localStorage.removeItem('pwa-install-dismissed');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
        localStorage.setItem('pwa-install-dismissed', 'true');
      }
      
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    } catch (error) {
      console.error('Error showing install prompt:', error);
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Don't show if already installed or no prompt available
  if (isInstalled || !deferredPrompt) {
    return null;
  }

  return (
    <InstallBanner $isVisible={showInstallPrompt} $isDark={isDark}>
      <InstallIcon>📱</InstallIcon>
      <InstallContent>
        <InstallTitle>Install Portfolio App</InstallTitle>
        <InstallDescription>
          Add to your home screen for quick access and offline viewing
        </InstallDescription>
      </InstallContent>
      <InstallActions>
        <InstallButton onClick={handleInstallClick}>
          Install
        </InstallButton>
        <DismissButton onClick={handleDismiss}>
          Not now
        </DismissButton>
      </InstallActions>
    </InstallBanner>
  );
};

export default PWAInstallPrompt;