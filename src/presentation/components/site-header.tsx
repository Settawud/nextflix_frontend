'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState, type SVGProps } from 'react';
import { useTheme } from 'next-themes';

const desktopNavItems = [
  { label: 'Home', isActive: true },
  { label: 'TV Shows' },
  { label: 'Movies' },
  { label: 'New & Popular' },
  { label: 'My List' },
  { label: 'Browse by Languages' },
];

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

const Bars3BottomLeftIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
    <path d="M3 7h18" />
    <path d="M3 12h12" />
    <path d="M3 17h6" />
  </svg>
);

const XMarkIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const SiteHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();

  const closeMobileNav = useCallback(() => {
    setIsMobileNavOpen(false);
  }, []);

  const toggleMobileNav = useCallback(() => {
    setIsMobileNavOpen((open) => !open);
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isMobileNavOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMobileNav();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobileNavOpen, closeMobileNav]);

  useEffect(() => {
    if (!isMobileNavOpen) {
      return;
    }
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMobileNavOpen]);

  const currentTheme = (resolvedTheme ?? theme ?? 'dark') as 'light' | 'dark';

  const desktopLightDefault =
    'bg-gradient-to-b from-[#d8dde9]/95 via-[#a8b4d0]/50 to-transparent text-[#1a2750]';
  const desktopLightScrolled =
    'bg-white/92 text-[#152040] shadow-[0_6px_16px_rgba(21,32,64,0.18)] backdrop-blur-md';
  const desktopDarkDefault = 'bg-black text-white';
  const desktopDarkScrolled =
    'bg-black text-white shadow-[0_6px_20px_rgba(0,0,0,0.35)]';

  const desktopClasses = currentTheme === 'dark'
    ? (isScrolled ? desktopDarkScrolled : desktopDarkDefault)
    : (isScrolled ? desktopLightScrolled : desktopLightDefault);

  const mobileTopClasses = currentTheme === 'dark'
    ? (isScrolled
      ? 'bg-black text-white shadow-[0_6px_18px_rgba(0,0,0,0.3)]'
      : 'bg-black text-white')
    : (isScrolled
      ? 'bg-white/92 text-[#152040] shadow-[0_6px_14px_rgba(21,32,64,0.18)] backdrop-blur-md'
      : 'bg-gradient-to-b from-[#d8dde9]/95 via-[#a8b4d0]/50 to-transparent text-[#1a2750]');

  const mobileSubClasses = currentTheme === 'dark'
    ? 'bg-black text-white'
    : 'bg-[#e9edf6] text-[#1b2d5a]';

  const mobileNavButtonClass = currentTheme === 'dark'
    ? 'flex items-center gap-1 text-lg font-medium transition hover:text-white focus:outline-none focus-visible:text-white'
    : 'flex items-center gap-1 text-lg font-medium transition hover:text-[#102046] focus:outline-none focus-visible:text-[#102046]';

  const toggleTheme = () => {
    if (!mounted) return;
    setAnimating(true);
    setTimeout(() => setAnimating(false), 500);
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  // ปุ่ม Toggle Theme ที่ใช้ซ้ำทั้ง Desktop/Mobile ให้ “สอดคล้องกัน”
  const ThemeButton = () => (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      aria-pressed={currentTheme === 'dark'}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full
                 border border-slate-300 bg-white text-[#0f1d3a]
                 transition-all duration-300 hover:scale-105 hover:border-slate-500 hover:bg-white/90
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400
                 dark:border-white/30 dark:bg-white/10 dark:text-white dark:hover:border-white/60 dark:hover:bg-white/20
                 shadow-sm dark:shadow-[0_0_10px_rgba(255,255,255,0.18)]"
    >
      {/* วงแหวน pulse เบา ๆ ตอนสลับ */}
      {animating && (
        <span className="absolute inset-0 rounded-full border border-slate-300/50 dark:border-white/20 animate-ping" />
      )}

      {/* กัน hydration mismatch */}
      {!mounted ? null : (
        <span
          className={`relative block text-lg transition-transform duration-500 ${animating ? 'motion-safe:animate-spin' : ''}`}
        >
          {/* แสดง “สถานะปัจจุบัน”: dark = 🌙, light = ☀️ */}
          <span
            className={`absolute inset-0 grid place-items-center transition-all duration-500 transform
                       ${currentTheme === 'dark'
                         ? 'opacity-100 rotate-0 scale-100'
                         : 'opacity-0 -rotate-90 scale-0'}`}
          >
            🌙
          </span>
          <span
            className={`absolute inset-0 grid place-items-center transition-all duration-500 transform
                       ${currentTheme === 'dark'
                         ? 'opacity-0 rotate-90 scale-0'
                         : 'opacity-100 rotate-0 scale-100'}`}
          >
            ☀️
          </span>
          {/* ทำให้ขนาดปุ่มคงที่ */}
          <span className="invisible">☀️</span>
        </span>
      )}
    </button>
  );

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-30 flex flex-col">
      {/* Desktop */}
      <div
        className={`pointer-events-auto hidden h-[102px] w-full lg:flex transition-all duration-300 ease-out ${desktopClasses}`}
      >
        <nav className="mx-auto flex h-full w-full max-w-[2560px] items-center justify-between gap-8 px-6 sm:px-10 lg:px-16 xl:px-[90px]">
          <div className="flex items-center gap-12">
            <Image src="/NextNavbar.svg" alt="Nextflix" width={139} height={39} priority />
            <ul
              className={`flex items-center gap-7 transition-colors ${
                currentTheme === 'dark'
                  ? 'text-white'
                  : 'text-[#2c3f75]'
              }`}
            >
              {desktopNavItems.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    className={`relative text-[20px] leading-[28px] tracking-[-0.02em] transition-colors duration-200 focus:outline-none ${
                      currentTheme === 'dark'
                        ? item.isActive
                          ? "font-semibold text-white focus-visible:text-white after:absolute after:-bottom-[6px] after:left-0 after:h-[2px] after:w-full after:bg-white after:content-['']"
                          : 'font-medium text-white/80 hover:text-white focus-visible:text-white'
                        : item.isActive
                          ? "font-semibold text-[#102046] focus-visible:text-[#102046] after:absolute after:-bottom-[6px] after:left-0 after:h-[2px] after:w-full after:bg-[#102046] after:content-['']"
                          : 'font-medium text-[#3a4f82] hover:text-[#102046] focus-visible:text-[#102046]'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div
            className={`flex items-center gap-7 transition-colors ${
              currentTheme === 'dark' ? 'text-white/90' : 'text-[#2f437a]'
            }`}
          >
            <button
              type="button"
              aria-label="Search"
              className={`transition focus:outline-none ${
                currentTheme === 'dark'
                  ? 'hover:text-white focus-visible:text-white'
                  : 'hover:text-[#101e42] focus-visible:text-[#101e42]'
              }`}
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
            <button
              type="button"
              className={`text-[20px] font-medium tracking-[-0.02em] transition focus:outline-none ${
                currentTheme === 'dark'
                  ? 'hover:text-white focus-visible:text-white'
                  : 'hover:text-[#101e42] focus-visible:text-[#101e42]'
              }`}
            >
              Kids
            </button>
            <button
              type="button"
              aria-label="Notifications"
              className={`transition focus:outline-none ${
                currentTheme === 'dark'
                  ? 'hover:text-white focus-visible:text-white'
                  : 'hover:text-[#101e42] focus-visible:text-[#101e42]'
              }`}
            >
              <BellIcon className="h-6 w-6" />
            </button>
            
            <button
              type="button"
              aria-label="Account"
              className={`flex items-center gap-2 transition focus:outline-none ${
                currentTheme === 'dark'
                  ? 'text-white hover:text-white focus-visible:text-white'
                  : 'text-[#102046] hover:text-[#0a182f] focus-visible:text-[#0a182f]'
              }`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-md border text-sm font-semibold uppercase ${
                  currentTheme === 'dark'
                    ? 'border-white/30 bg-white/10 text-white'
                    : 'border-[#c2cadf] bg-white/80 text-[#102046]'
                }`}
              >
                B
              </div>
              <ChevronDownIcon className="h-4 w-4" />
            </button>

            {/* Theme toggle (Desktop) */}
            <ThemeButton />
            
          </div>
        </nav>
      </div>

      {/* Mobile Top Bar */}
      <div
        className={`pointer-events-auto flex w-full items-center justify-between px-5 pb-4 pt-[calc(env(safe-area-inset-top,0px)+1.25rem)] lg:hidden transition-all duration-300 ease-out ${mobileTopClasses}`}
      >
        <Image src="/NextNavbar.svg" alt="Nextflix" width={92} height={24} priority />
        <div
          className={`flex items-center gap-4 transition-colors ${
            currentTheme === 'dark'
              ? 'text-white/80'
              : 'text-[#223666]'
          }`}
        >
          <button
            type="button"
            aria-label="Categories"
            aria-controls="mobile-nav-drawer"
            aria-expanded={isMobileNavOpen}
            onClick={toggleMobileNav}
            className={`transition focus:outline-none ${
              currentTheme === 'dark'
                ? 'hover:text-white focus-visible:text-white'
                : 'hover:text-[#102046] focus-visible:text-[#102046]'
            }`}
          >
            <Bars3BottomLeftIcon className="h-6 w-6" />
          </button>

          {/* Theme toggle (Mobile) — ใช้คอมโพเนนต์เดียวกันเพื่อความสอดคล้อง */}
          <ThemeButton />
        </div>
      </div>

      {/* Mobile Subnav */}
      <div className={`pointer-events-auto flex items-center justify-between px-5 pb-4 text-sm font-medium transition-all duration-300 ease-out lg:hidden ${mobileSubClasses}`}>
        <ul className="flex w-full items-center justify-around">
          <li>
            <button
              type="button"
              className={mobileNavButtonClass}
            >
              TV Shows
            </button>
          </li>
          <li>
            <button
              type="button"
              className={mobileNavButtonClass}
            >
              Movies
            </button>
          </li>
          <li>
            <button
              type="button"
              className={mobileNavButtonClass}
            >
              Categories
              <span className="text-xs">▾</span>
            </button>
          </li>
        </ul>
      </div>

      {isMobileNavOpen ? (
        <div className="pointer-events-auto lg:hidden">
          <div
            className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm transition-opacity dark:bg-black/70"
            onClick={closeMobileNav}
          />
          <aside
            id="mobile-nav-drawer"
            className={`fixed inset-y-0 left-0 z-50 flex w-[82%] max-w-xs flex-col shadow-2xl backdrop-blur-md transition-[transform,opacity] duration-300 ease-out ${
              currentTheme === 'dark'
                ? 'bg-black/95 text-white'
                : 'bg-white/95 text-[#1c2f5a]'
            }`}
          >
            <div className="flex items-center justify-between px-5 pb-4 pt-6">
              <Image src="/NextNavbar.svg" alt="Nextflix" width={96} height={28} priority />
              <button
                type="button"
                aria-label="Close menu"
                onClick={closeMobileNav}
                className={`rounded-full p-2 transition focus:outline-none focus-visible:ring-2 ${
                  currentTheme === 'dark'
                    ? 'hover:text-white focus-visible:ring-white/60'
                    : 'hover:text-[#101e3c] focus-visible:ring-[#a2b0d6]'
                }`}
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-5 pb-6">
              <ul className="space-y-2">
                {desktopNavItems.map((item) => (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={closeMobileNav}
                      className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-base font-medium transition-colors focus:outline-none focus-visible:ring-2 ${
                        currentTheme === 'dark'
                          ? item.isActive
                            ? 'bg-white/10 text-white focus-visible:ring-white/40'
                            : 'text-white/80 hover:bg-white/5 focus-visible:ring-white/30'
                          : item.isActive
                            ? 'bg-[#102046] text-white focus-visible:ring-[#102046]/50'
                            : 'text-[#223666] hover:bg-[#e3e9f7] focus-visible:ring-[#b8c5ea]'
                      }`}
                    >
                      <span>{item.label}</span>
                      {item.isActive ? (
                        <span
                          className={`text-xs uppercase tracking-[0.22em] ${
                            currentTheme === 'dark' ? 'text-white/70' : 'text-[#c9d4f0]'
                          }`}
                        >
                          Now
                        </span>
                      ) : null}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <div
              className={`flex items-center justify-between gap-3 px-5 pb-6 ${
                currentTheme === 'dark'
                  ? 'text-white/80'
                  : 'text-[#253a6e]'
              }`}
            >
              <div className="text-sm font-medium uppercase tracking-[0.1em]">
                Theme
              </div>
              <ThemeButton />
            </div>
          </aside>
        </div>
      ) : null}
    </header>
  );
};
