import { useState } from 'react';
import { FREE_FIRE_LOGO_PATH, TEAM_LOGO_PATH, WHATSAPP_COMMUNITY_URL } from '../data/roster';
import { playTacticalClick } from '../utils/sound';

export function Footer() {
  const [logoError, setLogoError] = useState(false);
  const [ffError, setFfError] = useState(false);

  return (
    <footer className="border-t border-zinc-800/80 bg-[#050507] py-12">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-zinc-900">
          <div className="flex items-center gap-4">
            {!logoError && (
              <img
                src={TEAM_LOGO_PATH}
                alt="TIPRA ELITES Crest"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={() => setLogoError(true)}
                className="w-12 h-12 rounded-lg object-contain bg-black border border-zinc-800"
              />
            )}
            <div>
              <p className="font-display text-2xl font-extrabold uppercase tracking-[0.14em] text-gradient-platinum">
                TIPRA ELITES
              </p>
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-gradient-crimson-silver">
                Built in Tripura. Born to Dominate.
              </p>
            </div>
          </div>

          <nav
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-400"
            aria-label="Footer Navigation"
          >
            <a
              href="#identity"
              onClick={() => playTacticalClick()}
              className="hover:text-white transition-colors"
            >
              Identity
            </a>
            <a
              href="#roster"
              onClick={() => playTacticalClick()}
              className="hover:text-white transition-colors"
            >
              Roster
            </a>
            <a
              href="#roles"
              onClick={() => playTacticalClick()}
              className="hover:text-white transition-colors"
            >
              Roles
            </a>
            <a
              href="#origin"
              onClick={() => playTacticalClick()}
              className="hover:text-white transition-colors"
            >
              Origin
            </a>
            <a
              href="#journey"
              onClick={() => playTacticalClick()}
              className="hover:text-white transition-colors"
            >
              Journey
            </a>
            <a
              href={WHATSAPP_COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playTacticalClick()}
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              WhatsApp Community
            </a>
          </nav>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-zinc-500">
          <p>
            © {new Date().getFullYear()} TIPRA ELITES · Tripura, India. Independent Free Fire
            India competitive organization — not affiliated with or endorsed by Garena.
          </p>

          <div className="flex items-center gap-2 shrink-0">
            {!ffError && (
              <img
                src={FREE_FIRE_LOGO_PATH}
                alt="Free Fire wordmark"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={() => setFfError(true)}
                className="h-3.5 w-auto opacity-75"
              />
            )}
            <span className="font-display text-xs uppercase tracking-[0.16em] text-zinc-400">
              INDIA
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
