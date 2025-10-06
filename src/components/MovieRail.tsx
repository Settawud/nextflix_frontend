export default function MovieRail({ title, items, state }: { title: string; items: any[]; state: 'loading' | 'error' | 'success' }) {
    return (
        <section className="my-6">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            {state==='loading' && <div className="grid grid-cols02 sm:grid-cols-3 md:grid-cols-5 gap-3 animate-pulse">{Array.from({ length: 10}).map((_,i)=><div key={i} className="aspect-[2/3] bg-zinc-800 rounded-xl"/>)}</div>}
            {state==='error' && <div className='text-red-400'>Failed to load.</div>}
            {state==='success' && <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {items.map((m:any) => <div key={m.id} className="aspect-[2/3] bg-zinc-800 rounded-xl"/>)}</div>}
        </section>
        );
    }