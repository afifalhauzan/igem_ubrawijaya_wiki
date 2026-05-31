import type { HTMLAttributes, PropsWithChildren } from 'react'

type SectionProps = HTMLAttributes<HTMLElement>

function Section({ children, className = '', ...props }: PropsWithChildren<SectionProps>) {
  return (
    <section className={['py-10 sm:py-14', className].join(' ')} {...props}>
      {children}
    </section>
  )
}

export default Section
