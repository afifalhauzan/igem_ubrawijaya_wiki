import Card from '../../components/ui/Card/Card'
import SectionPageShell from '../../components/layout/SectionPageShell/SectionPageShell'

function EngagementPage() {
  return (
    <SectionPageShell
      eyebrow="Community"
      title="Engagement"
      description="Outreach, collaboration, and public-facing work are grouped here."
    >
      <Card className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#406EB5]">Section placeholder</p>
        <p className="mt-2 text-[#203458]">
          This page is ready for engagement content and can later branch into subpages if the section grows.
        </p>
      </Card>
    </SectionPageShell>
  )
}

export default EngagementPage
