import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { playTacticalClick } from '../utils/sound';

const NAV_ITEMS = [
  { label: 'Identity', href: '#identity' },
  { label: 'Roster', href: '#roster' },
  { label: 'Roles', href: '#roles' },
  { label: 'Origin', href: '#origin' },
  { label: 'Community', href: '#community' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = () => {
    playTacticalClick();
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-[#070709]/88 backdrop-blur-md">
      <div className="max-w-7xl mx-auto h-16 px-5 sm:px-8 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          onClick={() => playTacticalClick()}
          className="font-display text-2xl font-extrabold tracking-[0.14em] uppercase text-gradient-platinum hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500"
        >
          TIPRA ELITES
        </a>

        {/* Zone 2: Clean single-line text nav links */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Primary Navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => playTacticalClick()}
              className="relative py-1 text-sm font-medium tracking-wide text-zinc-400 hover:text-white transition-colors whitespace-nowrap shrink-0 after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-red-600 after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#community"
            onClick={() => playTacticalClick()}
            className="hidden sm:inline-flex items-center justify-center min-h-[40px] px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white bg-red-700 hover:bg-red-600 border border-red-500/40 rounded transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
          >
            Join Community
          </a>

          <button
            type="button"
            onClick={() => {
              playTacticalClick();
              setMobileOpen((prev) => !prev);
            }}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded border border-zinc-800 bg-zinc-900/70 text-zinc-200 hover:text-white hover:border-zinc-700 transition-colors focus-visible:outline-2 focus-visible:outline-red-500"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-[#09090C]/98 px-5 py-4">
          <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className="flex items-center min-h-[44px] px-3 text-base font-medium text-zinc-300 hover:text-white hover:bg-zinc-900/80 rounded transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#community"
              onClick={handleLinkClick}
              className="mt-2 flex items-center justify-center min-h-[46px] px-5 text-sm font-semibold uppercase tracking-[0.12em] text-white bg-red-700 hover:bg-red-600 rounded transition-colors"
            >
              Join Community
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
