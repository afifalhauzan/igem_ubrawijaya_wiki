function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[34px] bg-[#e5e5e8] px-6 py-12 text-center sm:px-10 sm:py-16">
      <div className="pointer-events-none absolute -left-10 -top-10 h-24 w-24 rounded-full border-[10px] border-[#8cc66c] bg-white/70" />
      <div className="pointer-events-none absolute right-8 top-8 h-16 w-16 rounded-full border-[8px] border-[#8cc66c] bg-white/70" />
      <div className="pointer-events-none absolute bottom-10 right-0 h-20 w-20 rounded-full border-[8px] border-[#8cc66c] bg-white/70" />

      <div className="relative z-10 mx-auto max-w-4xl space-y-8">
        <div className="flex flex-wrap items-center justify-center gap-4 text-[#2f5eaf]">
          <span className="text-5xl font-extrabold leading-none tracking-wide sm:text-7xl">MEET</span>
          <img
            src="/images/team-mascot-placeholder.svg"
            alt="Team mascot placeholder"
            className="h-24 w-24 sm:h-28 sm:w-28"
          />
          <span className="text-5xl font-extrabold leading-none tracking-wide sm:text-7xl">OUR TEAM</span>
        </div>

        <button
          type="button"
          className="rounded-full border-4 border-[#8cc66c] bg-[#3d67af] px-8 py-2 text-sm font-bold text-white shadow-[inset_0_0_0_3px_#ffffff]"
        >
          Let&apos;s Go!
        </button>
      </div>
    </section>
  )
}

export default Hero
