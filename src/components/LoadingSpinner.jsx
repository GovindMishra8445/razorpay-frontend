const LoadingSpinner = ({ text = 'Loading...', fullScreen = false }) => {
  const spinner = (
    <div className="flex flex-col items-center gap-3.5">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-[3px] border-[var(--color-border)]" />
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[var(--color-accent)] animate-spin" />
      </div>
      <p className="text-[13px] font-medium text-[var(--color-text-muted)] animate-pulse">{text}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-base)]">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-20">
      {spinner}
    </div>
  );
};

export default LoadingSpinner;