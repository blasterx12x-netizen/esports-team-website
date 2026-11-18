import { useState } from 'react';
import { motion } from 'motion/react';
import { Crosshair } from 'lucide-react';
import { COMBAT_PHASES, ROSTER_PLAYERS } from '../data/roster';
import { RoleInsignia } from './GeometricMotifs';
import { playTacticalClick } from '../utils/sound';

export function RolesMatrixSection() {
  const [activePhaseId, setActivePhaseId] = useState<string>(COMBAT_PHASES[0].id);

  const activePhase =
    COMBAT_PHASES.find((phase) => phase.id === activePhaseId) ?? COMBAT_PHASES[0];
  const matchedPlayer =
    ROSTER_PLAYERS.find((p) => p.ign === activePhase.leadIgn) ?? ROSTER_PLAYERS[0];

  return (
    <section id="roles" className="relative py-20 sm:py-24 bg-[#060608] overflow-hidden">
      <div
        className="pointer-events-none absolute -bottom-24 left-1/3 w-[480px] h-[360px] rounded-full bg-[radial-gradient(circle,rgba(153,27,27,0.12)_0%,transparent_72%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-500">
            Player Roles & Character Synergy
          </p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-extrabold uppercase tracking-wide text-balance">
            <span className="text-gradient-platinum">TACTICAL ENGAGEMENT</span>{' '}
            <span className="text-gradient-crimson-silver">ARCHITECTURE</span>
          </h2>
          <p className="mt-4 text-base text-zinc-400 leading-relaxed">
            Every engagement follows a clear division of responsibility across our four-player
            unit—combining Rafael&apos;s silenced over-watch with Oscar, Chrono, and Kassie
            assault waves.
          </p>
        </motion.div>

        {/* Interactive Phase Selector */}
        <div
          className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-2 p-1.5 rounded-xl bg-[#0D0D12] border border-zinc-800/90"
          role="tablist"
          aria-label="Combat Engagement Phases"
        >
          {COMBAT_PHASES.map((phase) => {
            const isSelected = phase.id === activePhase.id;
            return (
              <button
                key={phase.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => {
                  playTacticalClick();
                  setActivePhaseId(phase.id);
                }}
                className={`flex flex-col items-start text-left px-4 py-3.5 rounded-lg transition-all duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-red-500 ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#161116] to-[#0D0D12] text-white border border-red-700/70 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40 border border-transparent'
                }`}
              >
                <span className="font-mono text-[11px] font-semibold tabular-nums text-red-500">
                  Phase {phase.step}
                </span>
                <span className="mt-1 font-display text-base sm:text-lg font-bold uppercase tracking-wide whitespace-nowrap truncate w-full">
                  {phase.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Phase Detail Panel */}
        <motion.div
          key={activePhase.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 rounded-xl bg-gradient-to-br from-[#0E0E14] to-[#09090C] border border-zinc-800/90 p-6 sm:p-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300">
                <Crosshair className="w-4 h-4 text-red-500" aria-hidden="true" />
                <span className="text-gradient-crimson-silver">{activePhase.objective}</span>
              </div>

              <h3 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-wide text-gradient-platinum">
                {activePhase.title}
              </h3>

              <p className="mt-4 text-base sm:text-lg leading-relaxed text-zinc-300">
                {activePhase.execution}
              </p>
            </div>

            <div className="lg:col-span-5 p-6 rounded-xl bg-[#07070A] border border-zinc-800/90 flex flex-col justify-between gap-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-zinc-400">
                    Phase Anchor · {matchedPlayer.selectedCharacter}
                  </span>
                  <p className="mt-1 font-display text-3xl font-extrabold tracking-wide text-gradient-crimson-silver">
                    {matchedPlayer.ign}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-red-500">
                  <RoleInsignia roleId={matchedPlayer.id} className="w-6 h-6" />
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                <span className="uppercase tracking-[0.14em] text-zinc-400">
                  {activePhase.roleTitle}
                </span>
                <span className="font-mono font-semibold tabular-nums text-gradient-uid">
                  UID {matchedPlayer.uid}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
