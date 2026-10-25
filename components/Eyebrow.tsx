import Asterisk from './Asterisk'

type Props = {
  children: React.ReactNode
  asterisk?: boolean
  muted?: boolean
  size?: 'sm' | 'md'
  className?: string
}

// Wide-tracked uppercase section label, led by the brand asterisk.
export default function Eyebrow({ children, asterisk = true, muted = false, size = 'md', className = '' }: Props) {
  const text = size === 'sm' ? 'text-[10px]' : 'text-[11px]'
  const icon = size === 'sm' ? 'w-3 h-3' : 'w-[13px] h-[13px]'
  return (
    <p
      className={`flex items-center gap-2 font-display font-medium uppercase tracking-eyebrow ${text} ${
        muted ? 'text-ink-3' : 'text-ink'
      } ${className}`}
    >
      {asterisk && <Asterisk className={`${icon} shrink-0`} />}
      <span>{children}</span>
    </p>
  )
}
