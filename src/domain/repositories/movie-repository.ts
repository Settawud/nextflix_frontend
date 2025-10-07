import type { FeaturedRails, MovieDetail, MovieSummary } from '@domain/entities/movie';

export interface MovieRepository {
  getFeaturedRails(): Promise<FeaturedRails>;
  searchMovies(query: string): Promise<MovieSummary[]>;
  getMovieById(id: number): Promise<MovieDetail | null>;
}
