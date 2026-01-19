"use client";

import { useIsDarkTheme } from '@presentation/hooks/use-is-dark-theme';

export const HeroSkeleton = () => {
  const isDark = useIsDarkTheme();

  const sectionClass = isDark
    ? 'relative min-h-[520px] w-full overflow-hidden bg-slate-900'
    : 'relative min-h-[520px] w-full overflow-hidden bg-slate-100';

  const overlayClass = isDark
    ? 'absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800/70 to-transparent'
    : 'absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent';

  const bottomOverlay = isDark
    ? 'absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-950'
    : 'absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent via-white/50 to-white';

  const pulseOverlay = isDark ? 'absolute inset-0 animate-pulse bg-slate-800/30' : 'absolute inset-0 animate-pulse bg-slate-300/30';
  const blockClass = isDark ? 'bg-slate-700/70' : 'bg-slate-300/80';

  return (
    <section className={`${sectionClass} sm:min-h-[660px] md:min-h-[860px] lg:min-h-[900px]`}>
      <div className={overlayClass} />
      <div className={bottomOverlay} />
      <div className={pulseOverlay} />
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[2560px] flex-col justify-start gap-6 px-6 pb-16 pt-[100px] sm:px-8 sm:pt-[130px] md:px-12 md:pb-24 lg:pb-24 lg:pt-[170px] xl:px-[90px]">
        <div className="flex h-9 w-40 items-center gap-3 sm:h-10 sm:w-48">
          <div className={`h-full w-10 rounded-full ${blockClass}`} />
          <div className={`h-3 w-24 rounded ${blockClass}`} />
        </div>
        <div className={`h-14 w-3/4 max-w-2xl rounded ${blockClass} sm:h-16 md:h-20`} />
        <div className={`h-24 w-full max-w-2xl rounded ${blockClass} sm:h-28 md:h-32`} />
        <div className="flex w-full max-w-lg gap-3 text-left text-xs uppercase tracking-[0.3em] text-transparent md:hidden">
          <div className={`h-3 w-16 rounded ${blockClass}`} />
          <div className={`h-3 w-20 rounded ${blockClass}`} />
        </div>
        <div className="hidden gap-4 md:flex">
          <div className={`h-[54px] w-44 rounded-full ${blockClass}`} />
          <div className={`h-[54px] w-48 rounded-full ${blockClass}`} />
        </div>
      </div>
    </section>
  );
};
