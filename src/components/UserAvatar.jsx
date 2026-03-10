const sizeMap = {
  sm: 'w-8 h-8 text-[11px]',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-xl',
};

const UserAvatar = ({ name = '', size = 'md', className = '' }) => (
  <div
    className={`
      rounded-full bg-[var(--color-accent)] flex items-center justify-center
      text-white font-extrabold shrink-0 select-none
      shadow-[0_2px_8px_var(--color-accent-ring)]
      ${sizeMap[size] || sizeMap.md} ${className}
    `}
  >
    {name?.[0]?.toUpperCase() || 'U'}
  </div>
);

export default UserAvatar;