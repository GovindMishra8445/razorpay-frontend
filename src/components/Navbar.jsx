import { Menu, X, Bell } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import ThemeToggle from './ThemeToggle';

const pageTitles = {
  '/dashboard'             : 'Dashboard',
  '/dashboard/courses'     : 'Courses',
  '/dashboard/enrollments' : 'My Enrollments',
  '/dashboard/profile'     : 'My Profile',
};

const Navbar = ({ isSidebarOpen, setSidebarOpen }) => {
  const { user }  = useAuthStore();
  const location  = useLocation();
  const title     = pageTitles[location.pathname] || 'Dashboard';
  const initial   = user?.name?.[0]?.toUpperCase() || 'U';

  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-40 bg-[var(--color-surface)] border-b border-[var(--color-border)] transition-colors duration-200 shrink-0">

      {/* ── Left ── */}
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-elevated)] transition-colors border-none bg-transparent cursor-pointer"
        >
          {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <h1 className="hidden sm:block font-serif text-[17px] font-bold text-[var(--color-text-primary)] tracking-tight">
          {title}
        </h1>
      </div>

      {/* ── Right ── */}
      <div className="flex items-center gap-1">
        {/* Bell */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-elevated)] transition-colors border-none bg-transparent cursor-pointer">
          <Bell size={17} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] border border-[var(--color-surface)]" />
        </button>

        {/* Theme toggle */}
        <ThemeToggle />

        {/* Divider */}
        <div className="w-px h-5 bg-[var(--color-border)] mx-1" />

        {/* Avatar */}
        <Link
          to="/dashboard/profile"
          className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white text-xs font-extrabold no-underline shrink-0 shadow-[0_2px_8px_var(--color-accent-ring)] hover:scale-105 transition-transform"
        >
          {initial}
        </Link>
      </div>
    </header>
  );
};

export default Navbar;