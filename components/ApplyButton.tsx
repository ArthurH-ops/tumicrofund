'use client'

import { useModal } from './ModalContext'
import { APPLY_URL } from '@/lib/config'

type Props = {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

// Design-system primary button: ink fill, 1.5px outline, 8px corners; hover ink-2, press nudges 1px.
const sizes = {
  sm: 'px-3 py-[7px] text-[13px]',
  md: 'px-[18px] py-[11px] text-[15px]',
  lg: 'px-6 py-[15px] text-[17px]',
}

export default function ApplyButton({ children, size = 'lg', className = '' }: Props) {
  const { open } = useModal()
  const cls = `inline-flex items-center justify-center whitespace-nowrap rounded-md border border-ink bg-ink text-paper font-display font-medium ${sizes[size]} hover:bg-ink-2 active:translate-x-px active:translate-y-px transition-colors duration-[120ms] ease-brand focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand ${className}`

  // With an application link set in lib/config.ts, the button opens it in a new tab.
  if (APPLY_URL) {
    return (
      <a href={APPLY_URL} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" onClick={open} className={cls}>
      {children}
    </button>
  )
}
