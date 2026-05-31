import { Outlet } from 'react-router-dom'
import Footer from '../components/layout/Footer/Footer'
import Navbar from '../components/layout/Navbar/Navbar'

function MainLayout() {
  return (
    <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-text-primary)]">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
