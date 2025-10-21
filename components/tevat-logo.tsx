export function TevatLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="/public/logo.svg">
        <circle cx="10" cy="22" r="3" fill="currentColor" opacity="0.9" />
        <circle cx="16" cy="22" r="3" fill="currentColor" opacity="0.7" />
        <circle cx="22" cy="22" r="3" fill="currentColor" opacity="0.5" />
        <path
          d="M4 4L8 16L16 8L24 16L28 4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-2xl font-serif font-bold tracking-tight">Tevat</span>
    </div>
  )
}
