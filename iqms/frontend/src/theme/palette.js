/**
 * Design tokens for IQMS.
 *
 * The palette leans into the product's subject matter — a personal
 * "code editor for interview prep" — rather than generic SaaS blue.
 * Primary is a deep ink/slate (evokes a dark editor chrome), and the
 * accent is a warm amber ("bookmark" / "revise" affordance color) used
 * sparingly for the spaced-repetition and favorite/bookmark actions
 * that are core to the product's identity.
 */
export const brand = {
  ink900: '#12151C',
  ink700: '#1C2130',
  ink500: '#2B3245',
  slate400: '#5B6478',
  slate200: '#C7CCD6',
  paperLight: '#F7F8FA',
  paperDark: '#161A24',
  amber500: '#E8A33D',
  amber700: '#B97D1F',
  teal500: '#3FA79A',
  coral500: '#E15B5B',
};

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#7B8CDE' : brand.ink500,
      light: mode === 'dark' ? '#A6B2E8' : brand.slate400,
      dark: brand.ink900,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: brand.amber500,
      dark: brand.amber700,
      contrastText: brand.ink900,
    },
    success: { main: brand.teal500 },
    error: { main: brand.coral500 },
    background: {
      default: mode === 'dark' ? brand.ink900 : brand.paperLight,
      paper: mode === 'dark' ? brand.ink700 : '#FFFFFF',
    },
    divider: mode === 'dark' ? 'rgba(199,204,214,0.12)' : 'rgba(43,50,69,0.12)',
    text: {
      primary: mode === 'dark' ? brand.slate200 : brand.ink900,
      secondary: mode === 'dark' ? 'rgba(199,204,214,0.7)' : brand.slate400,
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif',
    h1: { fontFamily: '"Sora", "Inter", sans-serif', fontWeight: 700 },
    h2: { fontFamily: '"Sora", "Inter", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Sora", "Inter", sans-serif', fontWeight: 600 },
    h4: { fontFamily: '"Sora", "Inter", sans-serif', fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
    // Used for question ids, code snippets previews, and stat figures.
    overline: { fontFamily: '"JetBrains Mono", monospace', letterSpacing: 1.2 },
  },
  shape: { borderRadius: 10 },
});
