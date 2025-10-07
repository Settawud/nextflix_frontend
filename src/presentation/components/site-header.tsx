'use client';

import Image from 'next/image';
import { useEffect, useState, type SVGProps } from 'react';

import { env } from '@config/environment';

const desktopNavItems = [
  { label: 'Home', isActive: true },
  { label: 'TV Shows' },
  { label: 'Movies' },
  { label: 'New & Popular' },
  { label: 'My List' },
  { label: 'Browse by Languages' },
];

const mobileNavItems = [
  { label: 'TV Shows' },
  { label: 'Movies' },
  { label: 'Categories', hasCaret: true },
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

export const SiteHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const desktopClasses = isScrolled
    ? 'bg-black/90 backdrop-blur-md shadow-[0_6px_20px_rgba(0,0,0,0.35)]'
    : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent';

  const mobileTopClasses = isScrolled
    ? 'bg-black/90 backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.3)]'
    : 'bg-gradient-to-b from-black via-black/60 to-transparent';

  const mobileSubClasses = isScrolled
    ? 'bg-black/80 backdrop-blur-md'
    : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent';

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-30 flex flex-col">
      <div
        className={`pointer-events-auto hidden h-[102px] w-full text-white lg:flex transition-all duration-300 ease-out ${desktopClasses}`}
      >
        <nav className="mx-auto flex h-full w-full max-w-[2560px] items-center justify-between gap-8 px-6 sm:px-10 lg:px-16 xl:px-[90px]">
          <div className="flex items-center gap-12">
            <Image src="/NextNavbar.svg" alt="Nextflix" width={139} height={39} priority />
            <ul className="flex items-center gap-7">
              {desktopNavItems.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    className={`relative text-[20px] leading-[28px] tracking-[-0.02em] transition focus:outline-none focus-visible:text-white ${
                      item.isActive
                        ? "font-semibold text-white after:absolute after:-bottom-[6px] after:left-0 after:h-[2px] after:w-full after:bg-white after:content-['']"
                        : 'font-medium text-slate-200 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-7 text-white">
            <a
              href={env.apiDocsUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[20px] font-medium tracking-[-0.02em] transition hover:text-white focus:outline-none focus-visible:text-white"
            >
              API Docs
            </a>
            <button type="button" aria-label="Search" className="transition hover:text-white focus:outline-none focus-visible:text-white">
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
            <button type="button" className="text-[20px] font-medium tracking-[-0.02em] transition hover:text-white focus:outline-none focus-visible:text-white">
              Kids
            </button>
            <button type="button" aria-label="Notifications" className="transition hover:text-white focus:outline-none focus-visible:text-white">
              <BellIcon className="h-6 w-6" />
            </button>
            <button
              type="button"
              aria-label="Account"
              className="flex items-center gap-2 text-white transition hover:text-white focus:outline-none focus-visible:text-white"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-white/30 bg-white/10 text-sm font-semibold uppercase text-white">
                B
              </div>
              <ChevronDownIcon className="h-4 w-4" />
            </button>
          </div>
        </nav>
      </div>

      <div
        className={`pointer-events-auto flex w-full items-center justify-between px-5 pt-6 text-white lg:hidden transition-all duration-300 ease-out ${mobileTopClasses}`}
      >
        <Image src="/NextNavbar.svg" alt="Nextflix" width={92} height={24} priority />
        <div className="flex items-center gap-4 text-white/80">
          <a
            href={env.apiDocsUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-white/15 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            API Docs
          </a>
          <button
            type="button"
            aria-label="Categories"
            className="transition hover:text-white focus:outline-none focus-visible:text-white"
          >
            <Bars3BottomLeftIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div
        className={`pointer-events-auto flex items-center justify-between px-5 pb-4 text-sm font-medium text-slate-100 lg:hidden transition-all duration-300 ease-out ${mobileSubClasses}`}
      >
        <ul className="flex w-full items-center justify-around">
          {mobileNavItems.map((item) => (
            <li key={item.label}>
              <button
                type="button"
                className="flex items-center gap-1 text-lg font-medium transition hover:text-white focus:outline-none focus-visible:text-white"
              >
                {item.label}
                {item.hasCaret ? <span className="text-xs">▾</span> : null}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};
