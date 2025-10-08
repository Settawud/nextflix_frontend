import type { MovieRepository } from '@domain/repositories/movie-repository';
import type { MovieApiClient } from '@data/datasources/movie-api.datasource';
import { mapAssets, mapDetail, mapFeaturedRails, mapSummary } from '@data/datasources/movie-api.datasource';

export class MovieRepositoryImpl implements MovieRepository {
  constructor(private readonly api: MovieApiClient) {}

  async getFeaturedRails() {
    const dto = await this.api.fetchFeaturedRails();
    return mapFeaturedRails(dto);
  }

  async searchMovies(query: string) {
    const dto = await this.api.searchMovies(query);
    return dto.map(mapSummary);
  }

  async getMovieById(id: number) {
    const dto = await this.api.fetchMovieDetail(id);
    return dto ? mapDetail(dto) : null;
  }

  async getMovieAssets(id: number) {
    const dto = await this.api.fetchMovieAssets(id);
    return dto ? mapAssets(dto) : null;
  }
}
