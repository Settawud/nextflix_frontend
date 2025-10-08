import type {
  FeaturedRailsDto,
  MovieApiClient,
  MovieDetailDto,
  MovieAssetsDto,
  MovieSummaryDto,
} from '../movie-api.datasource';

const demoSummaries: MovieSummaryDto[] = [
  {
    id: 1,
    title: 'Demo Movie',
    posterPath: null,
    backdropPath: null,
    voteAverage: 7.5,
  },
  {
    id: 2,
    title: 'Sample Adventure',
    posterPath: null,
    backdropPath: null,
    voteAverage: 8.3,
  },
  {
    id: 3,
    title: 'Thriller Nights',
    posterPath: null,
    backdropPath: null,
    voteAverage: 6.8,
  },
];

const demoHeroDetail: MovieDetailDto = {
  ...demoSummaries[0],
  overview: 'A mock hero movie synopsis used while offline.',
  releaseDate: '2024-10-01',
  genres: ['Drama'],
};

const demoHeroAssets: MovieAssetsDto = {
  id: demoHeroDetail.id,
  title: demoHeroDetail.title,
  backdropPath: demoHeroDetail.backdropPath,
  textlessBackdropPath: demoHeroDetail.backdropPath,
  logoPath: demoHeroDetail.posterPath,
};

const demoFeatured: FeaturedRailsDto = {
  hero: {
    detail: demoHeroDetail,
    assets: demoHeroAssets,
  },
  trending: demoSummaries,
  top: demoSummaries.slice().reverse(),
  now: demoSummaries.slice(0, 2),
};

export const createMockMovieApiClient = (): MovieApiClient => ({
  async fetchFeaturedRails() {
    return demoFeatured;
  },
  async searchMovies() {
    return demoSummaries;
  },
  async fetchMovieDetail(id: number) {
    const match = demoSummaries.find((item) => item.id === id);
    if (!match) return null;
    const detail: MovieDetailDto = {
      ...match,
      overview: 'This is placeholder content used while wiring the API client.',
      releaseDate: '2024-01-01',
      genres: ['Drama'],
    };
    return detail;
  },
  async fetchMovieAssets(id: number) {
    const match = demoSummaries.find((item) => item.id === id);
    if (!match) return null;
    const assets: MovieAssetsDto = {
      id: match.id,
      title: match.title,
      backdropPath: match.backdropPath,
      textlessBackdropPath: match.backdropPath,
      logoPath: match.posterPath,
    };
    return assets;
  },
});
