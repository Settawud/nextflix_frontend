'use client';

import { useMemo } from 'react';

import { useFeaturedMovies } from '@presentation/hooks/use-featured-movies';
import { SiteHeader } from '@presentation/components/site-header';
import { Hero } from '@presentation/components/hero';
import { HeroSkeleton } from '@presentation/components/hero-skeleton';
import { MovieRail } from '@presentation/components/movie-rail';
import { RailSkeleton } from '@presentation/components/rail-skeleton';
import { StateBanner } from '@presentation/components/state-banner';
import { useIsDarkTheme } from '@presentation/hooks/use-is-dark-theme';

export const HomeScreen = () => {
  const featuredQuery = useFeaturedMovies();
  const isDark = useIsDarkTheme();

  const pageClass = isDark
    ? 'relative min-h-screen bg-black text-white'
    : 'relative min-h-screen bg-white text-slate-900';

  const railShellClass = isDark
    ? 'relative z-10 -mt-20 rounded-t-3xl bg-gradient-to-b from-black/60 via-black to-black pb-16 pt-10 sm:-mt-24 md:-mt-32'
    : 'relative z-10 -mt-20 rounded-t-3xl bg-white pb-16 pt-10 sm:-mt-24 md:-mt-32';

  const heroMovie = useMemo(() => {
    if (!featuredQuery.data) return null;
    return featuredQuery.data.trending.at(0) ?? null;
  }, [featuredQuery.data]);

  const otherTrending = useMemo(() => {
    if (!featuredQuery.data) return [];
    return featuredQuery.data.trending.slice(1);
  }, [featuredQuery.data]);

  const topRail = featuredQuery.data?.top ?? [];
  const nowRail = featuredQuery.data?.now ?? [];

  if (featuredQuery.isPending) {
    return (
      <div className={`${pageClass} transition-colors duration-300`}>
        <SiteHeader />
        <main className="flex flex-col">
          <HeroSkeleton />
          <div className="relative z-10 -mt-16 pb-16 md:-mt-24">
            <div className="mx-auto w-full max-w-[2560px] space-y-12 px-6 sm:px-10 lg:px-16 xl:px-[90px]">
              <RailSkeleton />
              <RailSkeleton />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (featuredQuery.isError) {
    return (
      <div className={`${pageClass} transition-colors duration-300`}>
        <SiteHeader />
        <main className="flex flex-col gap-8 px-6 pb-16 pt-32 sm:px-10 md:px-12">
          <StateBanner
            tone="error"
            title="We hit a snag"
            description="Something went wrong while loading featured movies. Please refresh or try again later."
            actionLabel="Retry"
            onAction={() => featuredQuery.refetch()}
          />
        </main>
      </div>
    );
  }

  if (!featuredQuery.data || (featuredQuery.data.trending.length === 0 && featuredQuery.data.top.length === 0)) {
    return (
      <div className={`${pageClass} transition-colors duration-300`}>
        <SiteHeader />
        <main className="flex flex-col gap-8 px-6 pb-16 pt-32 sm:px-10 md:px-12">
          <StateBanner
            tone="empty"
            title="No titles yet"
            description="Once the catalog is populated, freshly curated movies will appear here. Check back soon."
          />
        </main>
      </div>
    );
  }

  return (
    <div className={`${pageClass} transition-colors duration-300`}>
      <SiteHeader />
      <main className="flex flex-col">
        {heroMovie ? <Hero movie={heroMovie} /> : <HeroSkeleton />}
        <div className={`${railShellClass} transition-colors duration-300`}>
          <div className="mx-auto w-full max-w-[2560px] space-y-12 px-6 sm:px-10 lg:px-16 xl:px-[90px]">
            <MovieRail title="Popular on Nextflix" movies={otherTrending} />
            <MovieRail title="Top Picks For You" movies={topRail} />
            <MovieRail title="Now Streaming" movies={nowRail} />
          </div>
        </div>
      </main>
    </div>
  );
};
