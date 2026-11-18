import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, ChevronRight } from 'lucide-react';
import {
  FREE_FIRE_LOGO_PATH,
  HERO_BACKDROP_PATH,
  TEAM_LOGO_PATH,
} from '../data/roster';
import { ParticleField } from './ParticleField';
import { playTacticalClick } from '../utils/sound';

export function HeroSection() {
  const [logoError, setLogoError] = useState(false);
  const [backdropError, setBackdropError] = useState(false);
  const [ffError, setFfError] = useState(false);

  return (
    <section
      id="top"
      className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden border-b border-zinc-800/80 bg-[#060608]"
    >
      {/* Animated Atmospheric Backdrop */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        {!backdropError ? (
          <img
            src={HERO_BACKDROP_PATH}
            alt=""
            referrerPolicy="no-referrer"
            onError={() => setBackdropError(true)}
            className="h-full w-full object-cover object-center opacity-40 scale-105"
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_50%_20%,rgba(153,27,27,0.22),transparent_60%)]" />
        )}

        {/* Tactical Grid & Contrast Scrims */}
        <div className="absolute inset-0 bg-tactical-grid opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060608]/88 via-[#060608]/68 to-[#060608]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060608]/92 via-transparent to-[#060608]/88" />

        {/* GPU-Friendly Shifting Ambient Crimson & Platinum Lighting */}
        <div className="animate-ambient-drift absolute -top-24 left-[12%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(185,28,28,0.28)_0%,transparent_70%)]" />
        <div className="animate-ambient-drift absolute bottom-0 right-[8%] h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(148,163,184,0.14)_0%,transparent_70%)]" />

        {/* Slow Vertical HUD Scanning Line */}
        <div className="animate-hud-scan absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-600/45 to-transparent" />
      </div>

      {/* Lightweight Drifting Embers */}
      <ParticleField />

      {/* Main Hero Grid */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-5 sm:px-8 pt-10 pb-8 md:py-16 lg:py-20 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Brand Authority, Block Slogan & Gradient Typography */}
          <div className="lg:col-span-7 flex flex-col items-start text-left order-2 lg:order-1">
            {/* Clean Unboxed Regional & Org Metadata */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-2.5 text-xs font-semibold tracking-[0.22em] uppercase text-zinc-300 mb-3"
            >
              <span className="text-red-500">Tripura, India</span>
              <span aria-hidden="true" className="text-zinc-600">
                ·
              </span>
              <span className="text-gradient-platinum">Competitive Esports Organization</span>
            </motion.div>

            {/* Heavy Block-Letter Regional Claim */}
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-extrabold uppercase tracking-[0.22em] text-sm sm:text-base text-gradient-crimson-silver mb-2"
            >
              TRIPURA&apos;S BEST TEAM
            </motion.p>

            {/* Primary Organization Wordmark */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-extrabold uppercase tracking-[0.04em] leading-[0.92] text-5xl sm:text-7xl lg:text-8xl text-balance"
            >
              <span className="text-gradient-hero animate-gradient-text block">
                TIPRA ELITES
              </span>
            </motion.h1>

            {/* Main Slogan with Selective Faded Gradient */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 font-display font-bold uppercase tracking-[0.12em] text-xl sm:text-3xl text-zinc-200 text-balance"
            >
              BUILT IN <span className="text-gradient-platinum">TRIPURA.</span>{' '}
              <span className="text-gradient-crimson-silver">BORN TO DOMINATE.</span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-zinc-300"
            >
              An elite four-player competitive Free Fire squad representing Tripura with
              disciplined execution, synchronized entry power, and sharp IGL command on
              the battleground.
            </motion.p>

            {/* Primary & Secondary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <a
                href="#community"
                onClick={() => playTacticalClick()}
                className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-7 py-3 rounded bg-gradient-to-r from-red-800 via-red-700 to-red-800 hover:from-red-700 hover:to-red-600 active:scale-[0.98] text-sm font-semibold uppercase tracking-[0.14em] text-white border border-red-500/50 shadow-[0_0_28px_rgba(185,28,28,0.38)] transition-all duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
              >
                <span>Join Our Community</span>
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="#roster"
                onClick={() => playTacticalClick()}
                className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-7 py-3 rounded bg-zinc-900/90 hover:bg-zinc-800 active:scale-[0.98] text-sm font-semibold uppercase tracking-[0.14em] text-zinc-100 border border-zinc-700/80 hover:border-zinc-500 transition-all duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-300"
              >
                <span>Meet Our Roster</span>
                <ArrowDownRight className="w-4 h-4 text-red-500" aria-hidden="true" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Cinematic Hero Logo Reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center order-1 lg:order-2"
          >
            <div className="animate-crest-float group relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[380px] lg:h-[380px] p-3 sm:p-4 rounded-xl bg-gradient-to-b from-[#111116] to-[#08080B] border border-zinc-700/70 shadow-[0_28px_80px_rgba(0,0,0,0.88)]">
              {/* Ambient Crimson Glow Behind Crest */}
              <div
                className="pointer-events-none absolute -inset-5 rounded-2xl bg-[radial-gradient(circle,rgba(185,28,28,0.28)_0%,transparent_72%)] -z-10"
                aria-hidden="true"
              />

              {/* Metallic Corner Brackets */}
              <span className="pointer-events-none absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-zinc-300/80 rounded-tl-md transition-all duration-300 group-hover:w-8 group-hover:h-8" />
              <span className="pointer-events-none absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-red-600/90 rounded-tr-md transition-all duration-300 group-hover:w-8 group-hover:h-8" />
              <span className="pointer-events-none absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-red-600/90 rounded-bl-md transition-all duration-300 group-hover:w-8 group-hover:h-8" />
              <span className="pointer-events-none absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-zinc-300/80 rounded-br-md transition-all duration-300 group-hover:w-8 group-hover:h-8" />

              {/* Cinematic Sheen Sweep on Crest */}
              <div className="relative w-full h-full overflow-hidden rounded-lg bg-[#080808] flex items-center justify-center">
                {!logoError ? (
                  <img
                    src={TEAM_LOGO_PATH}
                    alt="Official TIPRA ELITES Esports Team Crest"
                    referrerPolicy="no-referrer"
                    onError={() => setLogoError(true)}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-6">
                    <span className="font-display text-4xl font-bold tracking-widest text-zinc-100">
                      TE
                    </span>
                    <span className="mt-1 text-xs uppercase tracking-[0.25em] text-zinc-400">
                      TIPRA ELITES
                    </span>
                  </div>
                )}

                <motion.div
                  initial={{ x: '-120%' }}
                  animate={{ x: '220%' }}
                  transition={{ duration: 1.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12"
                  aria-hidden="true"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Hero Competitive Title Strip — Free Fire India Branding (Subordinate to Team Logo) */}
      <div className="relative z-20 border-t border-zinc-800/80 bg-[#0A0A0E]/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-xs uppercase tracking-[0.18em] text-zinc-400 whitespace-nowrap">
              Competitive Title
            </span>
            <span className="h-4 w-px bg-zinc-800" aria-hidden="true" />
            <div className="flex items-center gap-2.5">
              {!ffError ? (
                <img
                  src={FREE_FIRE_LOGO_PATH}
                  alt="Free Fire official game wordmark"
                  referrerPolicy="no-referrer"
                  onError={() => setFfError(true)}
                  className="h-5 w-auto object-contain opacity-95"
                />
              ) : (
                <span className="font-display text-sm font-bold tracking-wider uppercase text-zinc-200">
                  FREE FIRE
                </span>
              )}
              <span className="font-display text-sm sm:text-base font-bold tracking-[0.2em] uppercase text-gradient-crimson-silver">
                INDIA
              </span>
            </div>
          </div>

          <p className="text-xs text-zinc-400">
            Independent competitive squad · Four active players · Tripura origin
          </p>
        </div>
      </div>
    </section>
  );
}
