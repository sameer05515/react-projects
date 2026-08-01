import { Box, Paper, Stack, Typography } from '@mui/material';

/**
 * Centered-card shell shared by Login/Register/Forgot/Reset pages.
 */
export function AuthLayout({ title, subtitle, children }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        bgcolor: 'background.default',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 420,
          p: { xs: 3, sm: 4 },
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Stack spacing={0.5} sx={{ mb: 3 }}>
          <Typography variant="overline" color="secondary">IQMS</Typography>
          <Typography variant="h5" fontWeight={700}>{title}</Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">{subtitle}</Typography>
          )}
        </Stack>
        {children}
      </Paper>
    </Box>
  );
}
