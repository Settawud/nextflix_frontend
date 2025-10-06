"use client";

import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@data/http/movieClient";

export function useFeatured() {
    return useQuery({
        queryKey: ['featured'],
        queryFn: () => apiGet<{ trending: any[]; top: any[]; now: any[]}>('/api/movies/featured')
    });
}

export function useSearch(q: string) {
    return useQuery({ queryKey: ['search', q], queryFn: () => apiGet<any[]>(`/api/movies/search?q=${encodeURIComponent(q)}`), enabled: !!q });
}
