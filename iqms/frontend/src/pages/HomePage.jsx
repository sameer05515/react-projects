import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useThemeMode } from '../contexts/ThemeModeContext';

/**
 * Temporary landing page for authenticated users. The real dashboard
 * (stat cards, charts) is built in Phase 10; this page exists so Phase 2
 * can be demonstrated and verified end-to-end (login -> protected route ->
 * logout) before the application pages exist.
 */
export default function HomePage() {
  const { user, logout } = useAuth();
  const { mode, toggleMode } = useThemeMode();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        px: 3,
        textAlign: 'center',
      }}
    >
      <Typography variant="overline" color="secondary">IQMS</Typography>
      <Typography variant="h3">Welcome, {user?.firstName || user?.username}</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 480 }}>
        You're signed in and this route is protected by a real JWT access token.
        The question bank, dashboard, and every other module land in Phases 3–11.
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
        <Chip label={`Roles: ${[...(user?.roles || [])].join(', ')}`} variant="outlined" />
        <Chip label="Phase 2 — Authentication" color="primary" variant="outlined" />
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button variant="outlined" onClick={toggleMode}>
          Switch to {mode === 'light' ? 'dark' : 'light'} mode
        </Button>
        <Button variant="contained" color="secondary" onClick={logout}>
          Sign out
        </Button>
      </Stack>
    </Box>
  );
}
