import { Outlet } from 'react-router-dom'
import SectionPageShell from '../../components/layout/SectionPageShell/SectionPageShell'

function DryLabLayout() {
  return (
    <SectionPageShell
      eyebrow="Computational"
      title="Dry Lab"
      description="This section is set up as a parent route so future dry-lab subpages can branch underneath it without changing the navbar."
    >
      <Outlet />
    </SectionPageShell>
  )
}

export default DryLabLayout
