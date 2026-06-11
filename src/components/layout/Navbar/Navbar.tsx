import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import LeftRail from './LeftRail'
import RightRail from './RightRail'
import logo from '../../../assets/logo.svg'
import { ChevronDown } from 'lucide-react'

type NavChild = {
  to: string
  label: string
}

type NavSection = {
  to: string
  label: string
  end?: boolean
  children?: NavChild[]
  panelWidth?: number
}

const navSections: NavSection[] = [
  { to: '/', label: 'Home', end: true },
  {
    to: '/project',
    label: 'Project',
    children: [
      { to: '/project/description', label: 'Description' },
      { to: '/project/engineering', label: 'Engineering' },
      { to: '/project/results', label: 'Results' },
      { to: '/project/contribution', label: 'Contribution' },
    ],
    panelWidth: 320,
  },
  {
    to: '/wet-lab',
    label: 'Wet Lab',
    children: [
      { to: '/wet-lab/experiments', label: 'Experiments' },
      { to: '/wet-lab/notebook', label: 'Notebook' },
      { to: '/wet-lab/measurement', label: 'Measurement' },
      { to: '/wet-lab/alternative-platform', label: 'Alternative Platform' },
      { to: '/wet-lab/safety-security', label: 'Safety and Security' },
    ],
    panelWidth: 336,
  },
  {
    to: '/dry-lab',
    label: 'Dry Lab',
    children: [
      { to: '/dry-lab/model', label: 'Model' },
      { to: '/dry-lab/software', label: 'Software' },
      { to: '/dry-lab/hardware', label: 'Hardware' },
    ],
    panelWidth: 220,
  },
  {
    to: '/engagement',
    label: 'Engagement',
    children: [
      { to: '/engagement/entrepreneurship', label: 'Entrepreneurship' },
      { to: '/engagement/human-practices', label: 'Human Practices' },
      { to: '/engagement/education', label: 'Education' },
      { to: '/engagement/inclusivity', label: 'Inclusivity' },
      { to: '/engagement/sustainability', label: 'Sustainability' },
    ],
    panelWidth: 320,
  },
  { to: '/team', label: 'Team' },
]

const topLevelNavItems = navSections.map(({ to, label, end }) => ({ to, label, end }))

type CapsulePosition = {
  x: number
  width: number
  isVisible: boolean
}

const capsuleTransition = {
  type: 'spring',
  stiffness: 450,
  damping: 35,
} as const

function isItemActive(pathname: string, to: string, end?: boolean) {
  if (end) {
    return pathname === to
  }

  return pathname === to || pathname.startsWith(`${to}/`)
}

function Navbar() {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openSection, setOpenSection] = useState<string | null>(null)
  const [dropdownLeft, setDropdownLeft] = useState(0)
  const [dropdownWidth, setDropdownWidth] = useState(0)
  const railRef = useRef<HTMLElement | null>(null)
  const desktopNavRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const sectionRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const logoShellShadow =
    '0 6px 14px rgba(15, 23, 42, 0.18), 0 1px 2px rgba(15, 23, 42, 0.12), inset 1px 1px 5px rgba(0, 0, 0, 0.08)'
  const railHeight = 44
  const railDropShadow = 'drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.18))'
  const railGap = 14
  const [capsule, setCapsule] = useState<CapsulePosition>({
    x: 0,
    width: 0,
    isVisible: false,
  })
  const [railWidth, setRailWidth] = useState(0)

  const activeDropdownSection = navSections.find((section) => section.to === openSection)
  const dropdownSection = activeDropdownSection?.children?.length ? activeDropdownSection : null

  const updateCapsulePosition = useCallback(() => {
    const rail = railRef.current
    if (!rail) {
      return
    }

    const activeItem = navSections.find((item) => isItemActive(location.pathname, item.to, item.end))
    if (!activeItem) {
      setCapsule((prev) => ({ ...prev, isVisible: false }))
      return
    }

    const activeItemElement = itemRefs.current[activeItem.to]
    if (!activeItemElement) {
      return
    }

    const railRect = rail.getBoundingClientRect()
    const activeItemRect = activeItemElement.getBoundingClientRect()
    setRailWidth(railRect.width)

    setCapsule({
      x: activeItemRect.left - railRect.left,
      width: activeItemRect.width,
      isVisible: true,
    })
  }, [location.pathname])

  const updateDropdownPosition = useCallback(() => {
    if (!dropdownSection) {
      return
    }

    const container = desktopNavRef.current
    const target = sectionRefs.current[dropdownSection.to]
    if (!container || !target) {
      return
    }

    const containerRect = container.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()
    const width = dropdownSection.panelWidth ?? 300
    const desiredLeft = targetRect.left - containerRect.left
    const maxLeft = Math.max(0, containerRect.width - width - 8)

    setDropdownWidth(width)
    setDropdownLeft(Math.min(Math.max(0, desiredLeft), maxLeft))
  }, [dropdownSection])

  const leftRailWidth = Math.max(0, capsule.x - railGap / 2)
  const rightRailStart = capsule.x + capsule.width + railGap / 2
  const rightRailWidth = Math.max(0, railWidth - rightRailStart)

  useLayoutEffect(() => {
    updateCapsulePosition()
    const frameId = requestAnimationFrame(updateCapsulePosition)
    return () => cancelAnimationFrame(frameId)
  }, [updateCapsulePosition])

  useLayoutEffect(() => {
    updateDropdownPosition()
    const frameId = requestAnimationFrame(updateDropdownPosition)
    return () => cancelAnimationFrame(frameId)
  }, [updateDropdownPosition])

  useEffect(() => {
    let frameId = 0
    const handleResize = () => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(() => {
        updateCapsulePosition()
        updateDropdownPosition()
      })
    }

    window.addEventListener('resize', handleResize)
    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [updateCapsulePosition, updateDropdownPosition])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setOpenSection(null)
  }, [location.pathname])

  useEffect(() => {
    const fonts = document.fonts
    if (!fonts) {
      return
    }

    let isMounted = true
    const remeasure = () => {
      if (isMounted) {
        requestAnimationFrame(() => {
          updateCapsulePosition()
          updateDropdownPosition()
        })
      }
    }

    fonts.ready.then(remeasure).catch(() => {
      /* no-op */
    })

    fonts.addEventListener('loadingdone', remeasure)
    return () => {
      isMounted = false
      fonts.removeEventListener('loadingdone', remeasure)
    }
  }, [updateCapsulePosition, updateDropdownPosition])

  return (
    <header className="relative flex w-full justify-center bg-transparent">
      <div className="fixed z-50 w-full px-4 py-3 sm:px-6 lg:hidden">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          <span
            className="inline-flex items-center rounded-full bg-white px-4 text-sm text-[#1f355d]"
            style={{ boxShadow: logoShellShadow }}
          >
            <img src={logo} alt="iGEM UB logo" className="h-7 w-auto" />
          </span>

          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={isMobileMenuOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#203458] hover:bg-slate-50"
            style={{ boxShadow: logoShellShadow }}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <span className="flex flex-col gap-1.5">
              <span className="h-0.5 w-5 rounded-full bg-current" />
              <span className="h-0.5 w-5 rounded-full bg-current" />
              <span className="h-0.5 w-5 rounded-full bg-current" />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              className="fixed inset-0 z-50 bg-slate-900/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.aside
              className="fixed right-0 top-0 z-50 h-dvh w-80 max-w-[85vw] bg-white p-5 lg:hidden"
              style={{ boxShadow: '0 12px 28px rgba(15, 23, 42, 0.22)' }}
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 360, damping: 34 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <img src={logo} alt="iGEM UB logo" className="h-9 w-auto" />
                <button
                  type="button"
                  aria-label="Close navigation menu"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#203458] hover:bg-slate-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-4xl leading-none">×</span>
                </button>
              </div>

              <nav className="flex flex-col gap-2">
                {topLevelNavItems.map((item, index) => (
                  <motion.div
                    key={`mobile-${item.to}`}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                  >
                    <NavLink
                      to={item.to}
                      end={item.end}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        [
                          'block rounded-xl px-4 py-3 font-semibold transition-colors duration-200',
                          isActive
                            ? 'bg-gradient-to-r from-[#406EB5] to-[#2C4B7C] !text-white'
                            : 'text-[#203458] hover:bg-slate-100',
                        ].join(' ')
                      }
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>

      {/* 1. Perbaikan posisi horizontal: Tambahkan inset-x-0, lg:flex, lg:justify-center, dan top-4 (opsional untuk jarak) */}
      <div className="fixed inset-x-0 top-4 z-50 hidden bg-transparent lg:flex lg:justify-center">
        {/* 2. Perbaikan posisi horizontal: max-w-7xl dan justify-center memastikan konten berada di tengah */}
        <div className="flex w-full max-w-7xl items-center justify-center gap-8 px-4 py-2 sm:px-6">
          <span
            className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm text-[#1f355d]"
            style={{ boxShadow: logoShellShadow }}
          >
            <img src={logo} alt="iGEM UB logo" className="mr-2 h-7 w-auto" />
          </span>

          <div
            ref={desktopNavRef}
            className="relative inline-flex shrink-0 overflow-visible text-sm"
            onMouseLeave={() => setOpenSection(null)}
          >
            <div className="pointer-events-none absolute left-0 inset-y-0 z-10 flex items-center">
              {capsule.isVisible ? (
                <>
                  {leftRailWidth > 0 ? (
                    <LeftRail
                      width={leftRailWidth}
                      height={railHeight}
                      className="absolute left-0 top-1/2 -translate-y-1/2"
                      style={{ filter: railDropShadow }}
                    />
                  ) : null}
                  {rightRailWidth > 0 ? (
                    <RightRail
                      width={rightRailWidth}
                      height={railHeight}
                      className="absolute top-1/2 -translate-y-1/2"
                      style={{ left: rightRailStart, filter: railDropShadow }}
                    />
                  ) : null}
                </>
              ) : (
                <div
                  className="absolute inset-0 rounded-full bg-white"
                  style={{ filter: logoShellShadow }}
                />
              )}
            </div>

            {capsule.isVisible ? (
              <motion.div
                initial={false}
                animate={{ x: capsule.x, width: capsule.width }}
                transition={capsuleTransition}
                className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-gradient-to-r from-[#406EB5] to-[#2C4B7C] shadow-[0_12px_26px_rgba(38,74,138,0.34),inset_0_1px_2px_rgba(255,255,255,0.2)]"
                style={{ height: railHeight }}
              />
            ) : null}

            <nav ref={railRef} className="relative z-20 flex w-fit items-center gap-1 p-0.5">
              {navSections.map((section) => {
                const isActive = isItemActive(location.pathname, section.to, section.end)
                const isOpen = openSection === section.to
                const hasChildren = Boolean(section.children?.length)

                return (
                  <div key={section.to} className="relative">
                    <NavLink
                      ref={(element) => {
                        itemRefs.current[section.to] = element
                        sectionRefs.current[section.to] = element
                      }}
                      to={section.to}
                      end={section.end}
                      onMouseEnter={() => {
                        if (hasChildren) {
                          setOpenSection(section.to)
                        }
                      }}
                      onFocus={() => {
                        if (hasChildren) {
                          setOpenSection(section.to)
                        }
                      }}
                      className={[
                        'flex items-center gap-2 rounded-full px-7 py-2.5 font-bold tracking-[0.06em] transition-colors duration-200',
                        isActive
                          ? '!text-white'
                          : 'text-[#203458] hover:text-[#406EB5]',
                      ].join(' ')}
                    >
                      {section.label}
                      {hasChildren ? (
                        <span
                          className={[
                            'text-[10px] transition-transform duration-200',
                            isActive || isOpen ? '-rotate-180' : 'rotate-0',
                          ].join(' ')}
                        >
                          <ChevronDown />
                        </span>
                      ) : null}
                    </NavLink>
                  </div>
                )
              })}
            </nav>

            <AnimatePresence>
              {dropdownSection ? (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-[calc(100%+0.65rem)] z-50 overflow-hidden rounded-[24px] border border-[#d7e5ef] bg-white shadow-[0_12px_28px_rgba(15,23,42,0.12)]"
                  style={{
                    left: dropdownLeft,
                    width: dropdownWidth,
                  }}
                >
                  <div className="max-h-[22rem] overflow-y-auto p-3">
                    <div className="flex flex-col gap-1">
                      {dropdownSection.children?.map((child) => {
                        const childIsActive = location.pathname === child.to

                        return (
                          <NavLink
                            key={child.to}
                            to={child.to}
                            onClick={() => setOpenSection(null)}
                            onMouseEnter={() => setOpenSection(dropdownSection.to)}
                            className={({ isActive }) =>
                              [
                                'rounded-2xl px-4 py-3 text-left text-base transition-colors duration-200',
                                isActive || childIsActive
                                  ? 'bg-[#eafaf2] text-[#0a7d5a]'
                                  : 'text-[#203458] hover:bg-[#f7fbfd] hover:text-[#0a7d5a]',
                              ].join(' ')
                            }
                          >
                            {child.label}
                          </NavLink>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
