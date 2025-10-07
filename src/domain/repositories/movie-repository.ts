import type { FeaturedRails, MovieDetail, MovieSummary } from '@domain/entities/movie';
import type { MovieAssets } from '@domain/entities/movie-assets';

export interface MovieRepository {
  getFeaturedRails(): Promise<FeaturedRails>;
  searchMovies(query: string): Promise<MovieSummary[]>;
  getMovieById(id: number): Promise<MovieDetail | null>;
  getMovieAssets(id: number): Promise<MovieAssets | null>;
}
