export type MovieSummary = {
  id: number;
  title: string;
  posterPath: string | null;
  backdropPath: string | null;
  voteAverage: number;
};

export type FeaturedRails = {
  trending: MovieSummary[];
  top: MovieSummary[];
  now: MovieSummary[];
};

export type MovieDetail = MovieSummary & {
  overview: string;
  releaseDate: string | null;
  genres: string[];
};
