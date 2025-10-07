import { FeatureRails, MovieSummary } from '@domain/models/movie';

export function useFeature() {
    return useQuery<FeatureRails>({
        queryKey: ['featured'],
        queryFn: () => apiGet<FeatureRails>('/api/movies/featured'),
    });
}

export function useSearch(q: string) {
    return useQuery<MovieSummary[]>({
        queryKey: ['search', q],
        queryFn: () => apiGet<MovieSummary[]>(`/api/movies/search?q=${encodeURIComponent(q)}`),
        enabled: q.length > 0,
    });
}