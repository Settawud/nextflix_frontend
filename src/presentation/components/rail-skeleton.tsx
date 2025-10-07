export const RailSkeleton = () => (
  <div className="space-y-4">
    <div className="h-10 w-64 rounded bg-slate-800" />
    <div className="flex gap-[10px] overflow-hidden pb-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={`rail-skeleton-${index}`}
          className="h-[360px] w-[240px] shrink-0 animate-pulse rounded-[5px] border border-slate-800 bg-slate-800/70 sm:h-[380px] sm:w-[260px] md:h-[219px] md:w-[389px]"
        />
      ))}
    </div>
  </div>
);
