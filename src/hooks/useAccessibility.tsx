import React, { useEffect, useRef, useCallback } from 'react';

// Hook for managing focus trapping in modals/menus
export const useFocusTrap = (isActive: boolean) => {
  const containerRef = useRef<HTMLElement>(null);
  const firstFocusableRef = useRef<HTMLElement | null>(null);
  const lastFocusableRef = useRef<HTMLElement | null>(null);

  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return [];
    
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ');
    
    return Array.from(containerRef.current.querySelectorAll(focusableSelectors)) as HTMLElement[];
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isActive || e.key !== 'Tab') return;

    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }, [isActive, getFocusableElements]);

  useEffect(() => {
    if (isActive) {
      const focusableElements = getFocusableElements();
      if (focusableElements.length > 0) {
        firstFocusableRef.current = focusableElements[0];
        lastFocusableRef.current = focusableElements[focusableElements.length - 1];
        firstFocusableRef.current.focus();
      }
      
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isActive, handleKeyDown, getFocusableElements]);

  return containerRef;
};

// Hook for escape key handling
export const useEscapeKey = (callback: () => void, isActive: boolean = true) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (isActive && e.key === 'Escape') {
        callback();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [callback, isActive]);
};

// Hook for keyboard navigation (arrow keys)
export const useKeyboardNavigation = (
  items: HTMLElement[],
  orientation: 'horizontal' | 'vertical' = 'vertical',
  loop: boolean = true
) => {
  const currentIndex = useRef(0);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const { key } = e;
    const isHorizontal = orientation === 'horizontal';
    const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';
    const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';

    if (![nextKey, prevKey, 'Home', 'End'].includes(key)) return;

    e.preventDefault();

    switch (key) {
      case nextKey:
        if (currentIndex.current < items.length - 1) {
          currentIndex.current++;
        } else if (loop) {
          currentIndex.current = 0;
        }
        break;
      case prevKey:
        if (currentIndex.current > 0) {
          currentIndex.current--;
        } else if (loop) {
          currentIndex.current = items.length - 1;
        }
        break;
      case 'Home':
        currentIndex.current = 0;
        break;
      case 'End':
        currentIndex.current = items.length - 1;
        break;
    }

    items[currentIndex.current]?.focus();
  }, [items, orientation, loop]);

  return { handleKeyDown, currentIndex: currentIndex.current };
};

// Hook for screen reader announcements
export const useScreenReader = () => {
  const announcementRef = useRef<HTMLDivElement>(null);

  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (announcementRef.current) {
      announcementRef.current.setAttribute('aria-live', priority);
      announcementRef.current.textContent = message;
      
      // Clear after announcement
      setTimeout(() => {
        if (announcementRef.current) {
          announcementRef.current.textContent = '';
        }
      }, 1000);
    }
  }, []);

  const AnnouncementRegion = useCallback((): JSX.Element => (
    <div
      ref={announcementRef}
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
      style={{
        position: 'absolute',
        left: '-10000px',
        width: '1px',
        height: '1px',
        overflow: 'hidden'
      }}
    />
  ), []);

  return { announce, AnnouncementRegion };
};

// Hook for managing focus restoration
export const useFocusRestore = () => {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const saveFocus = useCallback(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;
  }, []);

  const restoreFocus = useCallback(() => {
    if (previousFocusRef.current && previousFocusRef.current.focus) {
      previousFocusRef.current.focus();
    }
  }, []);

  return { saveFocus, restoreFocus };
};

// Hook for unique IDs
export const useUniqueId = (prefix: string = 'id') => {
  const idRef = useRef<string>();
  
  if (!idRef.current) {
    idRef.current = `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  }

  return idRef.current;
};