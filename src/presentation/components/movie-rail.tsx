'use client';

import { useMemo, useRef, type SVGProps } from 'react';

import type { MovieSummary } from '@domain/entities/movie';
import { MovieCard } from '@presentation/components/movie-card';
import { useIsDarkTheme } from '@presentation/hooks/use-is-dark-theme';

export type MovieRailProps = {
  title: string;
  movies: MovieSummary[];
};

const ChevronLeftIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 6l-6 6 6 6" />
  </svg>
);

const ChevronRightIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

export const MovieRail = ({ title, movies }: MovieRailProps) => {
  const railRef = useRef<HTMLDivElement | null>(null);
  const isDark = useIsDarkTheme();

  const { snapWidth, maskGradient } = useMemo(() => {
    const maskColor = isDark ? 'rgba(0,0,0,1)' : null;
    if (typeof window === 'undefined') {
      return {
        snapWidth: 320,
        maskGradient: maskColor
          ? `linear-gradient(to right, transparent 0px, ${maskColor} 48px, ${maskColor} calc(100% - 160px), transparent 100%)`
          : undefined,
      };
    }

    const width = window.innerWidth;

    if (width < 640) {
      return { snapWidth: 190, maskGradient: undefined };
    }

    if (width < 768) {
      return { snapWidth: 220, maskGradient: undefined };
    }

    if (width < 1024) {
      return {
        snapWidth: 320,
        maskGradient: maskColor
          ? `linear-gradient(to right, transparent 0px, ${maskColor} 48px, ${maskColor} calc(100% - 160px), transparent 100%)`
          : undefined,
      };
    }

    return {
      snapWidth: 389,
      maskGradient: maskColor
        ? `linear-gradient(to right, transparent 0px, ${maskColor} 48px, ${maskColor} calc(100% - 160px), transparent 100%)`
        : undefined,
    };
  }, [isDark]);

  const scrollBy = (direction: 'prev' | 'next') => {
    const container = railRef.current;
    if (!container) return;

    const amount = snapWidth + 20;
    container.scrollBy({
      left: direction === 'next' ? amount : -amount,
      behavior: 'smooth',
    });
  };

  if (movies.length === 0) return null;

  const canScroll = movies.length > 1;

  const titleClass = isDark
    ? 'text-[32px] font-bold leading-[42px] tracking-wide text-[#E5E5E5] md:text-[36px] md:leading-[46px]'
    : 'text-[32px] font-bold leading-[42px] tracking-wide text-slate-900 md:text-[36px] md:leading-[46px]';

  const fadeClass = isDark
    ? 'pointer-events-none absolute inset-y-[48px] right-0 hidden w-[140px] bg-gradient-to-l from-[#0b0b0b] to-transparent md:block'
    : 'pointer-events-none absolute inset-y-[48px] right-0 hidden w-[140px] bg-gradient-to-l from-transparent to-transparent md:block';

  const prevButtonClass = isDark
    ? 'group mr-2 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black'
    : 'group mr-2 flex h-12 w-12 items-center justify-center rounded-full bg-slate-200/80 text-slate-900 transition hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400';

  const nextButtonClass = isDark
    ? 'group ml-2 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black'
    : 'group ml-2 flex h-12 w-12 items-center justify-center rounded-full bg-slate-200/80 text-slate-900 transition hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400';

  return (
    <section className="relative space-y-5">
      <header>
        <h2 className={`${titleClass} transition-colors duration-300`}>
          {title}
        </h2>
      </header>
      <div
        ref={railRef}
        className="flex gap-3 overflow-x-auto pb-6 pr-4 sm:gap-4 sm:pr-6 md:pr-0 md:snap-x md:snap-mandatory"
        style={maskGradient ? { WebkitMaskImage: maskGradient, maskImage: maskGradient } : undefined}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {canScroll ? (
        <>
          <div className={`${fadeClass} transition-colors duration-300`} />
          <div className="absolute inset-y-[48px] left-0 z-30 hidden items-center md:flex">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => scrollBy('prev')}
              className={prevButtonClass}
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="absolute inset-y-[48px] right-0 z-30 hidden items-center md:flex">
            <button
              type="button"
              aria-label="Next"
              onClick={() => scrollBy('next')}
              className={nextButtonClass}
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
        </>
      ) : null}
    </section>
  );
};
