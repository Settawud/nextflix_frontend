import type { MovieRepository } from '@domain/repositories/movie-repository';
import type { MovieSummary } from '@domain/entities/movie';

export class SearchMoviesUseCase {
  constructor(private readonly repository: MovieRepository) {}

  execute(query: string): Promise<MovieSummary[]> {
    return this.repository.searchMovies(query);
  }
}
