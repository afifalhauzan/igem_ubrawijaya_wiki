import { motion } from 'framer-motion'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import logo from '../../../assets/logo.svg'

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/project', label: 'Project' },
  { to: '/design', label: 'Design' },
  { to: '/experiments', label: 'Experiments' },
  { to: '/results', label: 'Result' },
  { to: '/human-practices', label: 'Human Practices' },
  { to: '/safety', label: 'Safety' },
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
  const railRef = useRef<HTMLElement | null>(null)
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const logoShellShadow = '2px 2px 5px rgba(0, 0, 0, 0.18), inset 1px 1px 5px rgba(0, 0, 0, 0.08)'
  const navShellShadow = logoShellShadow
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

    // Re-measure on the next frame in case initial layout settles after first paint.
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
    const fonts = document.fonts
    if (!fonts) {
      return
    }

    let isMounted = true

    const remeasure = () => {
      if (!isMounted) {
        return
      }

      requestAnimationFrame(updateCapsulePosition)
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
    <header className="border-b border-[var(--color-border)] bg-white/95 backdrop-blur">
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
                  <div
                    className="absolute bottom-0 left-0 h-11 rounded-full bg-white"
                    style={{ width: leftRailWidth, boxShadow: navShellShadow }}
                  >
                    {/* <div className="pointer-events-none absolute right-[-12px] top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-[var(--color-surface)]" /> */}
                  </div>
                ) : null}
                {rightRailWidth > 0 ? (
                  <div
                    className="absolute bottom-0 h-11 rounded-full bg-white"
                    style={{ left: rightRailStart, width: rightRailWidth, boxShadow: navShellShadow }}
                  >
                    {/* <div className="pointer-events-none absolute left-[-12px] top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-[var(--color-surface)]" /> */}
                  </div>
                ) : null}
              </>
            ) : (
              <div
                className="absolute inset-x-0 bottom-0 h-11 rounded-full bg-white"
                style={{ boxShadow: navShellShadow }}
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
    </header>
  )
}

export default Navbar
