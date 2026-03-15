const variantStyles = {
  primary: 'bg-brand text-surface hover:bg-brand-hover border border-brand',
  outline: 'bg-transparent text-foreground hover:bg-surface-alt border border-border',
  ghost: 'bg-transparent text-foreground hover:bg-surface-alt border border-transparent',
}

const sizeStyles = {
  sm: 'px-3 py-1.5 text-xs tracking-wider',
  md: 'px-5 py-2.5 text-sm tracking-wider',
  lg: 'px-7 py-3.5 text-sm tracking-widest',
}

export default function Button({ children, variant = 'primary', size = 'md', className = '', as: Tag = 'button', ...props }) {
  return (
    <Tag
      className={`inline-flex items-center justify-center gap-2 font-medium uppercase rounded-none transition-all duration-200 cursor-pointer ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
