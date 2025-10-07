import type { FeaturedRails, MovieDetail, MovieSummary } from '@domain/entities/movie';

export type MovieSummaryDto = {
  id: number;
  title: string;
  posterPath: string | null;
  backdropPath: string | null;
  voteAverage: number;
};

export type FeaturedRailsDto = {
  trending: MovieSummaryDto[];
  top: MovieSummaryDto[];
  now: MovieSummaryDto[];
};

export type MovieDetailDto = MovieSummaryDto & {
  overview: string;
  releaseDate: string | null;
  genres: string[];
};

export interface MovieApiClient {
  fetchFeaturedRails(): Promise<FeaturedRailsDto>;
  searchMovies(query: string): Promise<MovieSummaryDto[]>;
  fetchMovieDetail(id: number): Promise<MovieDetailDto | null>;
}

export const mapSummary = (dto: MovieSummaryDto): MovieSummary => ({
  id: dto.id,
  title: dto.title,
  posterPath: dto.posterPath,
  backdropPath: dto.backdropPath,
  voteAverage: dto.voteAverage,
});

export const mapFeaturedRails = (dto: FeaturedRailsDto): FeaturedRails => ({
  trending: dto.trending.map(mapSummary),
  top: dto.top.map(mapSummary),
  now: dto.now.map(mapSummary),
});

export const mapDetail = (dto: MovieDetailDto): MovieDetail => ({
  ...mapSummary(dto),
  overview: dto.overview,
  releaseDate: dto.releaseDate,
  genres: dto.genres,
});
