import { Suspense, lazy, useEffect } from 'react'
import type { ComponentType, LazyExoticComponent } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import RouteSuspenseFallback from '../components/ui/RouteSuspenseFallback/RouteSuspenseFallback'
import MainLayout from '../layouts/MainLayout'

type RouteModule = {
  default: ComponentType
}

type LazyRouteComponent = LazyExoticComponent<ComponentType> & {
  preload: () => Promise<RouteModule>
}

const wait = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))

let shouldDelayInitialSuspense = true

const loadRouteModule = (importer: () => Promise<RouteModule>, delay = 2000) => {
  const modulePromise = importer()

  if (!shouldDelayInitialSuspense) {
    return modulePromise
  }

  shouldDelayInitialSuspense = false

  return Promise.all([modulePromise, wait(delay)]).then(([module]) => module)
}

const lazyRoute = (importer: () => Promise<RouteModule>) => {
  let cachedModulePromise: Promise<RouteModule> | null = null

  const load = () => {
    cachedModulePromise ??= loadRouteModule(importer)
    return cachedModulePromise
  }

  const LazyRoute = lazy(load) as LazyRouteComponent

  LazyRoute.preload = () => {
    cachedModulePromise ??= importer()
    return cachedModulePromise
  }

  return LazyRoute
}

const HomePage = lazyRoute(() => import('../pages/Home'))
const ProjectPage = lazyRoute(() => import('../pages/Project'))
const WetLabPage = lazyRoute(() => import('../pages/WetLab'))
const DryLabLayout = lazyRoute(() => import('../pages/DryLab/layout'))
const DryLabIndexPage = lazyRoute(() => import('../pages/DryLab'))
const EngagementPage = lazyRoute(() => import('../pages/Engagement'))
const DesignPage = lazyRoute(() => import('../pages/Design'))
const ExperimentsPage = lazyRoute(() => import('../pages/Experiments'))
const ResultsPage = lazyRoute(() => import('../pages/Results'))
const HumanPracticesPage = lazyRoute(() => import('../pages/HumanPractices'))
const SafetyPage = lazyRoute(() => import('../pages/Safety'))
const TeamPage = lazyRoute(() => import('../pages/Team'))
const NotFoundPage = lazyRoute(() => import('../pages/NotFound'))

const routeModules = [
  HomePage,
  ProjectPage,
  WetLabPage,
  DryLabLayout,
  DryLabIndexPage,
  EngagementPage,
  DesignPage,
  ExperimentsPage,
  ResultsPage,
  HumanPracticesPage,
  SafetyPage,
  TeamPage,
  NotFoundPage,
] as const

function RouteModulePreloader() {
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void Promise.all(routeModules.map((routeModule) => routeModule.preload())).catch(() => undefined)
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [])

  return null
}

function AppRouter() {
  return (
    <BrowserRouter>
      <RouteModulePreloader />
      <Suspense fallback={<RouteSuspenseFallback />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/project" element={<ProjectPage />} />
            <Route path="/wet-lab" element={<WetLabPage />} />
            <Route path="/dry-lab" element={<DryLabLayout />}>
              <Route index element={<DryLabIndexPage />} />
            </Route>
            <Route path="/engagement" element={<EngagementPage />} />
            <Route path="/safety" element={<SafetyPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/design" element={<DesignPage />} />
            <Route path="/experiments" element={<ExperimentsPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/human-practices" element={<HumanPracticesPage />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default AppRouter
