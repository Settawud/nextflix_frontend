import { useQuery } from '@tanstack/react-query';

import { useDependencies } from '@presentation/providers/dependency-provider';

export const useFeaturedMovies = () => {
  const {
    useCases: { getFeaturedRails },
  } = useDependencies();

  return useQuery({
    queryKey: ['featured-rails'],
    queryFn: () => getFeaturedRails.execute(),
    staleTime: 60_000,
  });
};
