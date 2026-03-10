import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const applyTheme = (isDark) => {
  if (isDark) document.documentElement.classList.add('dark');
  else        document.documentElement.classList.remove('dark');
};

export const useThemeStore = create(
  persist(
    (set, get) => ({
      isDarkMode: false,
      toggleTheme: () => {
        const next = !get().isDarkMode;
        applyTheme(next);
        set({ isDarkMode: next });
      },
      setDarkMode: (value) => { applyTheme(value); set({ isDarkMode: value }); },
      initTheme:   ()      => { applyTheme(get().isDarkMode); },
    }),
    { name: 'theme-storage' }
  )
);