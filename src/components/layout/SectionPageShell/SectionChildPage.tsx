import Card from '../../ui/Card/Card'

type SectionChildPageProps = {
  title: string
  description: string
}

function SectionChildPage({ title, description }: SectionChildPageProps) {
  return (
    <Card className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#406EB5]">{title}</p>
      <p className="mt-3 text-[#203458]">{description}</p>
    </Card>
  )
}

export default SectionChildPage
