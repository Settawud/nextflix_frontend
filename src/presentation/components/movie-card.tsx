'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import type { MovieSummary } from '@domain/entities/movie';
import type { MovieAssets } from '@domain/entities/movie-assets';
import { useDependencies } from '@presentation/providers/dependency-provider';
import { TitleOverlay } from '@presentation/components/title-overlay';

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

  return (
    <article className="group relative flex h-[270px] w-[170px] shrink-0 snap-start flex-col overflow-hidden rounded-[6px] border border-black/20 bg-slate-900/40 shadow-[0_18px_36px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:-translate-y-1 sm:h-[300px] sm:w-[190px] md:h-[219px] md:w-[389px]">
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
        <div className="absolute inset-0 bg-slate-800" />
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4">
        <div className="relative h-14 w-full sm:h-16">
          <TitleOverlay
            logoUrl={assets?.logoUrl ?? undefined}
            title={movie.title}
            wrapperClassName="relative h-full w-full"
            imageClassName="object-contain object-left drop-shadow-[0_8px_18px_rgba(0,0,0,0.55)]"
            fallbackClassName="text-base font-semibold leading-tight text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.65)] sm:text-lg"
            fallbackAs="span"
            sizes="(max-width: 768px) 45vw, 20vw"
          />
        </div>
      </div>
    </article>
  );
};
