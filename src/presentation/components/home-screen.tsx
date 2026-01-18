'use client';

import { Suspense, useMemo } from 'react';
import dynamic from 'next/dynamic';

import { useFeaturedMovies } from '@presentation/hooks/use-featured-movies';
import { SiteHeader } from '@presentation/components/site-header';
import { Hero } from '@presentation/components/hero';
import { HeroSkeleton } from '@presentation/components/hero-skeleton';
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
    ? 'relative z-10 -mt-28 rounded-t-[48px] bg-gradient-to-b from-transparent via-black/85 to-black pb-20 pt-16 backdrop-blur-[1.5px] sm:-mt-32 md:-mt-36'
    : 'relative z-10 -mt-28 rounded-t-[48px] bg-gradient-to-b from-transparent via-white/80 to-white pb-20 pt-16 backdrop-blur-[1.5px] sm:-mt-32 md:-mt-36';

  const heroPayload = featuredQuery.data?.hero ?? null;

  const otherTrending = useMemo(() => {
    const trending = featuredQuery.data?.trending ?? [];
    if (!heroPayload) {
      return trending;
    }
    const heroId = heroPayload.detail.id;
    if (trending[0]?.id === heroId) {
      return trending.slice(1);
    }
    return trending.filter((movie) => movie.id !== heroId);
  }, [featuredQuery.data, heroPayload]);

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

  if (
    !featuredQuery.data ||
    (featuredQuery.data.trending.length === 0 && featuredQuery.data.top.length === 0 && featuredQuery.data.now.length === 0)
  ) {
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
        {heroPayload ? <Hero detail={heroPayload.detail} assets={heroPayload.assets} /> : <HeroSkeleton />}
        <div className={`${railShellClass} transition-colors duration-300`}>
          <div className="mx-auto w-full max-w-[2560px] space-y-14 px-6 sm:px-10 lg:px-16 xl:px-[90px]">
            <Suspense fallback={<RailSkeleton />}>
              <MovieRail title="Popular on Nextflix" movies={otherTrending} />
            </Suspense>
            <Suspense fallback={<RailSkeleton />}>
              <MovieRail title="Top Picks For You" movies={topRail} />
            </Suspense>
            <Suspense fallback={<RailSkeleton />}>
              <MovieRail title="Now Streaming" movies={nowRail} />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
};
const MovieRail = dynamic(
  () =>
    import('@presentation/components/movie-rail').then(
      ({ MovieRail: Component }) => Component,
    ),
  {
    ssr: false,
    loading: () => <RailSkeleton />,
  },
);
