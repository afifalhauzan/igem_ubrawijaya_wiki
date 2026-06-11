import mascotDraft1 from '../../../assets/mascot_draft_1.png'
import mascotDraft2 from '../../../assets/mascot_draft_2.png'
import './RouteSuspenseFallback.css'

function RouteSuspenseFallback() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 py-10 text-center">
      <div className="relative h-36 w-36">
        <img
          src={mascotDraft1}
          alt="Loading mascot frame one"
          className="route-suspense-fallback__mascot route-suspense-fallback__mascot--first scale-103"
        />
        <img
          src={mascotDraft2}
          alt="Loading mascot frame two"
          className="route-suspense-fallback__mascot route-suspense-fallback__mascot--second"
        />
      </div>

      <div className="flex items-center justify-center gap-1 text-sm font-semibold uppercase tracking-[0.18em] text-slate-600">
        <span>Loading</span>
        <span className="route-suspense-fallback__dot route-suspense-fallback__dot--1">.</span>
        <span className="route-suspense-fallback__dot route-suspense-fallback__dot--2">.</span>
        <span className="route-suspense-fallback__dot route-suspense-fallback__dot--3">.</span>
      </div>
    </div>
  )
}

export default RouteSuspenseFallback
