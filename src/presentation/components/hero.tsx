'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState, type SVGProps } from 'react';

import type { MovieDetail, MovieSummary } from '@domain/entities/movie';
import type { MovieAssets } from '@domain/entities/movie-assets';
import { useDependencies } from '@presentation/providers/dependency-provider';
import { TitleOverlay } from '@presentation/components/title-overlay';

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

  return (
    <section className="relative isolate min-h-[620px] w-full overflow-hidden bg-black text-white sm:min-h-[660px] md:min-h-[860px] lg:min-h-[900px] xl:min-h-[940px]">
      {heroBackground ? (
        <Image src={heroBackground} alt={movie.title} fill priority sizes="100vw" className="object-cover" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] via-[#0f0f0f] to-black" />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-[#141414]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 via-black/30 to-transparent md:h-40" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[2560px] flex-col justify-end px-5 pb-24 pt-[180px] sm:px-10 sm:pt-[200px] md:justify-start md:px-12 md:pb-20 lg:pb-24 lg:pt-[180px] xl:px-[90px]">
        <div className="flex w-full max-w-[220px] flex-col items-center gap-4 text-center md:max-w-[891px] md:items-start md:gap-8 md:text-left">
          <div className="flex items-center justify-center gap-3 md:justify-start">
            <Image src="/NextLogo.svg" alt="Nextflix" width={22} height={36} priority className="h-9 w-auto md:h-[58px]" />
            <span className="text-sm font-semibold uppercase tracking-[0.4em] text-[#B9BBB9] md:text-[28px]">Series</span>
          </div>

          <div className="relative h-[70px] w-full max-w-[200px] sm:h-[140px] sm:max-w-[360px] md:h-[160px] md:max-w-[520px] lg:h-[180px]">
            <TitleOverlay
              logoUrl={assets?.logoUrl ?? undefined}
              title={movie.title}
              wrapperClassName="absolute inset-0 flex items-center justify-center md:justify-start"
              imageClassName="object-contain object-center drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)] md:object-left"
              fallbackClassName="text-[28px] font-black leading-[1.05] text-center sm:text-5xl md:text-left md:text-6xl lg:text-[4.2rem]"
              fallbackAs="h1"
              sizes="(max-width: 768px) 60vw, 40vw"
              priority
            />
          </div>

          {overview ? (
            <p className="max-w-[889px] text-sm text-slate-100 sm:text-lg md:text-xl lg:text-[30px] lg:leading-[38px]">
              {overview}
            </p>
          ) : null}

          <div className="mt-4 hidden items-center gap-6 md:flex">
            <button className="inline-flex h-[77px] items-center gap-5 rounded-[8px] bg-white px-7 text-[28px] font-semibold text-black transition hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
              <span className="flex h-[51px] w-[51px] items-center justify-center rounded-[6px] text-black">
                <PlayIcon className="ml-[2px] h-[51px] w-[49px]" />
              </span>
              <span className="tracking-[-0.04em] text-[40px]">Play</span>
            </button>
            <button className="inline-flex h-[77px] items-center gap-5 rounded-[8px] bg-[#5D5D5D] px-8 text-[28px] font-semibold text-white transition hover:bg-[#6b6b6b] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-[2.5px] border-white text-lg font-semibold leading-none">
                <InformationCircleIcon className="h-[40px] w-[40px]" />
              </span>
              <span className="tracking-[-0.02em] text-[30px]">More Info</span>
            </button>
          </div>

          <div className="mt-8 flex w-full items-center justify-center gap-6 px-1 md:hidden">
            <button className="flex w-20 flex-col items-center gap-1 text-white">
              <span className="text-[42px] font-light leading-none">+</span>
              <span className="text-xs font-semibold tracking-[0.03em]">My List</span>
            </button>
            <button className="flex h-[52px] w-[140px] items-center justify-center gap-3 rounded-[8px] bg-white px-6 text-base font-semibold text-black shadow">
              <PlayIcon className="h-6 w-6" />
              Play
            </button>
            <button className="flex w-20 flex-col items-center gap-1 text-white">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white text-base font-semibold leading-none">i</span>
              <span className="text-xs font-semibold tracking-[0.03em]">Info</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
