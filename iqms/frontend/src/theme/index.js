import { createTheme } from '@mui/material/styles';
import { getDesignTokens } from './palette';

/**
 * Builds the MUI theme for the given mode ("light" | "dark"), layering
 * component-level overrides on top of the base design tokens.
 *
 * @param {'light'|'dark'} mode active color scheme
 * @returns {import('@mui/material/styles').Theme}
 */
export function buildTheme(mode) {
  const base = createTheme(getDesignTokens(mode));

  return createTheme(base, {
    components: {
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none' },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 8, paddingInline: 16 },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border: `1px solid ${base.palette.divider}`,
            boxShadow: 'none',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: base.palette.background.paper,
            color: base.palette.text.primary,
            boxShadow: 'none',
            borderBottom: `1px solid ${base.palette.divider}`,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 500 },
        },
      },
    },
  });
}
