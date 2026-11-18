import { useState } from 'react';
import { motion } from 'motion/react';
import { TRIPURA_HERITAGE_PATH } from '../data/roster';
import { TripuraWeaveBand } from './GeometricMotifs';

const ROOTS_PILLARS = [
  {
    num: '01',
    title: 'Unity',
    body: 'Four distinct strengths bound by shared trust, loyalty, and respect for where we come from.',
  },
  {
    num: '02',
    title: 'Discipline',
    body: 'Structured practice, calm communication under pressure, and constant refinement of fundamentals.',
  },
  {
    num: '03',
    title: 'Ambition',
    body: 'Putting Tripura on the competitive Free Fire India map through earned performance, match after match.',
  },
];

export function TripuraOriginSection() {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="origin" className="relative py-20 sm:py-24 bg-[#08080B] overflow-hidden">
      <TripuraWeaveBand className="mb-12 opacity-75" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Architectural Heritage Visual */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-zinc-700/70 bg-[#060608] min-h-[300px] lg:min-h-[460px]"
          >
            {!imgError ? (
              <img
                src={TRIPURA_HERITAGE_PATH}
                alt="Architectural stone and metallic geometric weave relief inspired by Tripura heritage"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="h-full w-full object-cover object-center"
              />
            ) : (
              <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(185,28,28,0.18),#060608)]" />
            )}

            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08080B] via-[#08080B]/30 to-transparent"
              aria-hidden="true"
            />

            <div className="absolute bottom-6 left-6 right-6 z-10">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-400">
                Tripura Heritage · Competitive Pride
              </p>
              <p className="mt-1.5 font-display text-2xl sm:text-4xl font-extrabold uppercase tracking-[0.14em] text-gradient-platinum">
                TRIPURA&apos;S BEST TEAM
              </p>
              <p className="mt-1 font-display text-base sm:text-lg font-semibold uppercase tracking-[0.14em] text-gradient-crimson-silver">
                OUR ROOTS DEFINE US. OUR GAME PROVES US.
              </p>
            </div>
          </motion.div>

          {/* Right Narrative Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-between"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-500">
                Our Origin — Tripura
              </p>

              <h2 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-wide text-balance">
                <span className="text-gradient-platinum">TIPRASA</span>{' '}
                <span className="text-gradient-crimson-silver">THANSA</span>
              </h2>

              <p className="mt-2 font-display text-lg sm:text-xl font-bold uppercase tracking-[0.16em] text-zinc-300">
                ONE TEAM. <span className="text-red-500">ONE DESTINY.</span>
              </p>

              <p className="mt-5 text-base sm:text-lg leading-relaxed text-zinc-300">
                Rooted in Tripura. United by passion. Driven by competition. TIPRA ELITES
                represents more than four players — it represents a team built on unity,
                discipline and ambition.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {ROOTS_PILLARS.map((pillar) => (
                <div key={pillar.num}>
                  <span className="font-mono text-xs font-bold tabular-nums text-gradient-crimson-silver">
                    {pillar.num}.
                  </span>
                  <h3 className="mt-1.5 font-display text-xl font-bold uppercase tracking-wide text-gradient-platinum">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{pillar.body}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <TripuraWeaveBand className="mt-14 opacity-60" />
    </section>
  );
}
