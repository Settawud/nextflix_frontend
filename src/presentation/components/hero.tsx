'use client';

import Image from 'next/image';
import { useMemo, type SVGProps } from 'react';

import type { MovieDetail } from '@domain/entities/movie';
import type { MovieAssets } from '@domain/entities/movie-assets';
import { TitleOverlay } from '@presentation/components/title-overlay';
import { useIsDarkTheme } from '@presentation/hooks/use-is-dark-theme';
import { cn } from '@utils/cn';

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
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    {...props}
  >
    <circle cx="12" cy="12" r="9" />
    <line x1="12" y1="8" x2="12" y2="8" />
    <path d="M11.5 11.5h1v5" />
  </svg>
);

export type HeroProps = {
  detail: MovieDetail;
  assets: MovieAssets | null;
};

export const Hero = ({ detail, assets }: HeroProps) => {
  const isDark = useIsDarkTheme();

  const overview = useMemo(() => truncate(detail.overview, 220), [detail.overview]);

  const releaseYear = useMemo(() => {
    if (!detail.releaseDate) return null;
    const parsed = new Date(detail.releaseDate);
    return Number.isNaN(parsed.getTime()) ? null : parsed.getFullYear().toString();
  }, [detail.releaseDate]);

  const voteAverage = useMemo(() => {
    if (!detail.voteAverage || detail.voteAverage <= 0) return null;
    return detail.voteAverage.toFixed(1);
  }, [detail.voteAverage]);

  const topGenres = useMemo(() => detail.genres.slice(0, 3), [detail.genres]);

  const metadata = useMemo(() => {
    const items: string[] = [];
    if (releaseYear) items.push(releaseYear);
    if (voteAverage) items.push(`${voteAverage} ★`);
    if (topGenres.length > 0) items.push(topGenres.join(', '));
    return items;
  }, [releaseYear, topGenres, voteAverage]);

  const heroBackground = useMemo(() => {
    if (assets?.textlessBackdropUrl) {
      return assets.textlessBackdropUrl;
    }
    if (assets?.backdropUrl) {
      return assets.backdropUrl;
    }
    return detail.backdropPath ?? detail.posterPath;
  }, [assets?.backdropUrl, assets?.textlessBackdropUrl, detail.backdropPath, detail.posterPath]);

  const sectionClass = isDark
    ? 'relative isolate w-full overflow-hidden bg-black text-white'
    : 'relative isolate w-full overflow-hidden bg-white text-slate-900';

  const sideOverlayClass = isDark
    ? 'absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent'
    : 'absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent';

  const bottomOverlayClass = isDark
    ? 'absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent via-black/30 to-[#0b0b0b]'
    : 'absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent via-white/60 to-white';

  const topOverlayClass = isDark
    ? 'absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/85 via-black/40 to-transparent md:h-44'
    : 'absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/95 via-white/70 to-transparent md:h-44';

  const seriesTextClass = isDark ? 'text-white/70' : 'text-slate-600';
  const overviewTextClass = isDark ? 'text-white/80' : 'text-slate-700';

  const primaryButtonClass = isDark
    ? 'inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-lg font-semibold text-black transition hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:px-8 md:py-4 md:text-xl'
    : 'inline-flex items-center gap-3 rounded-full bg-slate-900 px-6 py-3 text-lg font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/40 md:px-8 md:py-4 md:text-xl';

  const secondaryButtonClass = isDark
    ? 'inline-flex items-center gap-3 rounded-full border border-white/60 px-6 py-3 text-lg font-semibold text-white transition hover:border-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:px-8 md:py-4 md:text-xl'
    : 'inline-flex items-center gap-3 rounded-full border border-slate-300 px-6 py-3 text-lg font-semibold text-slate-900 transition hover:border-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 md:px-8 md:py-4 md:text-xl';

  const mobileButtonClass = isDark
    ? 'flex items-center justify-center gap-3 rounded-full bg-white/90 px-5 py-2.5 text-sm font-semibold text-black shadow transition hover:bg-white md:hidden'
    : 'flex items-center justify-center gap-3 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-slate-800 md:hidden';

  const mobileMetaClass = isDark ? 'text-white/70' : 'text-slate-600';

  return (
    <section
      className={cn(
        sectionClass,
        'mt-[calc(env(safe-area-inset-top,0px)+6.5rem)] min-h-[520px] transition-colors duration-300 sm:mt-[calc(env(safe-area-inset-top,0px)+7.5rem)] sm:min-h-[640px] md:mt-[calc(env(safe-area-inset-top,0px)+8rem)] md:min-h-[820px] lg:mt-0 lg:min-h-[880px] xl:min-h-[920px]',
      )}
    >
      {heroBackground ? (
        <Image
          src={heroBackground}
          alt={detail.title}
          fill
          priority
          loading="eager"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 75vw, 1900px"
          className="object-cover"
        />
      ) : (
        <div
          className={`absolute inset-0 ${
            isDark ? 'bg-gradient-to-b from-[#1a1a1a] via-[#0f0f0f] to-black' : 'bg-slate-200'
          }`}
        />
      )}

      <div className={`${sideOverlayClass} transition-colors duration-300`} />
      <div className={`${bottomOverlayClass} transition-colors duration-300`} />
      <div className={`${topOverlayClass} transition-colors duration-300`} />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[2560px] flex-col justify-center px-5 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-32 md:px-12 md:pt-44 lg:justify-start lg:pb-24 lg:pt-[180px] xl:px-[90px]">
        <div
          className="flex w-full flex-col items-center justify-center gap-4 px-2 text-center sm:gap-6 sm:px-6 lg:max-w-[900px] lg:self-start lg:items-start lg:text-left"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 lg:justify-start">
            <Image
              src="/NextLogo.svg"
              alt="Nextflix"
              width={22}
              height={36}
              className="h-8 w-auto sm:h-9 lg:h-[54px]"
              loading="lazy"
            />
            <span className={cn('text-xs font-semibold uppercase tracking-[0.5em] sm:text-sm lg:text-base', seriesTextClass)}>
              Series
            </span>
          </div>

          <div className="relative h-[62px] w-full max-w-[240px] sm:h-[126px] sm:max-w-[360px] md:h-[150px] md:max-w-[520px] lg:h-[180px]">
            <TitleOverlay
              logoUrl={assets?.logoUrl ?? undefined}
              title={detail.title}
              wrapperClassName="absolute inset-0 flex items-center justify-center lg:justify-start"
              imageClassName={`object-contain object-center lg:object-left ${
                isDark ? 'drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)]' : 'drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)]'
              }`}
              fallbackClassName={`text-[28px] font-black leading-[1.05] text-center sm:text-5xl lg:text-left lg:text-6xl xl:text-[4.2rem] ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
              fallbackAs="h1"
              sizes="(max-width: 768px) 60vw, 40vw"
              priority
            />
          </div>

          {overview ? (
            <p
              className={cn(
                'max-w-2xl text-balance text-sm sm:text-lg md:text-xl lg:text-[28px] lg:leading-[38px]',
                overviewTextClass,
              )}
            >
              {overview}
            </p>
          ) : null}

          {metadata.length > 0 ? (
            <ul
              className={cn(
                'mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-[0.35em] sm:text-sm',
                isDark ? 'text-white/70' : 'text-[#3a4f82]',
              )}
            >
              {metadata.map((item, index) => (
                <li key={item} className="flex items-center gap-4">
                  <span>{item}</span>
                  {index < metadata.length - 1 ? <span className="text-xs opacity-40">•</span> : null}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-6 hidden items-center gap-4 md:flex md:gap-5 lg:gap-6">
            <button className={primaryButtonClass}>
              <span
                className={cn(
                  'flex h-11 w-11 items-center justify-center rounded-full text-lg md:h-12 md:w-12',
                  isDark ? 'text-black' : 'text-white'
                ))}
              >
                <PlayIcon className="ml-[2px] h-6 w-6" />
              </span>
              <span className="tracking-[-0.03em]">Play</span>
            </button>
            <button className={secondaryButtonClass}>
              <span
                className={cn(
                  'flex h-11 w-11 items-center justify-center rounded-full border text-base leading-none md:h-12 md:w-12',
                  isDark ? 'border-white/80' : 'border-slate-300',
                )}
              >
                <InformationCircleIcon className="h-6 w-6" />
              </span>
              <span className="tracking-tight">More Info</span>
            </button>
          </div>

          <div className="mt-6 flex w-full items-center justify-center gap-5 md:hidden">
            <button className={cn('flex w-16 flex-col items-center gap-1 text-xs font-semibold', mobileMetaClass)}>
              <span className="text-[42px] font-light leading-none">+</span>
              <span className="text-xs font-semibold tracking-[0.03em]">My List</span>
            </button>
            <button className={mobileButtonClass}>
              <PlayIcon className="h-6 w-6" />
              Play
            </button>
            <button className={cn('flex w-16 flex-col items-center gap-1 text-xs font-semibold', mobileMetaClass)}>
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-current text-base font-semibold leading-none">
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
