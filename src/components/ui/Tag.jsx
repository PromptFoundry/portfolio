export default function Tag({ children, className = '' }) {
  return (
    <span
      className={`inline-block px-2 py-0.5 text-[10px] font-medium tracking-widest uppercase border ${className}`}
      style={{ borderColor: 'var(--color-border)', color: 'var(--color-foreground-muted)' }}
    >
      {children}
    </span>
  )
}
