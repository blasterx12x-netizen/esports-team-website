import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Copy, Eye, Shield } from 'lucide-react';
import { ROSTER_PLAYERS, type PlayerProfile, type PlayerThemeTone } from '../data/roster';
import { RoleInsignia } from './GeometricMotifs';
import { playTacticalChime, playTacticalClick } from '../utils/sound';

interface RosterSectionProps {
  onSelectPlayer: (player: PlayerProfile) => void;
}

function getToneStyles(tone: PlayerThemeTone) {
  switch (tone) {
    case 'crimson':
      return {
        border: 'border-red-700/60 hover:border-red-500/90',
        glow: 'bg-[radial-gradient(circle_at_50%_40%,rgba(220,38,38,0.28),transparent_70%)]',
        nameGradient: 'text-gradient-crimson-silver',
        accentText: 'text-red-400',
        cornerPrimary: 'border-red-500',
        cornerSecondary: 'border-zinc-400/70',
        button:
          'bg-gradient-to-r from-red-800 to-red-700 hover:from-red-700 hover:to-red-600 border-red-500/50 text-white',
      };
    case 'blue-silver':
      return {
        border: 'border-sky-500/35 hover:border-sky-400/75',
        glow: 'bg-[radial-gradient(circle_at_50%_42%,rgba(56,189,248,0.22),transparent_70%)]',
        nameGradient: 'text-gradient-blue-silver',
        accentText: 'text-sky-300',
        cornerPrimary: 'border-sky-400/80',
        cornerSecondary: 'border-zinc-400/70',
        button:
          'bg-zinc-900 hover:bg-sky-950/80 border-sky-500/40 hover:border-sky-400/80 text-zinc-100',
      };
    case 'rose-silver':
      return {
        border: 'border-red-800/45 hover:border-red-500/75',
        glow: 'bg-[radial-gradient(circle_at_50%_42%,rgba(225,29,72,0.22),transparent_70%)]',
        nameGradient: 'text-gradient-crimson-silver',
        accentText: 'text-rose-300',
        cornerPrimary: 'border-red-500/80',
        cornerSecondary: 'border-zinc-400/70',
        button:
          'bg-zinc-900 hover:bg-red-950/80 border-red-700/50 hover:border-red-500/80 text-zinc-100',
      };
    case 'sniper-silver':
      return {
        border: 'border-zinc-500/50 hover:border-red-500/80',
        glow: 'bg-[radial-gradient(circle_at_50%_42%,rgba(203,213,225,0.18),rgba(185,28,28,0.14)_45%,transparent_72%)]',
        nameGradient: 'text-gradient-platinum',
        accentText: 'text-zinc-200',
        cornerPrimary: 'border-zinc-200/85',
        cornerSecondary: 'border-red-600/80',
        button:
          'bg-gradient-to-r from-zinc-800 to-zinc-900 hover:from-red-900/80 hover:to-zinc-900 border-zinc-500/50 hover:border-red-500/70 text-white',
      };
  }
}

function CharacterAuraDecoration({ tone }: { tone: PlayerThemeTone }) {
  if (tone === 'blue-silver') {
    return (
      <svg
        viewBox="0 0 220 220"
        fill="none"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 text-sky-400/20"
        aria-hidden="true"
      >
        <polygon points="110,12 195,61 195,159 110,208 25,159 25,61" stroke="currentColor" strokeWidth="1" />
        <polygon points="110,32 178,71 178,149 110,188 42,149 42,71" stroke="currentColor" strokeDasharray="5 5" strokeWidth="1" />
      </svg>
    );
  }
  if (tone === 'sniper-silver') {
    return (
      <svg
        viewBox="0 0 220 220"
        fill="none"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 text-zinc-300/20"
        aria-hidden="true"
      >
        <circle cx="110" cy="110" r="82" stroke="currentColor" strokeWidth="1" />
        <circle cx="110" cy="110" r="54" stroke="#DC2626" strokeOpacity="0.35" strokeDasharray="4 6" strokeWidth="1" />
        <path d="M110 10V50M110 170V210M10 110H50M170 110H210" stroke="currentColor" strokeWidth="1" />
      </svg>
    );
  }
  if (tone === 'rose-silver') {
    return (
      <svg
        viewBox="0 0 220 220"
        fill="none"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 text-rose-400/20"
        aria-hidden="true"
      >
        <circle cx="110" cy="110" r="76" stroke="currentColor" strokeDasharray="6 6" strokeWidth="1" />
        <path d="M40 110H82L96 86L114 134L128 110H180" stroke="#F43F5E" strokeOpacity="0.45" strokeWidth="1.4" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 text-red-500/25"
      aria-hidden="true"
    >
      <path d="M35 190L120 30L205 190" stroke="currentColor" strokeWidth="1.2" />
      <path d="M60 190L120 75L180 190" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1" />
    </svg>
  );
}

export function RosterSection({ onSelectPlayer }: RosterSectionProps) {
  const [copiedUid, setCopiedUid] = useState<string | null>(null);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  const leadPlayer = ROSTER_PLAYERS[0];
  const squadCore = ROSTER_PLAYERS.slice(1);

  const handleCopyUid = async (e: React.MouseEvent, uid: string) => {
    e.stopPropagation();
    playTacticalClick();
    try {
      await navigator.clipboard.writeText(uid);
      setCopiedUid(uid);
      setTimeout(() => setCopiedUid((prev) => (prev === uid ? null : prev)), 1800);
    } catch {
      // Ignore if clipboard unavailable
    }
  };

  const handleOpenProfile = (player: PlayerProfile) => {
    playTacticalChime();
    onSelectPlayer(player);
  };

  const markBroken = (id: string) => {
    setBrokenImages((prev) => ({ ...prev, [id]: true }));
  };

  const leadTone = getToneStyles(leadPlayer.themeTone);

  return (
    <section id="roster" className="relative py-20 sm:py-28 bg-[#08080B] overflow-hidden">
      {/* Subtle Ambient Background Gradient */}
      <div
        className="pointer-events-none absolute top-12 right-0 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(185,28,28,0.12)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-zinc-800/80"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-500">
              Official Starting Four · Character Loadouts
            </p>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-wide text-balance">
              <span className="text-gradient-platinum">OUR ELITE</span>{' '}
              <span className="text-gradient-crimson-silver">ROSTER</span>
            </h2>
          </div>

          <div className="flex flex-col sm:items-end gap-1.5">
            <p className="font-display text-lg sm:text-xl font-bold uppercase tracking-[0.16em] text-gradient-crimson-silver">
              FOUR PLAYERS. ONE PURPOSE. ZERO LIMITS.
            </p>
            <p className="text-xs sm:text-sm text-zinc-400">
              Official in-game character choices displayed alongside each athlete&apos;s competitive role
            </p>
          </div>
        </motion.div>

        {/* PLAYER 01 — ASTONXATO (LEAD VANGUARD SPOTLIGHT) */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => handleOpenProfile(leadPlayer)}
          className={`group relative mt-14 rounded-2xl bg-gradient-to-br from-[#130D10] via-[#0D0D12] to-[#08080B] border ${leadTone.border} shadow-[0_24px_80px_rgba(153,27,27,0.18)] transition-all duration-300 hover:-translate-y-1.5 cursor-pointer`}
        >
          {/* Animated Border Gleam (clipped cleanly inside inner layer) */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl" aria-hidden="true">
            <div className="animate-border-gleam absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-red-400/15 to-transparent" />
            <div className={`absolute inset-0 ${leadTone.glow}`} />
          </div>

          {/* Animated Metallic Corner Highlights */}
          <span className={`pointer-events-none absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 rounded-tl-xl transition-all duration-300 group-hover:w-9 group-hover:h-9 ${leadTone.cornerPrimary} z-20`} />
          <span className={`pointer-events-none absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 rounded-tr-xl transition-all duration-300 group-hover:w-9 group-hover:h-9 ${leadTone.cornerSecondary} z-20`} />
          <span className={`pointer-events-none absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 rounded-bl-xl transition-all duration-300 group-hover:w-9 group-hover:h-9 ${leadTone.cornerSecondary} z-20`} />
          <span className={`pointer-events-none absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 rounded-br-xl transition-all duration-300 group-hover:w-9 group-hover:h-9 ${leadTone.cornerPrimary} z-20`} />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Character Stage (Oscar overlaps slightly upward for poster depth) */}
            <div className="lg:col-span-5 relative flex flex-col justify-end min-h-[340px] sm:min-h-[390px] lg:min-h-[440px] px-4 pt-4">
              <CharacterAuraDecoration tone={leadPlayer.themeTone} />

              <div className="absolute top-5 left-6 z-20 flex items-center gap-2.5">
                <span className="font-mono text-xs font-bold tabular-nums tracking-[0.22em] text-red-400">
                  PLAYER {leadPlayer.order}
                </span>
                <span className="h-px w-8 bg-red-600/70" aria-hidden="true" />
              </div>

              <div className="absolute top-5 right-6 z-20 text-right">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                  In-Game Character
                </span>
                <span className="font-display text-lg font-bold uppercase tracking-[0.14em] text-gradient-crimson-silver">
                  {leadPlayer.selectedCharacter}
                </span>
              </div>

              {/* Official Oscar Character Render */}
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 'some' }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex justify-center items-end -mt-8 lg:-mt-12 h-[330px] sm:h-[380px] lg:h-[440px]"
              >
                {!brokenImages[leadPlayer.id] ? (
                  <img
                    src={leadPlayer.characterImage}
                    alt={`${leadPlayer.selectedCharacter} official Free Fire character artwork for ${leadPlayer.ign}`}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={() => markBroken(leadPlayer.id)}
                    className="h-full w-auto max-w-full object-contain object-bottom drop-shadow-[0_18px_36px_rgba(185,28,28,0.38)] transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-1"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <RoleInsignia roleId={leadPlayer.id} className="w-16 h-16 text-red-500" />
                    <span className="mt-3 font-display text-xl uppercase tracking-widest text-zinc-300">
                      {leadPlayer.selectedCharacter}
                    </span>
                  </div>
                )}

                {/* Bottom Fade Mask into Dark Card Floor */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0D0D12] to-transparent"
                  aria-hidden="true"
                />
              </motion.div>
            </div>

            {/* Lead Player Info & Skill Breakdown */}
            <div className="lg:col-span-7 p-6 sm:p-9 lg:p-11 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em]">
                  <RoleInsignia roleId={leadPlayer.id} className="w-4 h-4 text-red-500" />
                  <span className="text-gradient-crimson-silver">{leadPlayer.role}</span>
                  <span className="text-zinc-600" aria-hidden="true">
                    ·
                  </span>
                  <span className="text-zinc-300">Lead Vanguard</span>
                </div>

                <h3 className="mt-2 font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-wide leading-none">
                  <span className={leadTone.nameGradient}>{leadPlayer.ign}</span>
                </h3>

                <p className="mt-4 text-base leading-relaxed text-zinc-300 max-w-2xl">
                  {leadPlayer.tacticalSummary}
                </p>

                {/* Character Skill Glass Panel */}
                <div className="mt-6 p-4 sm:p-5 rounded-xl bg-[#09090D]/90 border border-red-800/40 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#140B0E] border border-red-700/50 flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                      src={leadPlayer.skillIcon}
                      alt={`${leadPlayer.skillName} official skill icon`}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.16em]">
                      <span className="text-zinc-400">Active Skill</span>
                      <span className="text-zinc-600" aria-hidden="true">
                        ·
                      </span>
                      <span className="font-bold text-red-400">{leadPlayer.skillName}</span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-300">
                      {leadPlayer.skillDescription}
                    </p>
                  </div>
                </div>

                {/* UID & Combat Focus */}
                <div className="mt-6 pt-5 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
                      Official Free Fire UID
                    </p>
                    <div className="mt-1.5 flex items-center gap-3">
                      <span className="font-mono text-xl font-bold tabular-nums text-gradient-uid">
                        {leadPlayer.uid}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => handleCopyUid(e, leadPlayer.uid)}
                        aria-label={`Copy UID ${leadPlayer.uid} for ${leadPlayer.ign}`}
                        className="inline-flex items-center gap-1.5 min-h-[36px] px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-medium text-zinc-200 transition-colors active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-red-500"
                      >
                        {copiedUid === leadPlayer.uid ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
                      Primary Combat Focus
                    </p>
                    <p className="mt-1.5 text-sm sm:text-base font-semibold text-zinc-100">
                      {leadPlayer.engagementFocus}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenProfile(leadPlayer);
                  }}
                  className={`inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 rounded border text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-200 active:scale-[0.98] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 ${leadTone.button}`}
                >
                  <Eye className="w-4 h-4" aria-hidden="true" />
                  <span>View Player Profile</span>
                </button>

                <span className="text-xs uppercase tracking-[0.18em] text-zinc-400">
                  Sequence 01 · Entry Spearhead
                </span>
              </div>
            </div>
          </div>
        </motion.article>

        {/* PLAYERS 02, 03, 04 — CHARACTER-INTEGRATED POSTER CARDS */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-7">
          {squadCore.map((player, index) => {
            const tone = getToneStyles(player.themeTone);
            const isIgl = Boolean(player.isIgl);

            return (
              <motion.article
                key={player.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 'some' }}
                transition={{
                  duration: 0.52,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => handleOpenProfile(player)}
                className={`group relative flex flex-col rounded-2xl bg-gradient-to-b from-[#121218] via-[#0B0B10] to-[#08080A] border transition-all duration-300 hover:-translate-y-1.5 cursor-pointer ${tone.border}`}
              >
                {/* Inner Clipped Glow & Sheen Layer */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl" aria-hidden="true">
                  <div className="animate-border-gleam absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className={`absolute inset-0 ${tone.glow}`} />
                </div>

                {/* Animated Corner Highlights */}
                <span className={`pointer-events-none absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 rounded-tl-xl transition-all duration-300 group-hover:w-7 group-hover:h-7 ${tone.cornerPrimary} z-20`} />
                <span className={`pointer-events-none absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 rounded-br-xl transition-all duration-300 group-hover:w-7 group-hover:h-7 ${tone.cornerSecondary} z-20`} />

                {/* Top Character Poster Stage (Allows subtle top overlap) */}
                <div className="relative h-64 sm:h-72 px-4 pt-3 flex items-end justify-center">
                  <CharacterAuraDecoration tone={player.themeTone} />

                  {/* Player Index & Character Tag */}
                  <div className="absolute top-4 left-5 right-5 flex items-start justify-between gap-2 z-20">
                    <div>
                      <span className="font-mono text-xs font-bold tabular-nums tracking-[0.18em] text-zinc-200">
                        PLAYER {player.order}
                      </span>
                      {isIgl && (
                        <span className="mt-1 flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.18em] text-red-400">
                          <Shield className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>IGL</span>
                        </span>
                      )}
                    </div>

                    <div className="text-right">
                      <span className="block text-[10px] uppercase tracking-[0.18em] text-zinc-400">
                        Character
                      </span>
                      <span className={`font-display text-base font-bold uppercase tracking-[0.14em] ${tone.nameGradient}`}>
                        {player.selectedCharacter}
                      </span>
                    </div>
                  </div>

                  {/* Character Render (Overlaps top card boundary slightly) */}
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.94 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 'some' }}
                    transition={{
                      duration: 0.6,
                      delay: 0.1 + index * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="relative z-10 -mt-8 h-[272px] sm:h-[300px] w-full flex items-end justify-center overflow-hidden"
                  >
                    {!brokenImages[player.id] ? (
                      <img
                        src={player.characterImage}
                        alt={`${player.selectedCharacter} official Free Fire character artwork for ${player.ign}`}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onError={() => markBroken(player.id)}
                        className={`w-auto max-w-full transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-1 ${
                          player.characterImagePosition === 'full'
                            ? 'h-[125%] object-contain object-top translate-y-[12%]'
                            : 'h-full object-contain object-bottom'
                        }`}
                      />
                    ) : (
                      <div className="h-full w-full flex flex-col items-center justify-center">
                        <RoleInsignia roleId={player.id} className={`w-12 h-12 ${tone.accentText}`} />
                      </div>
                    )}

                    {/* Seamless Bottom Gradient Fade into Glass Content */}
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0B0B10] via-[#0B0B10]/70 to-transparent"
                      aria-hidden="true"
                    />
                  </motion.div>
                </div>

                {/* Card Content */}
                <div className="relative z-20 px-6 pb-6 pt-1 flex-1 flex flex-col justify-between">
                  <div>
                    <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] ${tone.accentText}`}>
                      <RoleInsignia roleId={player.id} className="w-4 h-4 shrink-0" />
                      <span className="truncate">{player.role}</span>
                    </div>

                    <h3 className="mt-1.5 font-display text-4xl font-extrabold tracking-wide leading-none">
                      <span className={tone.nameGradient}>{player.ign}</span>
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                      {player.tacticalSummary}
                    </p>

                    {/* Character Skill Panel */}
                    <div className="mt-5 p-3.5 rounded-xl bg-[#07070A]/90 border border-zinc-800/90 flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-700/70 flex items-center justify-center shrink-0 overflow-hidden">
                        <img
                          src={player.skillIcon}
                          alt={`${player.skillName} official skill icon`}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="w-7 h-7 object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-200">
                          {player.selectedCharacter} ·{' '}
                          <span className={tone.accentText}>{player.skillName}</span>
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                          {player.skillDescription}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* UID & Profile Trigger */}
                  <div className="mt-6 pt-4 border-t border-zinc-800/80">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <span className="block text-[10px] uppercase tracking-[0.18em] text-zinc-400">
                          Official UID
                        </span>
                        <span className="font-mono text-base font-bold tabular-nums text-gradient-uid">
                          {player.uid}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleCopyUid(e, player.uid)}
                        aria-label={`Copy UID ${player.uid} for ${player.ign}`}
                        className="inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-xs font-medium text-zinc-200 transition-colors active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-red-500"
                      >
                        {copiedUid === player.uid ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
                            <span>Copy UID</span>
                          </>
                        )}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenProfile(player);
                      }}
                      className={`mt-4 w-full inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded border text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-200 active:scale-[0.98] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 ${tone.button}`}
                    >
                      <Eye className="w-4 h-4" aria-hidden="true" />
                      <span>View Player Profile</span>
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
