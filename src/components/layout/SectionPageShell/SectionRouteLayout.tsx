import { Outlet } from 'react-router-dom'
import type { ReactNode } from 'react'
import SectionPageShell from './SectionPageShell'

type SectionRouteLayoutProps = {
  eyebrow?: string
  title: string
  description?: string
  children?: ReactNode
}

function SectionRouteLayout({ eyebrow, title, description, children }: SectionRouteLayoutProps) {
  return (
    <SectionPageShell eyebrow={eyebrow} title={title} description={description}>
      {children ?? <Outlet />}
    </SectionPageShell>
  )
}

export default SectionRouteLayout
