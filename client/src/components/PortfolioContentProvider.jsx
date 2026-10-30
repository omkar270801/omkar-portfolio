import { createContext, useContext, useEffect, useState } from 'react';
import { API_URL } from '../config/api';
import { portfolioContentDefaults } from '../data/portfolioData';

const PortfolioContentContext = createContext(null);

const mergeContent = (defaults, saved) => Object.fromEntries(
  Object.entries(defaults).map(([key, defaultValue]) => {
    const savedValue = saved?.[key];
    if (
      defaultValue &&
      savedValue &&
      typeof defaultValue === 'object' &&
      !Array.isArray(defaultValue) &&
      typeof savedValue === 'object' &&
      !Array.isArray(savedValue)
    ) {
      return [key, { ...defaultValue, ...savedValue }];
    }
    return [key, savedValue === undefined ? defaultValue : savedValue];
  }),
);

export function PortfolioContentProvider({ children }) {
  const [content, setContent] = useState(portfolioContentDefaults);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/content`)
      .then((response) => (response.ok ? response.json() : null))
      .then((saved) => {
        if (saved && typeof saved === 'object') {
          setContent(mergeContent(portfolioContentDefaults, saved));
        }
      })
      .catch(() => {
        // Keep the bundled portfolio content visible when the API is unavailable.
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const updateContent = (saved) => {
    setContent((current) => mergeContent(current, saved));
  };

  return (
    <PortfolioContentContext.Provider value={{ content, updateContent, isLoading }}>
      {children}
    </PortfolioContentContext.Provider>
  );
}

export function usePortfolioContent() {
  const value = useContext(PortfolioContentContext);
  if (!value) throw new Error('usePortfolioContent must be used within PortfolioContentProvider');
  return value;
}
