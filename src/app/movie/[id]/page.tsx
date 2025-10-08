import type { MovieDetail } from '@domain/entities/movie';
import { env } from '@config/environment';

type PageParams = {
  params: {
    id: string;
  };
};

const fetchMovie = async (id: string): Promise<MovieDetail> => {
  const response = await fetch(`${env.apiBaseUrl}/api/movies/${id}`, {
    next: { revalidate: 120 },
  });

  if (!response.ok) {
    throw new Error(`Failed to load movie ${id} (${response.status})`);
  }

  return (await response.json()) as MovieDetail;
};

export default async function Page({ params }: PageParams) {
  const movie = await fetchMovie(params.id);

  return (
    <main className="mx-auto max-w-3xl p-4">
      <h1 className="text-2xl font-bold">{movie.title}</h1>
      <p className="mt-2 opacity-80">{movie.overview}</p>
    </main>
  );
}
