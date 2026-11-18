import { motion } from 'motion/react';
import { Award, Compass, Flag } from 'lucide-react';

const ROADMAP_STEPS = [
  {
    icon: Flag,
    step: 'Stage 01',
    title: 'Roster Locked',
    detail:
      'Four-player core finalized with defined entry, trade, and sniper-IGL leadership roles.',
  },
  {
    icon: Compass,
    step: 'Stage 02',
    title: 'Competitive Scrimmage',
    detail:
      'Consistent custom-room scrims and synergy refinement across tournament map rotations.',
  },
  {
    icon: Award,
    step: 'Stage 03',
    title: 'Championship Vault Ready',
    detail:
      'Official tournament placements and honors will be chronicled here as our competitive campaign unfolds.',
  },
];

export function JourneySection() {
  return (
    <section id="journey" className="relative py-20 sm:py-24 bg-[#060608]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl bg-gradient-to-b from-[#0F0F15] to-[#08080B] border border-zinc-800/90 p-7 sm:p-12"
        >
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-500">
              Tournament Archive & Honors
            </p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-extrabold uppercase tracking-wide text-balance">
              <span className="text-gradient-platinum">OUR JOURNEY IS</span>{' '}
              <span className="text-gradient-crimson-silver">JUST BEGINNING</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400">
              We believe in earned credibility over inflated claims. No fabricated trophies
              or synthetic rankings—this chronicle awaits our official tournament milestones in
              Free Fire India.
            </p>
          </div>

          <div className="mt-10 pt-8 border-t border-zinc-800/80 grid grid-cols-1 md:grid-cols-3 gap-6">
            {ROADMAP_STEPS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 'some' }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  className="p-5 rounded-xl bg-[#09090D] border border-zinc-800/90 hover:border-red-800/60 transition-colors"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-red-500">
                      {item.step}
                    </span>
                    <Icon className="w-4 h-4 text-zinc-300" aria-hidden="true" />
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold uppercase tracking-wide text-gradient-platinum">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.detail}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
