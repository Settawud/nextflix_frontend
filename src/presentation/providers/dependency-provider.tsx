import { createContext, useContext, useMemo, PropsWithChildren } from 'react';

import type { MovieRepository } from '@domain/repositories/movie-repository';
import { GetFeaturedRailsUseCase } from '@application/use-cases/get-featured-rails.use-case';
import { SearchMoviesUseCase } from '@application/use-cases/search-movies.use-case';
import { GetMovieDetailUseCase } from '@application/use-cases/get-movie-detail.use-case';

type UseCases = {
  getFeaturedRails: GetFeaturedRailsUseCase;
  searchMovies: SearchMoviesUseCase;
  getMovieDetail: GetMovieDetailUseCase;
};

type DependencyContainer = {
  repository: MovieRepository;
  useCases: UseCases;
};

const DependencyContext = createContext<DependencyContainer | null>(null);

type DependencyProviderProps = PropsWithChildren<{
  repository: MovieRepository;
}>;

export const DependencyProvider = ({
  repository,
  children,
}: DependencyProviderProps) => {
  const value = useMemo<DependencyContainer>(
    () => ({
      repository,
      useCases: {
        getFeaturedRails: new GetFeaturedRailsUseCase(repository),
        searchMovies: new SearchMoviesUseCase(repository),
        getMovieDetail: new GetMovieDetailUseCase(repository),
      },
    }),
    [repository],
  );

  return (
    <DependencyContext.Provider value={value}>
      {children}
    </DependencyContext.Provider>
  );
};

export const useDependencies = () => {
  const context = useContext(DependencyContext);
  if (!context) {
    throw new Error('useDependencies must be used within DependencyProvider');
  }
  return context;
};
