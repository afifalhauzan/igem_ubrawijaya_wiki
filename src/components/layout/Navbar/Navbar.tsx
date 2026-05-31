import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/project', label: 'Project' },
  { to: '/design', label: 'Design' },
  { to: '/experiments', label: 'Experiments' },
  { to: '/results', label: 'Results' },
  { to: '/human-practices', label: 'Human Practices' },
  { to: '/safety', label: 'Safety' },
  { to: '/team', label: 'Team' },
]

function Navbar() {
  return (
    <header className="border-b border-[var(--color-border)] bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-2 px-4 py-4 sm:px-6">
        <span className="mr-3 text-sm font-semibold tracking-wide">iGEM UB Wiki</span>
        <nav className="flex flex-wrap items-center gap-1 text-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                [
                  'rounded-md px-3 py-1.5 transition-colors',
                  isActive
                    ? 'bg-[var(--color-slate-200)] text-[var(--color-text-primary)]'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-slate-100)] hover:text-[var(--color-text-primary)]',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
