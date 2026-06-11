import type { ReactNode } from 'react'

type SectionPageShellProps = {
  eyebrow?: string
  title: string
  description?: string
  children?: ReactNode
}

function SectionPageShell({ eyebrow, title, description, children }: SectionPageShellProps) {
  return (
    <section className="space-y-8">
      <div className="max-w-3xl space-y-3">
        {eyebrow ? <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#406EB5]">{eyebrow}</p> : null}
        <h1 className="text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-4xl">{title}</h1>
        {description ? <p className="text-base text-[#475569] sm:text-lg">{description}</p> : null}
      </div>
      {children}
    </section>
  )
}

export default SectionPageShell
