'use client';

import { createContext, useContext } from 'react';

const SiteDataContext = createContext({
  settings: null,
  categories: [],
});

export function SiteDataProvider({ settings, categories, children }) {
  return (
    <SiteDataContext.Provider value={{ settings, categories }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  return useContext(SiteDataContext);
}
