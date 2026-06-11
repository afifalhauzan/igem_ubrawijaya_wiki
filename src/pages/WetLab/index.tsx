import Card from '../../components/ui/Card/Card'
import SectionPageShell from '../../components/layout/SectionPageShell/SectionPageShell'

function WetLabPage() {
  return (
    <SectionPageShell
      eyebrow="Laboratory"
      title="Wet Lab"
      description="Experimental workflows, validation work, and lab-facing documentation will live here."
    >
      <Card className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#406EB5]">Section placeholder</p>
        <p className="mt-2 text-[#203458]">
          This page is ready for wet-lab content and can later branch into focused subpages if needed.
        </p>
      </Card>
    </SectionPageShell>
  )
}

export default WetLabPage
