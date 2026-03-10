import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, GraduationCap, ArrowLeft, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import axiosInstance from '../../api/axiosInstance';

const ForgetPassword = () => {
  const [email, setEmail]   = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent]     = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) { toast.warning('Please enter your email.'); return; }
    setLoading(true);
    try {
      await axiosInstance.post('/auth/forgot-password', { email });
      setSent(true);
      toast.success('Reset link sent! Check your inbox.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8" style={{ backgroundColor: 'var(--color-bg-base)' }}>
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent)' }}>
            <GraduationCap size={24} color="white" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text-primary)' }}>
              Reset password
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>We'll send you a reset link</p>
          </div>
        </div>

        <div className="rounded-2xl border p-6 sm:p-8" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
          {sent ? (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'var(--color-success-bg)' }}>
                <CheckCircle size={28} style={{ color: 'var(--color-success)' }} />
              </div>
              <div>
                <h3 className="font-semibold mb-1" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text-primary)' }}>
                  Check your email
                </h3>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  We sent a reset link to <strong>{email}</strong>
                </p>
              </div>
              <Link to="/login" className="flex items-center gap-1.5 text-sm font-semibold hover:opacity-75 transition-opacity" style={{ color: 'var(--color-accent)' }}>
                <ArrowLeft size={14} /> Back to sign in
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--color-text-muted)' }} />
                  <input
                    type="email" placeholder="you@example.com" value={email}
                    onChange={e => setEmail(e.target.value)}
                    onFocus={e => e.target.style.borderColor = 'var(--color-accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                    style={{ backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
                  />
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ backgroundColor: 'var(--color-accent)' }}>
                {loading
                  ? <><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />Sending...</>
                  : 'Send Reset Link'}
              </button>

              <Link to="/login" className="flex items-center justify-center gap-1.5 text-sm font-semibold hover:opacity-75 transition-opacity mt-1" style={{ color: 'var(--color-text-muted)' }}>
                <ArrowLeft size={14} /> Back to sign in
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;