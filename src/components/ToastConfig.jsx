import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useThemeStore } from '../store/useThemeStore';

const ToastConfig = () => {
  const { isDarkMode } = useThemeStore();
  return (
    <ToastContainer
      position="top-right"
      autoClose={3500}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      theme={isDarkMode ? 'dark' : 'light'}
      toastClassName="!font-sans !text-[13px] !font-medium !rounded-xl !border !border-[var(--color-border)] !shadow-[var(--shadow-md)] !bg-[var(--color-surface)] !text-[var(--color-text-primary)]"
    />
  );
};

export default ToastConfig;