export const HeroSkeleton = () => (
  <section className="relative min-h-[620px] w-full overflow-hidden bg-slate-900 sm:min-h-[660px] md:min-h-[860px] lg:min-h-[900px]">
    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-[#141414]" />
    <div className="absolute inset-0 animate-pulse bg-slate-800/40" />
    <div className="relative z-10 mx-auto flex h-full w-full max-w-[2560px] flex-col justify-start gap-6 px-6 pb-20 pt-[110px] sm:px-10 sm:pt-[140px] md:px-12 md:pb-24 lg:pb-28 lg:pt-[180px] xl:px-[90px]">
      <div className="flex h-10 w-48 items-center gap-4">
        <div className="h-10 w-10 rounded bg-slate-700" />
        <div className="h-4 w-24 rounded bg-slate-700" />
      </div>
      <div className="h-16 w-3/4 max-w-3xl rounded bg-slate-700 sm:h-20" />
      <div className="h-24 w-full max-w-2xl rounded bg-slate-700" />
      <div className="hidden gap-4 md:flex">
        <div className="h-[60px] w-40 rounded-md bg-slate-700 md:h-[70px]" />
        <div className="h-[60px] w-48 rounded-md bg-slate-700 md:h-[70px]" />
      </div>
    </div>
  </section>
);
