'use client'

import { useModal } from './ModalContext'

type Props = {
  children: React.ReactNode
  size?: 'lg' | 'md'
  className?: string
}

export default function ApplyButton({ children, size = 'lg', className = '' }: Props) {
  const { open } = useModal()
  const sizeClasses = size === 'lg' ? 'px-8 py-5 text-base md:text-lg' : 'px-6 py-4 text-sm md:text-base'
  return (
    <button
      type="button"
      onClick={open}
      className={`inline-flex items-center justify-center bg-brand text-ink font-semibold tracking-tight ${sizeClasses} hover:bg-ink hover:text-brand transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${className}`}
    >
      {children}
    </button>
  )
}
