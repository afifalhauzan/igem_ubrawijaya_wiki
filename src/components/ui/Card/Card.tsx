import type { HTMLAttributes, PropsWithChildren } from 'react'

type CardProps = HTMLAttributes<HTMLDivElement>

function Card({ children, className = '', ...props }: PropsWithChildren<CardProps>) {
  return (
    <div
      className={[
        'rounded-lg border border-[var(--color-border)] bg-white p-4',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
