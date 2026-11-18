import { useState } from 'react';
import { motion } from 'motion/react';
import { FREE_FIRE_LOGO_PATH, TEAM_LOGO_PATH } from '../data/roster';

const DOCTRINES = [
  {
    index: '01',
    title: 'Disciplined Entry Tempo',
    description:
      'Every compound push and close-quarters fight is executed on clear timing rather than reckless solo peeking.',
  },
  {
    index: '02',
    title: 'Synchronized Trade Structure',
    description:
      'Our three-rusher frontline operates in stacked waves so every point contact is backed by immediate follow-up pressure.',
  },
  {
    index: '03',
    title: 'Tactical IGL Over-Watch',
    description:
      'Long-range silenced precision and zone-rotation shot-calling keep TIPRA ELITES composed when endgame lobbies tighten.',
  },
];

export function IdentitySection() {
  const [ffError, setFfError] = useState(false);
  const [teamLogoError, setTeamLogoError] = useState(false);

  return (
    <section id="identity" className="relative py-20 sm:py-24 bg-[#060608] overflow-hidden">
      {/* Subtle Background Ambient Crimson Wash */}
      <div
        className="pointer-events-none absolute top-1/2 -left-32 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(153,27,27,0.14)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Narrative Column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-500">
              Our Identity
            </p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-wide text-balance leading-[0.98]">
              <span className="text-gradient-platinum">UNITED BY ORIGIN.</span>{' '}
              <span className="text-gradient-crimson-silver">FEARED BY COMPETITION.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-zinc-300 max-w-xl">
              TIPRA ELITES was forged in Tripura around a straightforward standard: respect
              your roots, master your role, and step into every lobby prepared to compete at
              the highest level of Free Fire India.
            </p>
            <p className="mt-4 font-display text-xl font-bold uppercase tracking-[0.16em] text-gradient-crimson-silver">
              NO SHORTCUTS. NO FEAR. ONLY ELITE PERFORMANCE.
            </p>

            {/* Free Fire India Competitive Alignment Box (Subordinate to Team Logo) */}
            <div className="mt-8 p-5 sm:p-6 rounded-xl bg-gradient-to-br from-[#0F0F14] to-[#09090C] border border-zinc-800/90">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-800/80">
                <div className="flex items-center gap-3">
                  {!teamLogoError && (
                    <img
                      src={TEAM_LOGO_PATH}
                      alt="TIPRA ELITES Crest"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={() => setTeamLogoError(true)}
                      className="w-11 h-11 rounded object-contain bg-black border border-zinc-800"
                    />
                  )}
                  <div>
                    <p className="font-display text-lg font-bold uppercase tracking-wider text-gradient-platinum">
                      TIPRA ELITES
                    </p>
                    <p className="text-xs text-zinc-400">Competitive Esports Division</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 pl-4 border-l border-zinc-800">
                  {!ffError ? (
                    <img
                      src={FREE_FIRE_LOGO_PATH}
                      alt="Free Fire official logo"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={() => setFfError(true)}
                      className="h-4 w-auto object-contain"
                    />
                  ) : (
                    <span className="font-display text-xs font-bold tracking-wider uppercase text-zinc-200">
                      FREE FIRE
                    </span>
                  )}
                  <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-gradient-crimson-silver">
                    INDIA
                  </span>
                </div>
              </div>

              <p className="mt-3.5 text-xs leading-relaxed text-zinc-400">
                TIPRA ELITES competes as an independent Free Fire India team. All Free Fire
                trademarks remain the property of their respective owners; TIPRA ELITES is
                not officially sponsored, affiliated with, or endorsed by Garena.
              </p>
            </div>
          </motion.div>

          {/* Right Editorial Doctrine Stack */}
          <div className="lg:col-span-6 space-y-4">
            {DOCTRINES.map((item, idx) => (
              <motion.div
                key={item.index}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 'some' }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative p-6 rounded-xl bg-gradient-to-br from-[#0E0E13] to-[#09090C] border border-zinc-800/90 hover:border-red-700/60 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-5">
                  <span className="font-mono text-sm font-bold tabular-nums text-gradient-crimson-silver pt-1">
                    {item.index}.
                  </span>
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wide text-gradient-platinum">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-zinc-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
