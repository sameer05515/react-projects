import { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { buildTheme } from '../theme';

const ThemeModeContext = createContext(null);

/**
 * Provides the active MUI theme plus a `toggleMode` action to the tree.
 *
 * Note: the user's persisted preference (`theme_preference` on their
 * profile) is loaded via the `/api/users/me` query and used to seed this
 * provider's initial state once auth is wired up in Phase 2; until then it
 * defaults to the OS-level color scheme.
 */
export function ThemeModeProvider({ children }) {
  const prefersDark = typeof window !== 'undefined'
    && window.matchMedia
    && window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [mode, setMode] = useState(prefersDark ? 'dark' : 'light');

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const theme = useMemo(() => buildTheme(mode), [mode]);

  const value = useMemo(() => ({ mode, toggleMode }), [mode, toggleMode]);

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

/**
 * Hook for reading/toggling the active theme mode from any component.
 */
export function useThemeMode() {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) {
    throw new Error('useThemeMode must be used within a ThemeModeProvider');
  }
  return ctx;
}
