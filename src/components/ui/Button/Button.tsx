import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

function Button({ children, className = '', type = 'button', ...props }: PropsWithChildren<ButtonProps>) {
  return (
    <button
      type={type}
      className={[
        'inline-flex items-center justify-center rounded-md border border-[var(--color-border)] px-4 py-2 text-sm font-medium',
        'bg-white text-[var(--color-text-primary)] hover:bg-[var(--color-slate-100)] transition-colors',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
