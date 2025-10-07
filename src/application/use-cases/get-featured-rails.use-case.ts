import type { MovieRepository } from '@domain/repositories/movie-repository';
import type { FeaturedRails } from '@domain/entities/movie';

export class GetFeaturedRailsUseCase {
  constructor(private readonly repository: MovieRepository) {}

  execute(): Promise<FeaturedRails> {
    return this.repository.getFeaturedRails();
  }
}
