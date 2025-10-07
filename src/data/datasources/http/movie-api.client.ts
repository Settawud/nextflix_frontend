import { env } from '@config/environment';

import type {
  FeaturedRailsDto,
  MovieApiClient,
  MovieDetailDto,
  MovieSummaryDto,
} from '../movie-api.datasource';

const baseUrl = () => env.apiBaseUrl.replace(/\/$/, '');

const handle = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${baseUrl()}${path}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path} (${response.status})`);
  }

  return (await response.json()) as T;
};

export const createHttpMovieApiClient = (): MovieApiClient => ({
  fetchFeaturedRails: () => handle<FeaturedRailsDto>('/movies/featured'),
  searchMovies: (query) =>
    handle<MovieSummaryDto[]>(`/movies/search?q=${encodeURIComponent(query)}`),
  fetchMovieDetail: (id) => handle<MovieDetailDto>(`/movies/${id}`),
});
