import { env } from '@config/environment';
import type { FeatureRails, MovieSummary } from '@domain/models/movie';

async function getFeatured(): Promise<FeatureRails> {
  const res = await fetch(`${env.apiBaseUrl}/api/movies/featured`, { headers: { Authorization: `Bearer ${env.apiKey}` }, next: { revalidate: 60 }});
  
  if (!res.ok) {
    throw new Error('Failed to fetch featured movies');
  }
  return res.json() as Promise<FeatureRails>;
}

export default async function Home() {
  const data = await getFeatured();
  const renderCard = (movie: MovieSummary) => (
    <div key={movie.id} className='aspect-[2/3] bg-zinc-800 rounded-xl'/>
  );

  return (
    <main className='p-4 max-w-6xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4'>Featured Movies</h1>
      <section className='my-6'>
        <div>
          <h2 className='text-xl font-semibold mb-2'>Trending</h2>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3'>
            {data.trending.map(renderCard)}
          </div>
        </div>
        <div>
          <h2 className='text-xl font-semibold mb-2'>Top Rated</h2>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3'>
            {data.top.map(renderCard)}
          </div>
        </div>
        <div>
          <h2 className='text-xl font-semibold mb-2'>Now Playing</h2>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3'>
            {data.now.map(renderCard)}
          </div>
        </div>
        </section>
    </main>
  );
}