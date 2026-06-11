import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import LeftRail from './LeftRail'
import RightRail from './RightRail'
import logo from '../../../assets/logo.svg'

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/project', label: 'Project' },
  { to: '/wet-lab', label: 'Wet Lab' },
  { to: '/dry-lab', label: 'Dry Lab' },
  { to: '/engagement', label: 'Engagement' },
  { to: '/team', label: 'Team' },
]

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
  const railRef = useRef<HTMLElement | null>(null)
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
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

  const updateCapsulePosition = useCallback(() => {
    const rail = railRef.current
    if (!rail) {
      return
    }

    const activeItem = navItems.find((item) => isItemActive(location.pathname, item.to, item.end))
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

  const leftRailWidth = Math.max(0, capsule.x - railGap / 2)
  const rightRailStart = capsule.x + capsule.width + railGap / 2
  const rightRailWidth = Math.max(0, railWidth - rightRailStart)

  useLayoutEffect(() => {
    updateCapsulePosition()
    const frameId = requestAnimationFrame(updateCapsulePosition)
    return () => cancelAnimationFrame(frameId)
  }, [updateCapsulePosition])

  useEffect(() => {
    let frameId = 0
    const handleResize = () => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(updateCapsulePosition)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [updateCapsulePosition])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const fonts = document.fonts
    if (!fonts) {
      return
    }

    let isMounted = true
    const remeasure = () => {
      if (isMounted) {
        requestAnimationFrame(updateCapsulePosition)
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
  }, [updateCapsulePosition])

  return (
    <header className="relative flex w-full justify-center bg-transparent">
      <div className="fixed z-50 w-full px-4 py-3 sm:px-6 lg:hidden">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          <span
            className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm text-[#1f355d]"
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
                {navItems.map((item, index) => (
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

      <div className="fixed z-50 hidden bg-transparent lg:block">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-x-8 gap-y-3 px-4 py-3 sm:px-6">
          <span
            className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm text-[#1f355d]"
            style={{ boxShadow: logoShellShadow }}
          >
            <img src={logo} alt="iGEM UB logo" className="mr-2 h-7 w-auto" />
          </span>
          <div className="relative inline-flex shrink-0 overflow-visible text-sm">
            <div className="pointer-events-none absolute inset-0 z-0">
              {capsule.isVisible ? (
                <>
                  {leftRailWidth > 0 ? (
                    <LeftRail
                      width={leftRailWidth}
                      height={railHeight}
                      className="absolute bottom-0 left-0"
                      style={{ filter: railDropShadow }}
                    />
                  ) : null}
                  {rightRailWidth > 0 ? (
                    <RightRail
                      width={rightRailWidth}
                      height={railHeight}
                      className="absolute bottom-0"
                      style={{ left: rightRailStart, filter: railDropShadow }}
                    />
                  ) : null}
                </>
              ) : (
                <div
                  className="absolute inset-x-0 bottom-0 h-11 rounded-full bg-white"
                  style={{ boxShadow: logoShellShadow }}
                />
              )}
            </div>

            {capsule.isVisible ? (
              <motion.div
                initial={false}
                animate={{ x: capsule.x, width: capsule.width }}
                transition={capsuleTransition}
                className="pointer-events-none absolute left-0 z-10 h-11 rounded-full bg-gradient-to-r from-[#406EB5] to-[#2C4B7C] shadow-[0_12px_26px_rgba(38,74,138,0.34),inset_0_1px_2px_rgba(255,255,255,0.2)]"
              />
            ) : null}

            <nav ref={railRef} className="relative z-20 flex w-fit items-center gap-1 p-0.5">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  ref={(element) => {
                    itemRefs.current[item.to] = element
                  }}
                  className={({ isActive }) =>
                    [
                      'relative rounded-full px-6 py-2.5 font-bold tracking-[0.06em] transition-colors duration-200',
                      isActive ? '!text-white' : 'text-[#203458] hover:text-[#172b4b]',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
