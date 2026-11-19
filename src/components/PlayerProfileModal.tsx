import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, ChevronLeft, ChevronRight, Copy, Shield, X } from 'lucide-react';
import { ROSTER_PLAYERS, type PlayerProfile } from '../data/roster';
import { RoleInsignia } from './GeometricMotifs';
import { playTacticalClick } from '../utils/sound';

interface PlayerProfileModalProps {
  player: PlayerProfile | null;
  onClose: () => void;
  onSelectPlayer: (player: PlayerProfile) => void;
}

export function PlayerProfileModal({
  player,
  onClose,
  onSelectPlayer,
}: PlayerProfileModalProps) {
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
    setCopied(false);
  }, [player?.id]);

  useEffect(() => {
    if (!player) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        const idx = ROSTER_PLAYERS.findIndex((p) => p.id === player.id);
        const next = ROSTER_PLAYERS[(idx + 1) % ROSTER_PLAYERS.length];
        playTacticalClick();
        onSelectPlayer(next);
      } else if (e.key === 'ArrowLeft') {
        const idx = ROSTER_PLAYERS.findIndex((p) => p.id === player.id);
        const prev = ROSTER_PLAYERS[(idx - 1 + ROSTER_PLAYERS.length) % ROSTER_PLAYERS.length];
        playTacticalClick();
        onSelectPlayer(prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [player, onClose, onSelectPlayer]);

  if (!player) return null;

  const currentIndex = ROSTER_PLAYERS.findIndex((p) => p.id === player.id);
  const prevPlayer = ROSTER_PLAYERS[(currentIndex - 1 + ROSTER_PLAYERS.length) % ROSTER_PLAYERS.length];
  const nextPlayer = ROSTER_PLAYERS[(currentIndex + 1) % ROSTER_PLAYERS.length];

  const handleCopy = async () => {
    playTacticalClick();
    try {
      await navigator.clipboard.writeText(player.uid);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Ignore if clipboard blocked
    }
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="player-modal-title"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/84 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 14 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0B0B10] border border-zinc-700/80 shadow-[0_32px_90px_rgba(0,0,0,0.92)]"
        >
          <button
            type="button"
            onClick={() => {
              playTacticalClick();
              onClose();
            }}
            aria-label="Close player dossier"
            className="absolute top-4 right-4 z-30 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-red-500"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
            {/* Character Showcase Column */}
            <div className="md:col-span-5 relative min-h-[300px] md:min-h-[480px] bg-gradient-to-b from-[#130E12] to-[#070709] overflow-hidden flex flex-col justify-end p-4">
              <div
                className={`pointer-events-none absolute inset-0 ${
                  player.themeTone === 'blue-silver'
                    ? 'bg-[radial-gradient(circle_at_50%_45%,rgba(56,189,248,0.22),transparent_72%)]'
                    : 'bg-[radial-gradient(circle_at_50%_45%,rgba(220,38,38,0.24),transparent_72%)]'
                }`}
                aria-hidden="true"
              />

              <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-20">
                <span className="font-mono text-xs font-bold tabular-nums tracking-[0.2em] text-zinc-200">
                  PLAYER {player.order}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                  Character · <span className="text-zinc-100">{player.selectedCharacter}</span>
                </span>
              </div>

              {!imgError ? (
                <div
                  className={`relative z-10 flex items-end justify-center ${
                    player.isPlayerPhoto
                      ? 'mt-10 rounded-xl overflow-hidden bg-black h-[290px] md:h-[400px]'
                      : 'h-[290px] md:h-[410px]'
                  }`}
                >
                  <img
                    src={player.characterImage}
                    alt={
                      player.isPlayerPhoto
                        ? `${player.ign} official player portrait`
                        : `${player.selectedCharacter} official Free Fire character render`
                    }
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className={`w-auto max-w-full ${
                      player.characterImagePosition === 'full'
                        ? 'h-[116%] object-contain object-top translate-y-[8%]'
                        : player.characterImagePosition === 'portrait'
                          ? 'h-full object-contain object-top'
                          : 'h-full object-contain object-bottom'
                    }`}
                  />
                </div>
              ) : (
                <div className="h-full w-full flex flex-col items-center justify-center p-8">
                  <RoleInsignia roleId={player.id} className="w-16 h-16 text-red-500" />
                </div>
              )}

              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#070709] to-transparent z-20"
                aria-hidden="true"
              />
            </div>

            {/* Tactical Dossier Info */}
            <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em]">
                  <RoleInsignia
                    roleId={player.id}
                    className={`w-4 h-4 ${
                      player.themeTone === 'blue-silver' ? 'text-sky-400' : 'text-red-500'
                    }`}
                  />
                  <span className="text-gradient-crimson-silver">{player.role}</span>
                  {player.isIgl && (
                    <>
                      <span className="text-zinc-600" aria-hidden="true">
                        ·
                      </span>
                      <span className="inline-flex items-center gap-1 text-zinc-200">
                        <Shield className="w-3.5 h-3.5 text-red-400" aria-hidden="true" />
                        Shot-Caller
                      </span>
                    </>
                  )}
                </div>

                <h2
                  id="player-modal-title"
                  className="mt-2 font-display text-4xl sm:text-5xl font-extrabold tracking-wide"
                >
                  <span className="text-gradient-platinum">{player.ign}</span>
                </h2>

                <div className="mt-4 flex flex-wrap items-center gap-4 pb-5 border-b border-zinc-800/80">
                  <div>
                    <span className="block text-[11px] uppercase tracking-[0.18em] text-zinc-400">
                      Free Fire UID
                    </span>
                    <span className="font-mono text-lg font-bold tabular-nums text-gradient-uid">
                      {player.uid}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-medium text-zinc-200 transition-colors focus-visible:outline-2 focus-visible:outline-red-500"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                        <span>Copied UID</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
                        <span>Copy UID</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Official Character Skill Box */}
                <div className="mt-5 p-4 rounded-xl bg-[#07070A] border border-zinc-800 flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                      src={player.skillIcon}
                      alt={`${player.skillName} icon`}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-200">
                      {player.selectedCharacter} ·{' '}
                      <span className="text-red-400">{player.skillName}</span>
                    </p>
                    <p className="mt-1 text-xs sm:text-sm leading-relaxed text-zinc-400">
                      {player.skillDescription}
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-sm sm:text-base leading-relaxed text-zinc-300">
                  {player.tacticalSummary}
                </p>

                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                    Squad Tactical Responsibilities
                  </p>
                  <ul className="mt-3 space-y-2">
                    {player.squadFunction.map((line, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                        <span className="font-mono text-xs text-red-500 pt-0.5 tabular-nums">
                          0{i + 1}.
                        </span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-7 pt-4 border-t border-zinc-800/80 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => {
                    playTacticalClick();
                    onSelectPlayer(prevPlayer);
                  }}
                  className="inline-flex items-center gap-1.5 min-h-[40px] px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  <span>{prevPlayer.ign}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playTacticalClick();
                    onSelectPlayer(nextPlayer);
                  }}
                  className="inline-flex items-center gap-1.5 min-h-[40px] px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
                >
                  <span>{nextPlayer.ign}</span>
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
