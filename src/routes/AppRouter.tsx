import { Suspense, lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'

const HomePage = lazy(() => import('../pages/Home'))
const ProjectPage = lazy(() => import('../pages/Project'))
const DesignPage = lazy(() => import('../pages/Design'))
const ExperimentsPage = lazy(() => import('../pages/Experiments'))
const ResultsPage = lazy(() => import('../pages/Results'))
const HumanPracticesPage = lazy(() => import('../pages/HumanPractices'))
const SafetyPage = lazy(() => import('../pages/Safety'))
const TeamPage = lazy(() => import('../pages/Team'))
const NotFoundPage = lazy(() => import('../pages/NotFound'))

function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="px-6 py-10 text-sm text-slate-600">Loading page...</div>}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/project" element={<ProjectPage />} />
            <Route path="/design" element={<DesignPage />} />
            <Route path="/experiments" element={<ExperimentsPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/human-practices" element={<HumanPracticesPage />} />
            <Route path="/safety" element={<SafetyPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default AppRouter
