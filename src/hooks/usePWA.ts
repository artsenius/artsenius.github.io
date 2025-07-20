import { useState, useEffect, useCallback } from 'react';

interface PWAStatus {
  isOnline: boolean;
  isInstalled: boolean;
  isUpdateAvailable: boolean;
  updateServiceWorker: () => void;
}

export const usePWA = (): PWAStatus => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    // Check if app is installed
    const checkInstalled = () => {
      // Check for standalone mode (PWA)
      if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true);
        return;
      }

      // Check for iOS standalone mode
      if ((window.navigator as any).standalone === true) {
        setIsInstalled(true);
        return;
      }

      setIsInstalled(false);
    };

    checkInstalled();

    // Listen for display mode changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(display-mode: standalone)');
      mediaQuery.addEventListener('change', checkInstalled);
      
      return () => mediaQuery.removeEventListener('change', checkInstalled);
    }
  }, []);

  useEffect(() => {
    // Register service worker and listen for updates
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          // Check for waiting service worker
          if (registration.waiting) {
            setWaitingWorker(registration.waiting);
            setIsUpdateAvailable(true);
          }

          // Listen for new service worker installing
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  setWaitingWorker(newWorker);
                  setIsUpdateAvailable(true);
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('Service worker registration failed:', error);
        });

      // Listen for service worker controller changes
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });
    }
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const updateServiceWorker = useCallback(() => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
      setIsUpdateAvailable(false);
      setWaitingWorker(null);
    }
  }, [waitingWorker]);

  return {
    isOnline,
    isInstalled,
    isUpdateAvailable,
    updateServiceWorker,
  };
};

export const useOfflineStorage = () => {
  const storeOfflineData = useCallback(async (key: string, data: any) => {
    try {
      if ('indexedDB' in window) {
        // Use IndexedDB for larger data
        const dbName = 'portfolioOfflineDB';
        const storeName = 'offlineData';
        
        const request = indexedDB.open(dbName, 1);
        
        request.onupgradeneeded = () => {
          const db = request.result;
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: 'key' });
          }
        };
        
        request.onsuccess = () => {
          const db = request.result;
          const transaction = db.transaction([storeName], 'readwrite');
          const store = transaction.objectStore(storeName);
          store.put({ key, data, timestamp: Date.now() });
        };
      } else {
        // Fallback to localStorage
        localStorage.setItem(`offline_${key}`, JSON.stringify({
          data,
          timestamp: Date.now()
        }));
      }
    } catch (error) {
      console.error('Failed to store offline data:', error);
    }
  }, []);

  const getOfflineData = useCallback(async (key: string) => {
    try {
      if ('indexedDB' in window) {
        const dbName = 'portfolioOfflineDB';
        const storeName = 'offlineData';
        
        return new Promise((resolve) => {
          const request = indexedDB.open(dbName, 1);
          
          request.onsuccess = () => {
            const db = request.result;
            const transaction = db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const getRequest = store.get(key);
            
            getRequest.onsuccess = () => {
              resolve(getRequest.result?.data || null);
            };
            
            getRequest.onerror = () => {
              resolve(null);
            };
          };
          
          request.onerror = () => {
            resolve(null);
          };
        });
      } else {
        // Fallback to localStorage
        const stored = localStorage.getItem(`offline_${key}`);
        return stored ? JSON.parse(stored).data : null;
      }
    } catch (error) {
      console.error('Failed to get offline data:', error);
      return null;
    }
  }, []);

  return {
    storeOfflineData,
    getOfflineData,
  };
};

export default usePWA;