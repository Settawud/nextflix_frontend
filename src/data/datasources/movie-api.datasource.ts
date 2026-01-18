import type { FeaturedRails, MovieDetail, MovieSummary } from '@domain/entities/movie';
import type { MovieAssets } from '@domain/entities/movie-assets';

export type MovieSummaryDto = {
  id: number;
  title: string;
  posterPath: string | null;
  backdropPath: string | null;
  voteAverage: number;
};

export type FeaturedRailsDto = {
  hero: {
    detail: MovieDetailDto;
    assets: MovieAssetsDto | null;
  } | null;
  trending: MovieSummaryDto[];
  top: MovieSummaryDto[];
  now: MovieSummaryDto[];
};

export type MovieDetailDto = MovieSummaryDto & {
  overview: string;
  releaseDate: string | null;
  genres: string[];
};

export type MovieAssetsDto = {
  id: number;
  title: string;
  backdropPath: string | null;
  textlessBackdropPath: string | null;
  logoPath: string | null;
};

export interface MovieApiClient {
  fetchFeaturedRails(): Promise<FeaturedRailsDto>;
  searchMovies(query: string): Promise<MovieSummaryDto[]>;
  fetchMovieDetail(id: number): Promise<MovieDetailDto | null>;
  fetchMovieAssets(id: number): Promise<MovieAssetsDto | null>;
}

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

const buildImageUrl = (path: string | null, size: string) =>
  path ? `${TMDB_IMAGE_BASE}/${size}${path}` : null;

export const mapSummary = (dto: MovieSummaryDto): MovieSummary => ({
  id: dto.id,
  title: dto.title,
  posterPath: buildImageUrl(dto.posterPath, 'w342'),
  backdropPath: buildImageUrl(dto.backdropPath, 'w1280'),
  voteAverage: dto.voteAverage,
});

export const mapFeaturedRails = (dto: FeaturedRailsDto): FeaturedRails => ({
  hero: dto.hero
    ? {
        detail: mapDetail(dto.hero.detail),
        assets: dto.hero.assets ? mapAssets(dto.hero.assets) : null,
      }
    : null,
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

export const mapAssets = (dto: MovieAssetsDto): MovieAssets => ({
  id: dto.id,
  title: dto.title,
  backdropUrl: buildImageUrl(dto.backdropPath, 'w1280'),
  textlessBackdropUrl: buildImageUrl(dto.textlessBackdropPath, 'w1280'),
  logoUrl: buildImageUrl(dto.logoPath, 'w500'),
  previewVideoUrl: null,
});
