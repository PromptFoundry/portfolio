export default function StatusBadge({ children, color = '#f59e0b', className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-semibold tracking-widest uppercase border rounded-full backdrop-blur-sm ${className}`}
      style={{ color, borderColor: `${color}66`, backgroundColor: `${color}1a` }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
      {children}
    </span>
  )
}
