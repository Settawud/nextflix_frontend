import type {
  FeaturedRailsDto,
  MovieApiClient,
  MovieDetailDto,
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

const demoFeatured: FeaturedRailsDto = {
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
});
