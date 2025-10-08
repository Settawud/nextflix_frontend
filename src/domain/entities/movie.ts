import type { MovieAssets } from './movie-assets';

export type MovieSummary = {
  id: number;
  title: string;
  posterPath: string | null;
  backdropPath: string | null;
  voteAverage: number;
};

export type MovieDetail = MovieSummary & {
  overview: string;
  releaseDate: string | null;
  genres: string[];
};

export type FeaturedHero = {
  detail: MovieDetail;
  assets: MovieAssets | null;
} | null;

export type FeaturedRails = {
  hero: FeaturedHero;
  trending: MovieSummary[];
  top: MovieSummary[];
  now: MovieSummary[];
};
