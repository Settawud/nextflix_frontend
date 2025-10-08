'use client';

import Image from 'next/image';
import { memo, useCallback, useEffect, useMemo, useState, type ReactElement, type SVGProps } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@utils/cn';

type ThemeMode = 'light' | 'dark';

type NavItem = {
  label: string;
  isActive?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', isActive: true },
  { label: 'TV Shows' },
  { label: 'Movies' },
  { label: 'New & Popular' },
  { label: 'My List' },
  { label: 'Browse by Languages' },
];

const MOBILE_SUB_ITEMS = ['TV Shows', 'Movies', 'Categories'];

const MagnifyingGlassIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
    <circle cx="11" cy="11" r="6" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const BellIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
    <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);

const ChevronDownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const BarsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
    <path d="M3 7h18" />
    <path d="M3 12h12" />
    <path d="M3 17h6" />
  </svg>
);

const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const headerTokens = {
  light: {
    desktop: {
      idle: 'bg-gradient-to-b from-[#d8dde9]/95 via-[#a8b4d0]/50 to-transparent text-[#1a2750]',
      scrolled: 'bg-white/92 text-[#152040] shadow-[0_8px_22px_rgba(34,52,96,0.18)] backdrop-blur',
    },
    mobileTop: {
      idle: 'bg-gradient-to-b from-[#d8dde9]/95 via-[#a8b4d0]/50 to-transparent text-[#1a2750]',
      scrolled: 'bg-white/92 text-[#152040] shadow-[0_6px_18px_rgba(32,50,92,0.16)] backdrop-blur',
    },
    mobileSub: 'bg-[#e9edf6] text-[#1b2d5a] border-b border-[#c2cbe3]/80',
    nav: {
      base: 'relative text-[20px] leading-[28px] tracking-[-0.02em] transition-colors duration-200 focus:outline-none',
      idle: 'font-medium text-[#3a4f82] hover:text-[#102046] focus-visible:text-[#102046]',
      active:
        "font-semibold text-[#102046] focus-visible:text-[#102046] after:absolute after:-bottom-[6px] after:left-0 after:h-[2px] after:w-full after:bg-[#102046] after:content-['']",
      indicator: 'text-[#102046]',
    },
    icon: 'hover:text-[#101e42] focus-visible:text-[#101e42]',
    accountBadge: 'border-[#c2cadf] bg-white/85 text-[#102046]',
    drawerSurface: 'bg-white/95 text-[#1c2f5a]',
    drawerClose: 'hover:text-[#101e3c] focus-visible:ring-[#a2b0d6]',
    drawerLink: {
      base: 'flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-base font-medium transition-colors focus:outline-none focus-visible:ring-2',
      idle: 'text-[#223666] hover:bg-[#e3e9f7] focus-visible:ring-[#b8c5ea]',
      active: 'bg-[#102046] text-white focus-visible:ring-[#102046]/50',
      indicator: 'text-[#c9d4f0]',
    },
    drawerFooter: 'text-[#253a6e]',
  },
  dark: {
    desktop: {
      idle: 'bg-black text-white',
      scrolled: 'bg-black text-white shadow-[0_6px_20px_rgba(0,0,0,0.35)]',
    },
    mobileTop: {
      idle: 'bg-black text-white',
      scrolled: 'bg-black text-white shadow-[0_6px_18px_rgba(0,0,0,0.3)]',
    },
    mobileSub: 'bg-black text-white border-b border-white/10',
    nav: {
      base: 'relative text-[20px] leading-[28px] tracking-[-0.02em] transition-colors duration-200 focus:outline-none',
      idle: 'font-medium text-white/80 hover:text-white focus-visible:text-white',
      active:
        "font-semibold text-white focus-visible:text-white after:absolute after:-bottom-[6px] after:left-0 after:h-[2px] after:w-full after:bg-white after:content-['']",
      indicator: 'text-white/70',
    },
    icon: 'hover:text-white focus-visible:text-white',
    accountBadge: 'border-white/30 bg-white/10 text-white',
    drawerSurface: 'bg-black/95 text-white',
    drawerClose: 'hover:text-white focus-visible:ring-white/60',
    drawerLink: {
      base: 'flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-base font-medium transition-colors focus:outline-none focus-visible:ring-2',
      idle: 'text-white/80 hover:bg-white/5 focus-visible:ring-white/30',
      active: 'bg-white/10 text-white focus-visible:ring-white/40',
      indicator: 'text-white/70',
    },
    drawerFooter: 'text-white/80',
  },
} satisfies Record<
  ThemeMode,
  {
    desktop: { idle: string; scrolled: string };
    mobileTop: { idle: string; scrolled: string };
    mobileSub: string;
    nav: { base: string; idle: string; active: string; indicator: string };
    icon: string;
    accountBadge: string;
    drawerSurface: string;
    drawerClose: string;
    drawerLink: { base: string; idle: string; active: string; indicator: string };
    drawerFooter: string;
  }
>;

const iconButtonClass = (theme: ThemeMode) => cn('transition focus:outline-none', headerTokens[theme].icon);

const desktopNavLinkClass = (theme: ThemeMode, isActive: boolean) =>
  cn(headerTokens[theme].nav.base, isActive ? headerTokens[theme].nav.active : headerTokens[theme].nav.idle);

const MobileNavLink = ({ label, theme }: { label: string; theme: ThemeMode }) => (
  <button
    type="button"
    className={cn(
      'flex items-center gap-1 text-lg font-medium transition focus:outline-none',
      theme === 'dark' ? 'hover:text-white focus-visible:text-white' : 'hover:text-[#102046] focus-visible:text-[#102046]',
    )}
  >
    {label}
    {label === 'Categories' ? <span className="text-xs">▾</span> : null}
  </button>
);

type ThemeToggleButtonProps = {
  mode: ThemeMode;
  mounted: boolean;
  animating: boolean;
  onToggle: () => void;
};

const ThemeToggleButton = memo(({ mode, mounted, animating, onToggle }: ThemeToggleButtonProps) => (
  <button
    type="button"
    onClick={onToggle}
    aria-label="Toggle theme"
    aria-pressed={mode === 'dark'}
    className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-[#0f1d3a] transition-all duration-300 hover:scale-105 hover:border-slate-500 hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-white/30 dark:bg-white/10 dark:text-white dark:hover:border-white/60 dark:hover:bg-white/20 shadow-sm dark:shadow-[0_0_10px_rgba(255,255,255,0.18)]"
  >
    {animating && (
      <span className="absolute inset-0 animate-ping rounded-full border border-slate-300/50 dark:border-white/20" />
    )}
    {!mounted ? null : (
      <span className={cn('relative block text-lg transition-transform duration-500', animating && 'motion-safe:animate-spin')}>
        <span
          className={cn(
            'absolute inset-0 grid place-items-center transition-all duration-500 transform',
            mode === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0',
          )}
        >
          🌙
        </span>
        <span
          className={cn(
            'absolute inset-0 grid place-items-center transition-all duration-500 transform',
            mode === 'dark' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100',
          )}
        >
          ☀️
        </span>
        <span className="invisible">☀️</span>
      </span>
    )}
  </button>
));
ThemeToggleButton.displayName = 'ThemeToggleButton';

type MobileDrawerProps = {
  open: boolean;
  theme: ThemeMode;
  navItems: NavItem[];
  onClose: () => void;
  renderThemeToggle: () => ReactElement;
};

const MobileDrawer = ({ open, theme, navItems, onClose, renderThemeToggle }: MobileDrawerProps) => {
  if (!open) return null;

  const tokens = headerTokens[theme];

  return (
    <div className="pointer-events-auto lg:hidden">
      <div
        className={cn(
          'fixed inset-0 z-40 transition-opacity',
          theme === 'dark' ? 'bg-black/70 backdrop-blur-sm' : 'bg-slate-900/60 backdrop-blur-sm',
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[82%] max-w-xs flex-col shadow-2xl backdrop-blur-md transition-[transform,opacity] duration-300 ease-out',
          tokens.drawerSurface,
        )}
      >
        <div className="flex items-center justify-between px-5 pb-4 pt-6">
          <Image src="/NextNavbar.svg" alt="Nextflix" width={96} height={28} loading="lazy" />
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className={cn('rounded-full p-2 transition focus:outline-none focus-visible:ring-2', tokens.drawerClose)}
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-5 pb-6">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={onClose}
                  className={cn(
                    tokens.drawerLink.base,
                    item.isActive ? tokens.drawerLink.active : tokens.drawerLink.idle,
                  )}
                >
                  <span>{item.label}</span>
                  {item.isActive ? (
                    <span className={cn('text-xs uppercase tracking-[0.22em]', tokens.drawerLink.indicator)}>
                      Now
                    </span>
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className={cn('flex items-center justify-between gap-3 px-5 pb-6', tokens.drawerFooter)}>
          <div className="text-sm font-medium uppercase tracking-[0.1em]">Theme</div>
          {renderThemeToggle()}
        </div>
      </aside>
    </div>
  );
};

const DesktopNav = ({ theme }: { theme: ThemeMode }) => (
  <ul
    className={cn('flex items-center gap-7 transition-colors', theme === 'dark' ? 'text-white' : 'text-[#2c3f75]')}
  >
    {NAV_ITEMS.map((item) => (
      <li key={item.label}>
        <button type="button" className={desktopNavLinkClass(theme, Boolean(item.isActive))}>
          {item.label}
        </button>
      </li>
    ))}
  </ul>
);

export const SiteHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();

  const mode = (resolvedTheme ?? theme ?? 'dark') as ThemeMode;
  const tokens = headerTokens[mode];

  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const toggleMobile = useCallback(() => setMobileOpen((open) => !open), []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMobile();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen, closeMobile]);

  useEffect(() => {
    if (!mobileOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileOpen]);

  const toggleTheme = useCallback(() => {
    if (!mounted) return;
    setAnimating(true);
    setTimeout(() => setAnimating(false), 500);
    setTheme(mode === 'dark' ? 'light' : 'dark');
  }, [mode, mounted, setTheme]);

  const desktopClass = useMemo(
    () => (isScrolled ? tokens.desktop.scrolled : tokens.desktop.idle),
    [isScrolled, tokens.desktop.idle, tokens.desktop.scrolled],
  );

  const mobileTopClass = useMemo(
    () => (isScrolled ? tokens.mobileTop.scrolled : tokens.mobileTop.idle),
    [isScrolled, tokens.mobileTop.idle, tokens.mobileTop.scrolled],
  );

  const renderThemeToggle = useCallback(
    () => <ThemeToggleButton mode={mode} mounted={mounted} animating={animating} onToggle={toggleTheme} />,
    [animating, mode, mounted, toggleTheme],
  );

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-30 flex flex-col">
      <div className={cn('pointer-events-auto hidden h-[102px] w-full lg:flex transition-all duration-300 ease-out', desktopClass)}>
        <nav className="mx-auto flex h-full w-full max-w-[2560px] items-center justify-between gap-8 px-6 sm:px-10 lg:px-16 xl:px-[90px]">
          <div className="flex items-center gap-12">
            <Image src="/NextNavbar.svg" alt="Nextflix" width={139} height={39} loading="lazy" />
            <DesktopNav theme={mode} />
          </div>
          <div className={cn('flex items-center gap-7 transition-colors', mode === 'dark' ? 'text-white/90' : 'text-[#2f437a]')}>
            <button type="button" aria-label="Search" className={iconButtonClass(mode)}>
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
            <button type="button" className={cn('text-[20px] font-medium tracking-[-0.02em]', iconButtonClass(mode))}>
              Kids
            </button>
            <button type="button" aria-label="Notifications" className={iconButtonClass(mode)}>
              <BellIcon className="h-6 w-6" />
            </button>
            <button
              type="button"
              aria-label="Account"
              className={cn(
                'flex items-center gap-2 transition focus:outline-none',
                mode === 'dark'
                  ? 'text-white hover:text-white focus-visible:text-white'
                  : 'text-[#102046] hover:text-[#0a182f] focus-visible:text-[#0a182f]',
              )}
            >
              <div className={cn('flex h-8 w-8 items-center justify-center rounded-md border text-sm font-semibold uppercase', tokens.accountBadge)}>
                B
              </div>
              <ChevronDownIcon className="h-4 w-4" />
            </button>
            {renderThemeToggle()}
          </div>
        </nav>
      </div>

      <div
        className={cn(
          'pointer-events-auto flex w-full items-center justify-between px-5 pb-4 pt-[calc(env(safe-area-inset-top,0px)+1.25rem)] lg:hidden transition-all duration-300 ease-out',
          mobileTopClass,
        )}
      >
        <Image src="/NextNavbar.svg" alt="Nextflix" width={92} height={24} loading="lazy" />
        <div className={cn('flex items-center gap-4 transition-colors', mode === 'dark' ? 'text-white/80' : 'text-[#223666]')}>
          <button
            type="button"
            aria-label="Categories"
            aria-controls="mobile-nav-drawer"
            aria-expanded={mobileOpen}
            onClick={toggleMobile}
            className={iconButtonClass(mode)}
          >
            <BarsIcon className="h-6 w-6" />
          </button>
          {renderThemeToggle()}
        </div>
      </div>

      <div
        className={cn(
          'pointer-events-auto flex items-center justify-between px-5 pb-4 text-sm font-medium transition-all duration-300 ease-out lg:hidden',
          tokens.mobileSub,
        )}
      >
        <ul className="flex w-full items-center justify-around">
          {MOBILE_SUB_ITEMS.map((item) => (
            <li key={item}>
              <MobileNavLink label={item} theme={mode} />
            </li>
          ))}
        </ul>
      </div>

      <MobileDrawer open={mobileOpen} theme={mode} navItems={NAV_ITEMS} onClose={closeMobile} renderThemeToggle={renderThemeToggle} />
    </header>
  );
};
