import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  User,
  LogOut,
  GraduationCap,
  ChevronRight,
  X,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "react-toastify";
import ConfirmModal from "./ConfirmModal";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "My Courses", path: "/dashboard/courses", icon: BookOpen },
  { name: "Enrollments", path: "/dashboard/enrollments", icon: ClipboardList },
  { name: "Profile", path: "/dashboard/profile", icon: User },
];

const Sidebar = ({ isSidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();
  const [showLogout, setShowLogout] = useState(false);

  const handleLogoutConfirm = () => {
    logout();
    setShowLogout(false);
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const isActive = (path) =>
    path === "/dashboard"
      ? location.pathname === "/dashboard"
      : location.pathname.startsWith(path);

  return (
    <>
      {/* Logout confirmation */}
      <ConfirmModal
        isOpen={showLogout}
        onConfirm={handleLogoutConfirm}
        onCancel={() => setShowLogout(false)}
        title="Log out?"
        description="You'll need to sign in again to access your courses."
        confirmLabel="Log Out"
        cancelLabel="Cancel"
        variant="danger"
      />

      {/* Mobile overlay */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={`
          fixed inset-0 z-40 bg-black/55 backdrop-blur-sm
          transition-opacity duration-300 lg:hidden
          ${isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-60 flex flex-col
          border-r border-[var(--color-sidebar-border)]
          transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0 lg:z-auto lg:shrink-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{ backgroundColor: "var(--color-sidebar)" }}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[var(--color-sidebar-border)] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)] flex items-center justify-center shrink-0">
              <GraduationCap size={16} className="text-white" />
            </div>
            <span
              className="text-base font-bold tracking-tight"
              style={{ fontFamily: "var(--font-serif)", color: "#ede8e0" }}
            >
              EduStream
            </span>
          </div>

          {/*Mobile View only */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden w-7 h-7 flex items-center justify-center rounded-md transition-colors bg-transparent border-none cursor-pointer"
            style={{ color: "var(--color-sidebar-text)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "var(--color-sidebar-hover)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <X size={15} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-0.5">
          {menuItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`nav-link ${active ? "active" : ""}`}
              >
                <item.icon size={15} className="shrink-0" />
                <span className="flex-1">{item.name}</span>
                {active && <ChevronRight size={12} className="opacity-60" />}
              </Link>
            );
          })}
        </nav>

        {/* Log Out Bottom */}
        <div className="p-3 border-t border-[var(--color-sidebar-border)] shrink-0 flex flex-col gap-1">
          <button
            onClick={() => setShowLogout(true)}
            className="nav-link border-none cursor-pointer"
            style={{ color: "var(--color-error)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--color-error-bg)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <LogOut size={15} className="shrink-0" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
