import ScrollStack, { ScrollStackItem } from './ScrollStack'

const departmentCards = [
  {
    title: 'Creative Media',
    description:
      'Responsible for developing visual content and maintaining the event branding identity for publicity and engagement.',
    backgroundClass: 'bg-gradient-to-br from-[#78ba84] to-[#4da95a]',
  },
  {
    title: 'Wet Lab',
    description:
      'Focuses on laboratory experimentation, protocol validation, and biological data collection for the project workflow.',
    backgroundClass: 'bg-gradient-to-br from-[#76aee8] to-[#356db5]',
  },
  {
    title: 'Dry Lab',
    description:
      'Handles computational modeling, simulation, and data analysis to support experiment design and technical decisions.',
    backgroundClass: 'bg-gradient-to-br from-[#8f88d6] to-[#5b4fb5]',
  },
  {
    title: 'Core Comitee',
    description:
      'Coordinates strategy, timeline, and cross-division collaboration to keep the full team aligned and on schedule.',
    backgroundClass: 'bg-gradient-to-br from-[#e09c66] to-[#c56f37]',
  },
]

function TeamCard() {
  return (
    <section className="relative pt-16 sm:pt-20">
      <ScrollStack
        className="relative z-10 rounded-[20px]"
        itemDistance={20}
        itemScale={0.04}
        itemStackDistance={100}
        stackPosition="10%"
        scaleEndPosition="50%"
        baseScale={0.86}
        useWindowScroll
      >
        {departmentCards.map((department) => (
          <ScrollStackItem
            key={department.title}
            itemClassName={`${department.backgroundClass} min-h-[300px] px-6 py-10 text-white sm:min-h-[500px] sm:px-10 sm:py-12`}
          >
            <div className="absolute left-5 top-4 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-white/80" />
              <span className="h-3 w-3 rounded-full bg-white/80" />
              <span className="h-3 w-3 rounded-full bg-white/80" />
            </div>

            <div className="grid gap-8 pt-5 lg:grid-cols-[1fr_1.2fr] lg:items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-extrabold leading-tight sm:text-5xl">{department.title}</h2>
                <p className="max-w-md text-sm leading-relaxed text-white/90">{department.description}</p>
                <p className="text-sm font-semibold text-white">Estimated total members: 4 per division</p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((imageIndex) => (
                  <article
                    key={`${department.title}-${imageIndex}`}
                    className="overflow-hidden rounded-2xl bg-[#f93b2f] shadow-lg ring-1 ring-[#2a4d87]/30"
                  >
                    <img
                      src="/images/team-member-placeholder.svg"
                      alt={`${department.title} member placeholder ${imageIndex}`}
                      className="h-52 w-full object-cover"
                    />
                    <div className="space-y-1 bg-[#2f5eaf] px-3 py-3">
                      <h3 className="text-xs font-semibold leading-tight text-white">Team Member</h3>
                      <p className="text-[11px] text-white/90">{department.title}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 rounded-b-[20px] bg-gradient-to-t from-[#f8fafc] to-transparent" />
    </section>
  )
}

export default TeamCard
