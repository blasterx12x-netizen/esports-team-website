import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Check, Copy, Send } from 'lucide-react';
import { ROSTER_PLAYERS, WHATSAPP_COMMUNITY_URL } from '../data/roster';
import { WhatsAppIcon } from './GeometricMotifs';
import { playTacticalChime, playTacticalClick } from '../utils/sound';

export function CommunitySection() {
  const [copiedUid, setCopiedUid] = useState<string | null>(null);
  const [teamName, setTeamName] = useState('');
  const [inquiryType, setInquiryType] = useState<'scrim' | 'community' | 'tournament'>('scrim');
  const [copiedMessage, setCopiedMessage] = useState(false);

  const handleCopyUid = async (uid: string) => {
    playTacticalClick();
    try {
      await navigator.clipboard.writeText(uid);
      setCopiedUid(uid);
      setTimeout(() => setCopiedUid((prev) => (prev === uid ? null : prev)), 1800);
    } catch {
      // Ignore clipboard error
    }
  };

  const formattedMessage =
    inquiryType === 'scrim'
      ? `Hello TIPRA ELITES! Team ${teamName.trim() || '[Your Team Name]'} would like to schedule a competitive Free Fire India scrimmage.`
      : inquiryType === 'tournament'
        ? `Hello TIPRA ELITES! Reaching out from ${teamName.trim() || '[Organizer / Event]'} regarding an upcoming Free Fire India tournament.`
        : `Hello TIPRA ELITES! ${teamName.trim() ? `I'm ${teamName.trim()} — ` : ''}excited to connect with the TIPRA ELITES community.`;

  const handleCopyInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    playTacticalChime();
    try {
      await navigator.clipboard.writeText(formattedMessage);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2400);
    } catch {
      window.open(WHATSAPP_COMMUNITY_URL, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="community" className="relative py-20 sm:py-24 bg-[#08080B] overflow-hidden">
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[680px] h-[340px] rounded-full bg-[radial-gradient(circle,rgba(22,163,74,0.1)_0%,rgba(185,28,28,0.09)_48%,transparent_75%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Primary WhatsApp Community Callout */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 rounded-2xl bg-gradient-to-br from-[#0F1512] via-[#0C0D0F] to-[#08080A] border border-emerald-700/40 p-7 sm:p-10 shadow-[0_24px_70px_rgba(0,0,0,0.65)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-400">
              Official Community Hub
            </p>

            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-extrabold uppercase tracking-wide text-balance">
              <span className="text-gradient-platinum">FROM TRIPURA TO</span>{' '}
              <span className="text-gradient-crimson-silver">THE BATTLEGROUND</span>
            </h2>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-zinc-300 max-w-xl">
              Connect directly with TIPRA ELITES supporters, coordinate custom-room scrims,
              and stay updated on roster announcements inside our official WhatsApp community
              group.
            </p>

            {/* Prominent Official WhatsApp Community Button */}
            <div className="mt-8">
              <a
                href={WHATSAPP_COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTacticalChime()}
                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-3 min-h-[54px] px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0C1D14] via-[#12291C] to-[#0C1D14] hover:from-[#132C1E] hover:to-[#183826] active:scale-[0.98] border border-emerald-500/60 hover:border-emerald-400 text-sm sm:text-base font-bold uppercase tracking-[0.12em] text-white shadow-[0_0_32px_rgba(34,197,94,0.22)] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
              >
                <WhatsAppIcon className="w-5 h-5 text-emerald-400 transition-transform duration-200 group-hover:scale-110 shrink-0" />
                <span className="whitespace-nowrap">JOIN TIPRA ELITES COMMUNITY</span>
                <ArrowUpRight
                  className="w-4 h-4 text-emerald-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
                  aria-hidden="true"
                />
              </a>
              <p className="mt-3 text-xs text-zinc-400">
                Opens the official TIPRA ELITES WhatsApp community invite directly.
              </p>
            </div>

            {/* In-Game UID Quick-Copy Directory */}
            <div className="mt-9 pt-7 border-t border-zinc-800/80">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                In-Game Squad UID Directory (Tap to Copy)
              </p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ROSTER_PLAYERS.map((player) => (
                  <button
                    key={player.id}
                    type="button"
                    onClick={() => handleCopyUid(player.uid)}
                    className="flex items-center justify-between gap-3 min-h-[50px] px-4 py-2.5 rounded-xl bg-[#09090D] hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-left transition-colors active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-red-500"
                  >
                    <div className="min-w-0">
                      <span className="block font-display text-base font-bold tracking-wide text-gradient-platinum truncate">
                        {player.ign}
                      </span>
                      <span className="block text-[11px] uppercase tracking-wider text-zinc-400 truncate">
                        {player.shortRole} · {player.selectedCharacter}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-xs font-semibold tabular-nums text-gradient-uid">
                        {player.uid}
                      </span>
                      {copiedUid === player.uid ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-zinc-500" aria-hidden="true" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Scrimmage & Contact Message Composer */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 rounded-2xl bg-gradient-to-b from-[#0E0E13] to-[#09090C] border border-zinc-800/90 p-7 sm:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-500">
              Scrims & Inquiries
            </p>
            <h3 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-gradient-platinum">
              PREPARE A CONTACT BRIEF
            </h3>
            <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
              Generate a ready-to-send scrimmage challenge or tournament inquiry note to
              paste directly into our WhatsApp community.
            </p>

            <form onSubmit={handleCopyInvite} className="mt-6 space-y-5">
              <div>
                <span className="block text-xs font-medium uppercase tracking-[0.14em] text-zinc-400 mb-2">
                  Inquiry Purpose
                </span>
                <div className="grid grid-cols-3 gap-1.5 p-1 rounded-lg bg-[#060608] border border-zinc-800">
                  {[
                    { key: 'scrim' as const, label: 'Scrimmage' },
                    { key: 'tournament' as const, label: 'Tournament' },
                    { key: 'community' as const, label: 'General' },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => {
                        playTacticalClick();
                        setInquiryType(opt.key);
                      }}
                      className={`min-h-[38px] px-2 py-1.5 rounded text-xs font-semibold transition-colors whitespace-nowrap ${
                        inquiryType === opt.key
                          ? 'bg-red-700 text-white'
                          : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="scrim-team-input"
                  className="block text-xs font-medium uppercase tracking-[0.14em] text-zinc-400 mb-2"
                >
                  Your Name or Squad Name
                </label>
                <input
                  id="scrim-team-input"
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="e.g. Agartala Vanguard"
                  maxLength={60}
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg bg-[#060608] border border-zinc-800 focus:border-red-600 focus:outline-none text-sm text-zinc-100 placeholder:text-zinc-600"
                />
              </div>

              <div className="p-4 rounded-lg bg-[#060608] border border-zinc-800/80">
                <span className="block text-[11px] uppercase tracking-[0.16em] text-zinc-500 mb-1.5">
                  Message Preview
                </span>
                <p className="text-xs sm:text-sm leading-relaxed text-zinc-300">
                  {formattedMessage}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 min-h-[46px] px-5 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-red-500"
                >
                  {copiedMessage ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                      <span>Copied Brief</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-zinc-400" aria-hidden="true" />
                      <span>Copy Brief</span>
                    </>
                  )}
                </button>

                <a
                  href={WHATSAPP_COMMUNITY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playTacticalClick()}
                  className="inline-flex items-center justify-center gap-2 min-h-[46px] px-5 py-2.5 rounded-lg bg-red-700 hover:bg-red-600 active:scale-[0.98] text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors whitespace-nowrap"
                >
                  <Send className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Open Group</span>
                </a>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
