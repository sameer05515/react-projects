import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { authService } from '../services/authService';
import { setAccessToken } from '../services/apiClient';

const AuthContext = createContext(null);

/**
 * Provides authentication state and actions to the whole app.
 *
 * On mount, attempts a silent refresh (the HttpOnly refresh cookie, if any,
 * is sent automatically by the browser) so a page reload doesn't force a
 * fresh login as long as the refresh token is still valid. While that
 * bootstrap is in flight, `isInitializing` is true so routes can show a
 * loading state instead of flashing the login page.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        await authService.refresh();
        const currentUser = await authService.getCurrentUser();
        if (!cancelled) setUser(currentUser);
      } catch {
        // No valid refresh cookie — the user simply isn't logged in yet.
        if (!cancelled) setAccessToken(null);
      } finally {
        if (!cancelled) setIsInitializing(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (usernameOrEmail, password) => {
    const result = await authService.login({ usernameOrEmail, password });
    setUser(result.user);
    return result.user;
  }, []);

  const register = useCallback(async (payload) => {
    const result = await authService.register(payload);
    setUser(result.user);
    return result.user;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  const refreshCurrentUser = useCallback(async () => {
    const currentUser = await authService.getCurrentUser();
    setUser(currentUser);
    return currentUser;
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isInitializing,
      login,
      register,
      logout,
      refreshCurrentUser,
    }),
    [user, isInitializing, login, register, logout, refreshCurrentUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
