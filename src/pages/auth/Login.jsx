import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, GraduationCap } from "lucide-react";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";
import { useAuthStore } from "../../store/useAuthStore";

const Login = () => {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuthStore();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.warning("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/auth/login", form);

      console.log("API Response:", data);
console.log("Token:", data.token);
      setToken(data.token);
      setUser(data.user); 

      console.log("Store token after set:", useAuthStore.getState().token);
console.log("Store user after set:", useAuthStore.getState().user);
      toast.success(`Welcome back, ${data.user?.name?.split(" ")[0]}!`);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const focusBorder = (e) =>
    (e.target.style.borderColor = "var(--color-accent)");
  const blurBorder = (e) =>
    (e.target.style.borderColor = "var(--color-border)");

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{ backgroundColor: "var(--color-bg-base)" }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            <GraduationCap size={24} color="white" />
          </div>
          <div className="text-center">
            <h1
              className="text-2xl font-bold"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--color-text-primary)",
              }}
            >
              Welcome back
            </h1>
            <p
              className="text-sm mt-1"
              style={{ color: "var(--color-text-muted)" }}
            >
              Sign in to your EduStream account
            </p>
          </div>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl border p-6 sm:p-8"
          style={{
            backgroundColor: "var(--color-bg-surface)",
            borderColor: "var(--color-border)",
          }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-[10px] font-semibold uppercase tracking-widest"
                style={{ color: "var(--color-text-muted)" }}
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "var(--color-text-muted)" }}
                />
                <input
                  type="email"
                  placeholder="test@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onFocus={focusBorder}
                  onBlur={blurBorder}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                  style={{
                    backgroundColor: "var(--color-bg-elevated)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text-primary)",
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  className="text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold hover:opacity-75 transition-opacity"
                  style={{ color: "var(--color-accent)" }}
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "var(--color-text-muted)" }}
                />
                <input
                  type={showPwd ? "text" : "password"}
                  placeholder="Your password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  onFocus={focusBorder}
                  onBlur={blurBorder}
                  className="w-full pl-10 pr-11 py-2.5 rounded-xl text-sm outline-none transition-all"
                  style={{
                    backgroundColor: "var(--color-bg-elevated)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text-primary)",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity flex"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--color-text-muted)",
                  }}
                >
                  {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p
            className="text-center text-sm mt-6"
            style={{ color: "var(--color-text-muted)" }}
          >
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold hover:opacity-75 transition-opacity"
              style={{ color: "var(--color-accent)" }}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
