'use client';

import Image from 'next/image';
import { useEffect, useState, type SVGProps } from 'react';

import type { MovieSummary } from '@domain/entities/movie';
import type { MovieAssets } from '@domain/entities/movie-assets';
import { useDependencies } from '@presentation/providers/dependency-provider';
import { TitleOverlay } from '@presentation/components/title-overlay';
import { useIsDarkTheme } from '@presentation/hooks/use-is-dark-theme';
import { cn } from '@utils/cn';

const PlayIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M6 4.5v15l13-7.5L6 4.5z" />
  </svg>
);

const PlusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

const ThumbsUpIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
    <path d="M7 10v12" />
    <path d="M15 5l-4 5.2V22h7c1.1 0 2-.9 2-2v-7.5c0-.5-.2-1-.6-1.4L15 5Z" />
  </svg>
);

export type MovieCardProps = {
  movie: MovieSummary;
};

const assetsCache = new Map<number, MovieAssets | null>();

export const MovieCard = ({ movie }: MovieCardProps) => {
  const { repository } = useDependencies();
  const [assets, setAssets] = useState<MovieAssets | null>(null);
  const [imageSrc, setImageSrc] = useState<string | undefined>(
    movie.backdropPath ?? movie.posterPath ?? undefined,
  );
  const isDark = useIsDarkTheme();
  const scoreLabel = movie.voteAverage > 0 ? movie.voteAverage.toFixed(1) : '–';

  useEffect(() => {
    let cancelled = false;
    setAssets(null);
    setImageSrc(movie.backdropPath ?? movie.posterPath ?? undefined);

    const cached = assetsCache.get(movie.id);
    if (cached !== undefined) {
      if (!cancelled) {
        setAssets(cached);
        if (cached?.textlessBackdropUrl) {
          setImageSrc(cached.textlessBackdropUrl);
        } else if (cached?.backdropUrl) {
          setImageSrc(cached.backdropUrl);
        }
      }
      return () => {
        cancelled = true;
      };
    }

    repository
      .getMovieAssets(movie.id)
      .then((result) => {
        if (cancelled) return;
        assetsCache.set(movie.id, result);
        setAssets(result);
        if (result?.textlessBackdropUrl) {
          setImageSrc(result.textlessBackdropUrl);
        } else if (result?.backdropUrl) {
          setImageSrc(result.backdropUrl);
        }
      })
      .catch(() => {
        if (cancelled) return;
        assetsCache.set(movie.id, null);
        setAssets(null);
      });

    return () => {
      cancelled = true;
    };
  }, [movie.backdropPath, movie.id, movie.posterPath, repository]);

  const cardClass = cn(
    'group relative isolate flex aspect-[2/3] w-[72vw] min-w-[72vw] flex-col overflow-hidden rounded-[18px] transition-all duration-300 sm:w-[220px] sm:min-w-[220px] md:w-[240px] md:min-w-[240px]',
    'lg:h-[260px] lg:w-[480px] lg:min-w-[480px] lg:flex-row lg:aspect-auto',
    isDark
      ? 'border border-white/10 bg-white/5 shadow-[0_22px_38px_rgba(0,0,0,0.45)] hover:-translate-y-1 hover:shadow-[0_28px_50px_rgba(0,0,0,0.6)]'
      : 'border border-slate-200 bg-white/90 shadow-[0_22px_34px_rgba(148,163,184,0.25)] hover:-translate-y-1 hover:shadow-[0_26px_45px_rgba(71,85,105,0.28)]',
  );

  const infoSectionClass = cn(
    'absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end gap-4 p-4 text-white transition-colors duration-300',
    isDark
      ? 'bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white'
      : 'bg-gradient-to-t from-transparent via-transparent to-transparent text-slate-900',
    'lg:static lg:flex-1 lg:justify-between lg:gap-5 lg:p-6',
    isDark ? 'lg:bg-black lg:text-white' : 'lg:bg-white lg:text-slate-900',
  );

  const fallbackClass = isDark
    ? 'text-[18px] font-semibold leading-tight text-white drop-shadow-[0_3px_8px_rgba(0,0,0,0.65)] sm:text-lg lg:text-xl'
    : 'text-[18px] font-semibold leading-tight text-slate-900 drop-shadow-[0_3px_8px_rgba(15,23,42,0.35)] sm:text-lg lg:text-xl';

  const imageShadowClass = isDark
    ? 'object-contain object-left drop-shadow-[0_10px_22px_rgba(0,0,0,0.55)]'
    : 'object-contain object-left drop-shadow-[0_10px_22px_rgba(0,0,0,0.22)]';

  const matchLabel = movie.voteAverage ? `${Math.round(movie.voteAverage * 10)}% Match` : 'Trending now';
  const maturityLabel = movie.voteAverage && movie.voteAverage > 7 ? '16+' : '13+';
  const runtimeLabel = `${100 + (movie.id % 35)} min`;
  const reviewTags = ['Slick', 'Thriller', 'Action'];

  return (
    <article className={cardClass}>
      <div
        className={cn(
          'absolute left-4 top-4 z-20 inline-flex items-center justify-center rounded-xl border px-3 py-1.5 backdrop-blur-sm sm:px-3.5 sm:py-2',
          isDark ? 'border-white/20 bg-black/40' : 'border-slate-200 bg-white/85',
        )}
      >
        <Image src="/NextLogo.svg" alt="Nextflix" width={40} height={14} className="h-[14px] w-auto sm:h-[16px]" />
      </div>

      <div className="relative h-full w-full flex-1">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105 lg:rounded-r-none"
            sizes="(max-width: 1024px) 60vw, (max-width: 1400px) 35vw, 420px"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className={`absolute inset-0 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />
        )}
        <div className="absolute inset-x-0 bottom-0 z-10 p-4 lg:hidden">
          <TitleOverlay
            logoUrl={assets?.logoUrl ?? undefined}
            title={movie.title}
            wrapperClassName="relative flex h-[48px] w-full items-end"
            imageClassName={cn(
              'max-h-[48px] object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.65)]',
              isDark ? 'invert-0' : 'invert-[0.02]',
            )}
            fallbackClassName="text-lg font-semibold text-white drop-shadow-[0_8px_18px_rgba(0,0,0,0.65)]"
            fallbackAs="span"
            sizes="(max-width: 768px) 60vw, 30vw"
          />
        </div>
      </div>

      <div className={infoSectionClass}>
        <div className="relative hidden h-[58px] w-full sm:h-16 lg:flex lg:h-[120px]">
          <TitleOverlay
            logoUrl={assets?.logoUrl ?? undefined}
            title={movie.title}
            wrapperClassName="relative flex h-full w-full items-center justify-start"
            imageClassName={imageShadowClass}
            fallbackClassName={fallbackClass}
            fallbackAs="span"
            sizes="(max-width: 768px) 45vw, 20vw"
          />
        </div>

        <div
          className={cn(
            'mt-3 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.22em]',
            isDark ? 'text-white/75' : 'text-slate-900',
            'lg:mt-4',
          )}
        >
          <span className="flex items-center gap-1 text-[11px] lg:text-sm">
            <span className="text-[10px]">★</span>
            {scoreLabel}
          </span>
          <span
            className={cn(
              'rounded-full px-2 py-1 text-[10px] lg:px-3.5 lg:py-1.5 lg:text-xs',
              isDark ? 'bg-white/15 text-white' : 'bg-slate-900 text-white',
            )}
          >
            Play
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 hidden flex-col justify-between rounded-[18px] bg-black/90 p-6 opacity-0 shadow-[0_36px_80px_rgba(0,0,0,0.65)] transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100 lg:flex">
        <div className="space-y-4">
          <TitleOverlay
            logoUrl={assets?.logoUrl ?? undefined}
            title={movie.title}
            wrapperClassName="relative flex h-[70px] w-full items-center"
            imageClassName="max-h-[70px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.75)]"
            fallbackClassName="text-2xl font-bold text-white"
            fallbackAs="span"
            sizes="(max-width: 1200px) 30vw, 240px"
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Play"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <PlayIcon className="h-6 w-6" />
            </button>
            <button
              type="button"
              aria-label="Add to My List"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <PlusIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Thumbs up"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <ThumbsUpIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="space-y-3 text-white/85">
          <div className="flex flex-wrap items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em]">
            <span className="text-lime-300">{matchLabel}</span>
            <span className="rounded border border-white/30 px-2 py-0.5 text-xs">{maturityLabel}</span>
            <span className="text-xs">{runtimeLabel}</span>
            <span className="rounded border border-white/30 px-2 py-0.5 text-xs">HD</span>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-white/70">
            {reviewTags.map((tag) => (
              <span key={tag} className="relative pl-3">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-white/40">•</span>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};
