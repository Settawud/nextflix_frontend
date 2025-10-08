'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import type { MovieSummary } from '@domain/entities/movie';
import type { MovieAssets } from '@domain/entities/movie-assets';
import { useDependencies } from '@presentation/providers/dependency-provider';
import { TitleOverlay } from '@presentation/components/title-overlay';
import { useIsDarkTheme } from '@presentation/hooks/use-is-dark-theme';

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

  const cardClass = isDark
    ? 'group relative flex h-[270px] w-[170px] shrink-0 snap-start flex-col overflow-hidden rounded-[6px] border border-black/20 bg-slate-900/40 shadow-[0_18px_36px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:-translate-y-1 sm:h-[300px] sm:w-[190px] md:h-[219px] md:w-[389px]'
    : 'group relative flex h-[270px] w-[170px] shrink-0 snap-start flex-col overflow-hidden rounded-[6px] border border-slate-200/60 bg-white shadow-[0_18px_36px_rgba(148,163,184,0.25)] transition-transform duration-200 hover:-translate-y-1 sm:h-[300px] sm:w-[190px] md:h-[219px] md:w-[389px]';

  const overlayClass = isDark
    ? 'pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4'
    : 'pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-slate-950/25 via-slate-950/5 to-transparent p-4';

  const fallbackClass = isDark
    ? 'text-base font-semibold leading-tight text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.65)] sm:text-lg'
    : 'text-base font-semibold leading-tight text-slate-900 drop-shadow-[0_3px_6px_rgba(15,23,42,0.35)] sm:text-lg';

  const imageShadowClass = isDark
    ? 'object-contain object-left drop-shadow-[0_8px_18px_rgba(0,0,0,0.55)]'
    : 'object-contain object-left drop-shadow-[0_8px_18px_rgba(0,0,0,0.25)]';

  return (
    <article className={cardClass}>
      <span className="absolute left-3 top-3 z-20 inline-flex items-center justify-center rounded px-1.5 py-1">
        <Image src="/NextLogo.svg" alt="Nextflix" width={20} height={35} priority className="h-[35px] w-[20px]" />
      </span>

      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-105"
          sizes="(max-width: 768px) 40vw, (max-width: 1200px) 30vw, 20vw"
        />
      ) : (
        <div className={`absolute inset-0 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />
      )}

      <div className={`${overlayClass} transition-colors duration-300`}>
        <div className="relative h-14 w-full sm:h-16">
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
      </div>
    </article>
  );
};
