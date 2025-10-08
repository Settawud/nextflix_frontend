"use client";

import { useIsDarkTheme } from '@presentation/hooks/use-is-dark-theme';

type StateBannerProps = {
  tone: 'error' | 'empty';
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

export const StateBanner = ({
  tone,
  title,
  description,
  actionLabel,
  onAction,
}: StateBannerProps) => {
  const isDark = useIsDarkTheme();

  const containerClass = (() => {
    if (tone === 'error') {
      return isDark
        ? 'border-red-500/40 bg-red-500/10 text-red-100'
        : 'border-red-500/30 bg-red-100 text-red-700';
    }
    return isDark
      ? 'border-white/20 bg-white/5 text-slate-100'
      : 'border-slate-300 bg-slate-200/60 text-slate-800';
  })();

  const iconWrapperClass = isDark
    ? 'flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-lg text-white'
    : 'flex h-8 w-8 items-center justify-center rounded-full bg-white/60 text-lg text-slate-900';

  const descriptionClass = isDark ? 'text-sm text-white/80' : 'text-sm text-slate-700';

  const buttonClass = isDark
    ? 'self-start rounded-full border border-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:border-white hover:bg-white/10'
    : 'self-start rounded-full border border-slate-400 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-900 transition hover:border-slate-500 hover:bg-white/30';

  return (
    <div className={`flex flex-col gap-3 rounded-2xl border p-6 transition-colors duration-300 ${containerClass}`}>
      <div className="flex items-center gap-3">
        <span className={iconWrapperClass}>{tone === 'error' ? '!' : 'ℹ️'}</span>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className={descriptionClass}>{description}</p>
      {actionLabel ? (
        <button type="button" onClick={onAction} className={buttonClass}>
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
};
