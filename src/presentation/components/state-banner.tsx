type StateBannerProps = {
  tone: 'error' | 'empty';
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

const toneStyles: Record<StateBannerProps['tone'], string> = {
  error: 'border-red-500/40 bg-red-500/10 text-red-100',
  empty: 'border-white/20 bg-white/5 text-slate-100',
};

export const StateBanner = ({
  tone,
  title,
  description,
  actionLabel,
  onAction,
}: StateBannerProps) => {
  return (
    <div className={`flex flex-col gap-3 rounded-2xl border p-6 ${toneStyles[tone]}`}>
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-lg">
          {tone === 'error' ? '!' : 'ℹ️'}
        </span>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-white/80">{description}</p>
      {actionLabel ? (
        <button
          type="button"
          onClick={onAction}
          className="self-start rounded-full border border-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:border-white hover:bg-white/10"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
};
