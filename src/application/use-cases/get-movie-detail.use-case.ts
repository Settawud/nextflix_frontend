import type { MovieRepository } from '@domain/repositories/movie-repository';
import type { MovieDetail } from '@domain/entities/movie';

export class GetMovieDetailUseCase {
  constructor(private readonly repository: MovieRepository) {}

  execute(id: number): Promise<MovieDetail | null> {
    return this.repository.getMovieById(id);
  }
}
