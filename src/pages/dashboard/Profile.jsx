import { useState } from 'react';
import { User, Mail, Lock, Save, Eye, EyeOff, BookOpen, Trophy, Award } from 'lucide-react';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../store/useAuthStore';
import axiosInstance from '../../api/axiosInstance';
import { ProfileSkeleton } from '../../components/Shimmer';

const inputCls = 'w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all bg-[var(--color-elevated)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:ring-2 focus:ring-[var(--color-accent-ring)] focus:border-[var(--color-accent)] disabled:opacity-50 disabled:cursor-not-allowed';

const Profile = () => {
  const { user, setUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [showPwd,   setShowPwd]   = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', password: '' });

  // const { data: enrollments, isLoading } = useQuery({
  //   queryKey: ['my-enrollments'],
  //   queryFn: async () => (await axiosInstance.get('/payment/my-enrollments')).data.data,
  // });

  const { data: enrollments, isLoading } = useQuery({
  queryKey: ['my-enrollments'],
  queryFn: async () => {
    const res = await axiosInstance.get('/payment/my-enrollments');
    return res.data?.data || [];
  },
  retry: 1,
});
  const enrolled  = enrollments?.length || 0;
  const completed = enrollments?.filter((e) => e.status === 'Completed').length || 0;

  const { mutate: update, isPending } = useMutation({
    mutationFn: async (data) => {
      const payload = { name: data.name };
      if (data.password.trim()) payload.password = data.password;
      return (await axiosInstance.put('/auth/update-profile', payload)).data;
    },
    onSuccess: (data) => {
      setUser(data.user);
      toast.success('Profile updated!');
      setIsEditing(false);
      setForm((p) => ({ ...p, password: '' }));
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Update failed.'),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.warning('Name cannot be empty.'); return; }
    if (form.password && form.password.length < 6) { toast.warning('Password must be at least 6 characters.'); return; }
    update(form);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setForm({ name: user?.name || '', email: user?.email || '', password: '' });
  };

  if (isLoading) return <ProfileSkeleton />;

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-5">

      {/* ── Hero Card ── */}
      <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden">
        {/* Cover */}
        <div className="h-24 sm:h-28 relative overflow-hidden bg-[var(--color-elevated)]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,var(--color-accent-light)_0%,transparent_60%),radial-gradient(ellipse_at_80%_50%,var(--color-accent-light)_0%,transparent_60%)]" />
          <div className="absolute inset-0 opacity-30"
            style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, var(--color-border) 20px, var(--color-border) 21px)' }}
          />
        </div>

        <div className="px-5 sm:px-7 pb-6 z-20 relative">
          {/* Avatar + actions */}
          <div className="flex flex-wrap items-end justify-between gap-4 -mt-8 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-accent)] flex items-center justify-center text-white text-2xl font-extrabold border-4 border-[var(--color-surface)] shadow-[var(--shadow-md)] shrink-0">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 rounded-xl text-sm font-semibold text-[var(--color-text-secondary)] bg-[var(--color-elevated)] hover:bg-[var(--color-subtle)] transition-colors border-none cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isPending}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-[var(--shadow-sm)] border-none cursor-pointer"
                  >
                    {isPending
                      ? <><span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Saving...</>
                      : <><Save size={14} /> Save</>
                    }
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-[var(--color-text-primary)] bg-[var(--color-elevated)] border border-[var(--color-border)] hover:bg-[var(--color-subtle)] transition-colors cursor-pointer"
                >
                  <User size={14} /> Edit Profile
                </button>
              )}
            </div>
          </div>

          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">{user?.name || 'Student'}</h2>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">{user?.email}</p>
          <span className="inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[var(--color-accent-light)] text-[var(--color-accent)]">
            {user?.role === 'admin' ? 'Administrator' : 'Student'}
          </span>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { icon: BookOpen, label: 'Enrolled',     value: enrolled,  iconCls: 'text-[var(--color-accent)]',   bgCls: 'bg-[var(--color-accent-light)]' },
          { icon: Trophy,   label: 'Completed',    value: completed, iconCls: 'text-[var(--color-success)]',  bgCls: 'bg-[var(--color-success-bg)]' },
          { icon: Award,    label: 'Certificates', value: completed, iconCls: 'text-[var(--color-accent)]',   bgCls: 'bg-[var(--color-accent-light)]' },
        ].map(({ icon: Icon, label, value, iconCls, bgCls }) => (
          <div key={label} className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-4 sm:p-5 flex flex-col items-center text-center gap-2">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bgCls}`}>
              <Icon size={18} className={iconCls} />
            </div>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] leading-none">{value}</p>
            <p className="text-[10px] font-semibold tracking-widest uppercase text-[var(--color-text-muted)]">{label}</p>
          </div>
        ))}
      </div>

      {/* ── Info / Edit Form ── */}
      <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-5 sm:p-7">
        <h3 className="font-serif text-base font-bold text-[var(--color-text-primary)] mb-5">
          {isEditing ? 'Edit Information' : 'Account Information'}
        </h3>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-semibold tracking-[0.12em] uppercase text-[var(--color-text-muted)]">Full Name</label>
              <div className="relative">
                <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none" />
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} required />
              </div>
            </div>
            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-semibold tracking-[0.12em] uppercase text-[var(--color-text-muted)]">Email Address</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none" />
                <input type="email" value={form.email} disabled className={inputCls} />
              </div>
              <p className="text-[11px] text-[var(--color-text-muted)]">Email cannot be changed</p>
            </div>
            {/* Password */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-[10px] font-semibold tracking-[0.12em] uppercase text-[var(--color-text-muted)]">
                New Password <span className="normal-case font-normal tracking-normal">(optional)</span>
              </label>
              <div className="relative">
                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none" />
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Leave blank to keep current"
                  className={`${inputCls} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors bg-transparent border-none cursor-pointer"
                >
                  {showPwd ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: 'Full Name',     value: user?.name || '—',    icon: User  },
              { label: 'Email Address', value: user?.email || '—',   icon: Mail  },
              { label: 'Password',      value: '••••••••••',          icon: Lock  },
              { label: 'Account Type',  value: user?.role === 'admin' ? 'Administrator' : 'Student', icon: Award },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="px-4 py-3 rounded-xl bg-[var(--color-elevated)] border border-[var(--color-border)]">
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon size={11} className="text-[var(--color-text-muted)] shrink-0" />
                  <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[var(--color-text-muted)]">{label}</p>
                </div>
                <p className="text-sm font-semibold text-[var(--color-text-primary)] truncate">{value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;