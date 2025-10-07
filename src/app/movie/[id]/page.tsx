import { env } from '@config/environment';
export default async function Page({ params }: { params: { id: string } } ){
    const d = await fetch(`${env.apiBaseUrl}/api/movies/${params.id}`, { next: { revalidate: 120 }}).then(r => r.json());
    return (
        <main className="p-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold">{d.title}</h1>
            <p className="opacity-80 mt-2">{d.overview}</p>
        </main>
    );
}