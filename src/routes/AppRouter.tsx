import { Suspense, lazy, useEffect } from 'react'
import type { ComponentType, LazyExoticComponent } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import RouteSuspenseFallback from '../components/ui/RouteSuspenseFallback/RouteSuspenseFallback'
import MainLayout from '../layouts/MainLayout'
import SectionChildPage from '../components/layout/SectionPageShell/SectionChildPage'
import SectionRouteLayout from '../components/layout/SectionPageShell/SectionRouteLayout'

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
            <Route
              path="/project"
              element={
                <SectionRouteLayout
                  eyebrow="Core"
                  title="Project"
                  description="Project framing, goals, and overall direction live here before branching into the nested project pages."
                />
              }
            >
              <Route index element={<ProjectPage />} />
              <Route
                path="description"
                element={
                  <SectionChildPage
                    title="Description"
                    description="Define the project motivation, problem statement, and scope."
                  />
                }
              />
              <Route
                path="engineering"
                element={
                  <SectionChildPage
                    title="Engineering"
                    description="Capture design iterations, construct decisions, and implementation notes."
                  />
                }
              />
              <Route
                path="results"
                element={
                  <SectionChildPage
                    title="Results"
                    description="Summarize outcomes, data interpretation, and validation results."
                  />
                }
              />
              <Route
                path="contribution"
                element={
                  <SectionChildPage
                    title="Contribution"
                    description="Document team contributions, collaboration, and project impact."
                  />
                }
              />
            </Route>
            <Route
              path="/wet-lab"
              element={
                <SectionRouteLayout
                  eyebrow="Laboratory"
                  title="Wet Lab"
                  description="Experimental workflows, validation work, and lab-facing documentation live here."
                />
              }
            >
              <Route index element={<WetLabPage />} />
              <Route
                path="experiments"
                element={
                  <SectionChildPage
                    title="Experiments"
                    description="Protocols, experiment design, and bench validation notes."
                  />
                }
              />
              <Route
                path="notebook"
                element={
                  <SectionChildPage
                    title="Notebook"
                    description="Daily lab records, observations, and experiment tracking."
                  />
                }
              />
              <Route
                path="measurement"
                element={
                  <SectionChildPage
                    title="Measurement"
                    description="Measurement methods, analysis setup, and instrumentation notes."
                  />
                }
              />
              <Route
                path="alternative-platform"
                element={
                  <SectionChildPage
                    title="Alternative Platform"
                    description="Alternative platform exploration and comparative analysis."
                  />
                }
              />
              <Route
                path="safety-security"
                element={
                  <SectionChildPage
                    title="Safety and Security"
                    description="Safety, biosecurity, and containment practices for wet-lab work."
                  />
                }
              />
            </Route>
            <Route
              path="/dry-lab"
              element={
                <SectionRouteLayout
                  eyebrow="Computational"
                  title="Dry Lab"
                  description="This section is set up as a parent route so future dry-lab subpages can branch underneath it without changing the navbar."
                />
              }
            >
              <Route index element={<DryLabIndexPage />} />
              <Route
                path="model"
                element={
                  <SectionChildPage
                    title="Model"
                    description="Modeling assumptions, equations, and simulation results."
                  />
                }
              />
              <Route
                path="software"
                element={
                  <SectionChildPage
                    title="Software"
                    description="Code structure, computational tooling, and pipeline notes."
                  />
                }
              />
              <Route
                path="hardware"
                element={
                  <SectionChildPage
                    title="Hardware"
                    description="Device design, fabrication, and prototype notes."
                  />
                }
              />
            </Route>
            <Route
              path="/engagement"
              element={
                <SectionRouteLayout
                  eyebrow="Community"
                  title="Engagement"
                  description="Outreach, collaboration, and public-facing work are grouped here."
                />
              }
            >
              <Route index element={<EngagementPage />} />
              <Route
                path="entrepreneurship"
                element={
                  <SectionChildPage
                    title="Entrepreneurship"
                    description="Translation, sustainability, and startup-oriented thinking."
                  />
                }
              />
              <Route
                path="human-practices"
                element={
                  <SectionChildPage
                    title="Human Practices"
                    description="Stakeholder input, ethics, and social context."
                  />
                }
              />
              <Route
                path="education"
                element={
                  <SectionChildPage
                    title="Education"
                    description="Workshop materials, learning resources, and outreach content."
                  />
                }
              />
              <Route
                path="inclusivity"
                element={
                  <SectionChildPage
                    title="Inclusivity"
                    description="Accessibility, representation, and inclusive participation."
                  />
                }
              />
              <Route
                path="sustainability"
                element={
                  <SectionChildPage
                    title="Sustainability"
                    description="Long-term impact and sustainability considerations."
                  />
                }
              />
            </Route>
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
