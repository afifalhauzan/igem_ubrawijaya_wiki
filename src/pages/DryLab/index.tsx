import Card from '../../components/ui/Card/Card'

function DryLabIndexPage() {
  return (
    <Card className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#406EB5]">Overview</p>
      <p className="mt-2 text-[#203458]">
        This is the default dry-lab landing page. Future child routes can plug in here under the same layout.
      </p>
    </Card>
  )
}

export default DryLabIndexPage
