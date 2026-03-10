import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="w-9 h-9 flex items-center justify-center rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-elevated)] hover:text-[var(--color-accent)] transition-colors border-none bg-transparent cursor-pointer"
    >
      {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
};

export default ThemeToggle;