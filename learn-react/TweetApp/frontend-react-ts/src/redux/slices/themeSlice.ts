// Theme slice for managing light/dark mode
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  systemPreference: Theme | null; // Store system preference if using 'auto'
}

const getInitialTheme = (): Theme => {
  // Check localStorage first
  const savedTheme = localStorage.getItem("theme") as Theme | null;
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }
  
  // Fall back to system preference
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  
  return "light";
};

const initialState: ThemeState = {
  theme: getInitialTheme(),
  systemPreference: null,
};

// Apply theme to document root
const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  // Save to localStorage
  localStorage.setItem("theme", theme);
};

// Initialize theme on load
applyTheme(initialState.theme);

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      applyTheme(action.payload);
    },
    toggleTheme: (state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      state.theme = newTheme;
      applyTheme(newTheme);
    },
    setSystemPreference: (state, action: PayloadAction<Theme | null>) => {
      state.systemPreference = action.payload;
    },
  },
});

export const { setTheme, toggleTheme, setSystemPreference } = themeSlice.actions;

// Selectors
export const selectTheme = (state: { theme: ThemeState }) => state.theme.theme;
export const selectIsDarkMode = (state: { theme: ThemeState }) => state.theme.theme === "dark";

export default themeSlice.reducer;

