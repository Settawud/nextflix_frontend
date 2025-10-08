'use client';

import { useMemo, useRef, type SVGProps } from 'react';

import type { MovieSummary } from '@domain/entities/movie';
import { MovieCard } from '@presentation/components/movie-card';
import { useIsDarkTheme } from '@presentation/hooks/use-is-dark-theme';
import { cn } from '@utils/cn';

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

  return (
    <section className="relative space-y-4 sm:space-y-5">
      <header className="flex items-center justify-between">
        <div>
          <p
            className={cn(
              'text-xs font-semibold uppercase tracking-[0.45em] text-slate-500 transition-colors duration-300',
              isDark && 'text-white/50',
            )}
          >
            Featured
          </p>
          <h2
            className={cn(
              'text-2xl font-semibold tracking-tight transition-colors duration-300 sm:text-[28px] lg:text-[32px]',
              isDark ? 'text-white' : 'text-slate-900',
            )}
          >
            {title}
          </h2>
        </div>
        {canScroll ? (
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => scrollBy('prev')}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full border transition focus:outline-none focus-visible:ring-2',
                isDark
                  ? 'border-white/20 bg-white/10 text-white hover:bg-white/20 focus-visible:ring-white/30'
                  : 'border-slate-200 bg-white text-slate-900 hover:bg-slate-100 focus-visible:ring-slate-300',
              )}
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => scrollBy('next')}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full border transition focus:outline-none focus-visible:ring-2',
                isDark
                  ? 'border-white/20 bg-white/10 text-white hover:bg-white/20 focus-visible:ring-white/30'
                  : 'border-slate-200 bg-white text-slate-900 hover:bg-slate-100 focus-visible:ring-slate-300',
              )}
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        ) : null}
      </header>
      <div
        ref={railRef}
        className="flex gap-4 overflow-x-auto pb-6 pr-2 sm:pr-4 md:pr-0 md:snap-x md:snap-mandatory"
        style={maskGradient ? { WebkitMaskImage: maskGradient, maskImage: maskGradient } : undefined}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {canScroll ? (
        <>
          <div className="pointer-events-none absolute inset-y-[46px] left-0 hidden w-[120px] md:block">
            <div
              className={cn(
                'h-full w-full bg-gradient-to-r transition-opacity duration-300',
                isDark ? 'from-black/90 via-black/40 to-transparent' : 'from-white via-white/40 to-transparent',
              )}
            />
          </div>
          <div className="pointer-events-none absolute inset-y-[46px] right-0 hidden w-[120px] md:block">
            <div
              className={cn(
                'h-full w-full bg-gradient-to-l transition-opacity duration-300',
                isDark ? 'from-black/90 via-black/40 to-transparent' : 'from-white via-white/40 to-transparent',
              )}
            />
          </div>
        </>
      ) : null}
    </section>
  );
};
