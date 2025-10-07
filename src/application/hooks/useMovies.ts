import { useQuery } from '@tanstack/react-query';

import type { FeaturedRails, MovieSummary } from '@domain/models/movie';
import { apiGet } from '@data/http/movieClient';

export function useFeatured() {
  return useQuery<FeaturedRails>({
    queryKey: ['featured'],
    queryFn: () => apiGet<FeaturedRails>('/api/movies/featured'),
  });
}

export function useSearch(q: string) {
  return useQuery<MovieSummary[]>(
    {
      queryKey: ['search', q],
      queryFn: () =>
        apiGet<MovieSummary[]>(`/api/movies/search?q=${encodeURIComponent(q)}`),
      enabled: q.length > 0,
    },
  );
}
