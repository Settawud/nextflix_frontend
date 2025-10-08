'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState, type SVGProps } from 'react';

import type { MovieDetail, MovieSummary } from '@domain/entities/movie';
import type { MovieAssets } from '@domain/entities/movie-assets';
import { useDependencies } from '@presentation/providers/dependency-provider';
import { TitleOverlay } from '@presentation/components/title-overlay';
import { useIsDarkTheme } from '@presentation/hooks/use-is-dark-theme';

const truncate = (text: string, limit: number) => {
  if (!text) return '';
  return text.length > limit ? `${text.slice(0, limit - 3)}...` : text;
};

const PlayIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M6 4.5v15l13.5-7.5L6 4.5z" />
  </svg>
);

const InformationCircleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
    <circle cx="12" cy="12" r="9" />
    <line x1="12" y1="8" x2="12" y2="8" />
    <path d="M11.5 11.5h1v5" />
  </svg>
);

export type HeroProps = {
  movie: MovieSummary & { overview?: string };
};

export const Hero = ({ movie }: HeroProps) => {
  const { repository } = useDependencies();
  const [detail, setDetail] = useState<MovieDetail | null>(null);
  const [assets, setAssets] = useState<MovieAssets | null>(null);
  const isDark = useIsDarkTheme();

  const overview = useMemo(() => {
    const source = detail?.overview ?? movie.overview ?? '';
    return truncate(source, 220);
  }, [detail?.overview, movie.overview]);

  useEffect(() => {
    let cancelled = false;

    repository
      .getMovieById(movie.id)
      .then((result) => {
        if (!cancelled) setDetail(result);
      })
      .catch(() => {
        if (!cancelled) setDetail(null);
      });

    return () => {
      cancelled = true;
    };
  }, [movie.id, repository]);

  useEffect(() => {
    let cancelled = false;
    setAssets(null);

    repository
      .getMovieAssets(movie.id)
      .then((result) => {
        if (!cancelled) {
          setAssets(result);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setAssets(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [movie.id, repository]);

  const heroBackground = useMemo(() => {
    if (assets?.textlessBackdropUrl) {
      return assets.textlessBackdropUrl;
    }
    if (assets?.backdropUrl) {
      return assets.backdropUrl;
    }
    return movie.backdropPath ?? movie.posterPath;
  }, [assets?.backdropUrl, assets?.textlessBackdropUrl, movie.backdropPath, movie.posterPath]);

  const sectionClass = isDark
    ? 'relative isolate min-h-[520px] w-full overflow-hidden bg-black text-white'
    : 'relative isolate min-h-[520px] w-full overflow-hidden bg-white text-slate-900';

  const sideOverlayClass = isDark
    ? 'absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent'
    : 'absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent';

  const bottomOverlayClass = isDark
    ? 'absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-[#141414]'
    : 'absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent via-white/25 to-white/70';

  const topOverlayClass = isDark
    ? 'absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 via-black/30 to-transparent md:h-40'
    : 'absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/95 via-white/70 to-transparent md:h-40';

  const seriesTextClass = isDark ? 'text-[#B9BBB9]' : 'text-slate-600';
  const overviewTextClass = isDark ? 'text-slate-100' : 'text-slate-700';
  const primaryButtonClass = isDark
    ? 'inline-flex h-[77px] items-center gap-5 rounded-[8px] bg-white px-7 text-[28px] font-semibold text-black transition hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
    : 'inline-flex h-[77px] items-center gap-5 rounded-[8px] bg-slate-900 px-7 text-[28px] font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/40';

  const secondaryButtonClass = isDark
    ? 'inline-flex h-[77px] items-center gap-5 rounded-[8px] bg-[#5D5D5D] px-8 text-[28px] font-semibold text-white transition hover:bg-[#6b6b6b] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80'
    : 'inline-flex h-[77px] items-center gap-5 rounded-[8px] bg-slate-200 px-8 text-[28px] font-semibold text-slate-900 transition hover:bg-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400';

  const mobileButtonClass = isDark
    ? 'flex h-[52px] w-[140px] items-center justify-center gap-3 rounded-[8px] bg-white px-6 text-base font-semibold text-black shadow transition'
    : 'flex h-[52px] w-[140px] items-center justify-center gap-3 rounded-[8px] bg-slate-900 px-6 text-base font-semibold text-white shadow transition';

  const mobileTextClass = isDark ? 'text-white' : 'text-slate-900';

  return (
    <section className={`${sectionClass} mt-[calc(env(safe-area-inset-top,0px)+7.5rem)] transition-colors duration-300 sm:mt-[calc(env(safe-area-inset-top,0px)+8.5rem)] sm:min-h-[660px] md:mt-[calc(env(safe-area-inset-top,0px)+9rem)] md:min-h-[860px] lg:mt-0 lg:min-h-[900px] xl:min-h-[940px]`}>
      {heroBackground ? (
        <Image
          src={heroBackground}
          alt={movie.title}
          fill
          priority
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-b from-[#1a1a1a] via-[#0f0f0f] to-black' : 'bg-slate-200'}`} />
      )}

      <div className={`${sideOverlayClass} transition-colors duration-300`} />
      <div className={`${bottomOverlayClass} transition-colors duration-300`} />
      <div className={`${topOverlayClass} transition-colors duration-300`} />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[2560px] flex-col justify-center px-5 pb-16 pt-24 sm:px-10 sm:pb-20 sm:pt-36 md:px-12 md:pt-48 lg:justify-start lg:pb-24 lg:pt-[180px] xl:px-[90px]">
        <div className="flex w-full flex-col items-center justify-center gap-4 px-4 text-center sm:gap-5
                lg:max-w-[891px] lg:self-start lg:items-start lg:justify-start lg:gap-8 lg:text-left">

          <div className="flex items-center justify-center gap-3 lg:justify-start">
            <Image src="/NextLogo.svg" alt="Nextflix" width={22} height={36} priority className="h-9 w-auto lg:h-[58px]" />
            <span className={`text-sm font-semibold uppercase tracking-[0.4em] lg:text-[28px] ${seriesTextClass}`}>Series</span>
          </div>

          <div className="relative h-[70px] w-full max-w-[200px] sm:h-[140px] sm:max-w-[360px] md:h-[160px] md:max-w-[520px] lg:h-[180px]">
            <TitleOverlay
              logoUrl={assets?.logoUrl ?? undefined}
              title={movie.title}
              wrapperClassName="absolute inset-0 flex items-center justify-center lg:justify-start"
              imageClassName={`object-contain object-center lg:object-left ${isDark ? 'drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)]' : 'drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)]'}`}
              fallbackClassName={`text-[28px] font-black leading-[1.05] text-center sm:text-5xl lg:text-left lg:text-6xl xl:text-[4.2rem] ${isDark ? 'text-white' : 'text-slate-900'}`}
              fallbackAs="h1"
              sizes="(max-width: 768px) 60vw, 40vw"
              priority
            />
          </div>

          {overview ? (
            <p className={`max-w-[889px] text-sm sm:text-lg md:text-xl lg:text-[30px] lg:leading-[38px] ${overviewTextClass}`}>
              {overview}
            </p>
          ) : null}

          <div className="mt-4 hidden items-center gap-6 md:flex">
            <button className={primaryButtonClass}>
              <span className={`flex h-[51px] w-[51px] items-center justify-center rounded-[6px] ${isDark ? 'text-black' : 'text-white'}`}>
                <PlayIcon className="ml-[2px] h-[51px] w-[49px]" />
              </span>
              <span className="tracking-[-0.04em] text-[40px]">Play</span>
            </button>
            <button className={secondaryButtonClass}>
              <span className={`flex h-10 w-10 items-center justify-center rounded-full border-[2.5px] text-lg font-semibold leading-none ${isDark ? 'border-white' : 'border-slate-300'}`}>
                <InformationCircleIcon className="h-[40px] w-[40px]" />
              </span>
              <span className="tracking-[-0.02em] text-[30px]">More Info</span>
            </button>
          </div>

          <div className="mt-8 flex w-full items-center justify-center gap-6 px-1 md:hidden">
            <button className={`flex w-20 flex-col items-center gap-1 ${mobileTextClass}`}>
              <span className="text-[42px] font-light leading-none">+</span>
              <span className="text-xs font-semibold tracking-[0.03em]">My List</span>
            </button>
            <button className={mobileButtonClass}>
              <PlayIcon className="h-6 w-6" />
              Play
            </button>
            <button className={`flex w-20 flex-col items-center gap-1 ${mobileTextClass}`}>
              <span className={`flex h-12 w-12 items-center justify-center rounded-full border-2 text-base font-semibold leading-none ${isDark ? 'border-white' : 'border-slate-900'}`}>
                i
              </span>
              <span className="text-xs font-semibold tracking-[0.03em]">Info</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
