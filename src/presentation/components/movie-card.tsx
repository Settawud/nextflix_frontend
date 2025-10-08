'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import type { MovieSummary } from '@domain/entities/movie';
import type { MovieAssets } from '@domain/entities/movie-assets';
import { useDependencies } from '@presentation/providers/dependency-provider';
import { TitleOverlay } from '@presentation/components/title-overlay';
import { useIsDarkTheme } from '@presentation/hooks/use-is-dark-theme';
import { cn } from '@utils/cn';

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
    'group relative isolate shrink-0 snap-start overflow-hidden rounded-[18px] transition-all duration-300',
    'w-[72vw] min-w-[72vw] aspect-[2/3] sm:w-[220px] sm:min-w-[220px] md:w-[240px] md:min-w-[240px] lg:w-[280px] lg:min-w-[280px]',
    isDark
      ? 'border border-white/10 bg-white/5 shadow-[0_22px_38px_rgba(0,0,0,0.45)] hover:-translate-y-1.5 hover:shadow-[0_28px_50px_rgba(0,0,0,0.6)]'
      : 'border border-slate-200 bg-white/90 shadow-[0_22px_34px_rgba(148,163,184,0.25)] hover:-translate-y-1.5 hover:shadow-[0_26px_45px_rgba(71,85,105,0.28)]',
  );

  const overlayClass = isDark
    ? 'pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-4'
    : 'pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-slate-950/15 via-slate-950/0 to-transparent p-4';

  const fallbackClass = isDark
    ? 'text-[15px] font-semibold leading-tight text-white drop-shadow-[0_3px_8px_rgba(0,0,0,0.65)] sm:text-lg'
    : 'text-[15px] font-semibold leading-tight text-slate-900 drop-shadow-[0_3px_8px_rgba(15,23,42,0.35)] sm:text-lg';

  const imageShadowClass = isDark
    ? 'object-contain object-left drop-shadow-[0_10px_22px_rgba(0,0,0,0.55)]'
    : 'object-contain object-left drop-shadow-[0_10px_22px_rgba(0,0,0,0.22)]';

  return (
    <article className={cardClass}>
      <span className={cn('absolute left-3 top-3 z-20 inline-flex items-center justify-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]', isDark ? 'bg-white/15 text-white' : 'bg-white/80 text-slate-900')}>
        Featured
      </span>

      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-105"
          sizes="(max-width: 768px) 60vw, (max-width: 1200px) 30vw, 20vw"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className={`absolute inset-0 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />
      )}

      <div className={cn(overlayClass, 'transition-colors duration-300')}>
        <div className="relative h-[58px] w-full sm:h-16">
          <TitleOverlay
            logoUrl={assets?.logoUrl ?? undefined}
            title={movie.title}
            wrapperClassName="relative h-full w-full"
            imageClassName={imageShadowClass}
            fallbackClassName={fallbackClass}
            fallbackAs="span"
            sizes="(max-width: 768px) 45vw, 20vw"
          />
        </div>

        <div className={cn('mt-3 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.22em]', isDark ? 'text-white/70' : 'text-slate-700')}>
          <span className="flex items-center gap-1 text-[11px]">
            <span className="text-[10px]">★</span>
            {scoreLabel}
          </span>
          <span className={cn('rounded-full px-2 py-1 text-[10px]', isDark ? 'bg-white/10 text-white' : 'bg-slate-900 text-white')}>
            Play
          </span>
        </div>
      </div>
    </article>
  );
};
