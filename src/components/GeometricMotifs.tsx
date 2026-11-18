import type { PlayerRoleKey } from '../data/roster';

export function RoleInsignia({
  roleId,
  className = 'w-5 h-5',
}: {
  roleId: PlayerRoleKey;
  className?: string;
}) {
  switch (roleId) {
    case 'primary-rusher':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M12 2L19 14L12 11L5 14L12 2Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M12 11V21M8.5 17.5L12 21L15.5 17.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'secondary-rusher':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M12 2.5L19.5 6.5V12.5C19.5 17 16.2 20.5 12 22C7.8 20.5 4.5 17 4.5 12.5V6.5L12 2.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 13L12 9.5L15.5 13"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'third-rusher':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M12 3L20 8V16L12 21L4 16V8L12 3Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M12 8V16M8 12H16"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'sniper-igl':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M12 2V6.5M12 17.5V22M2 12H6.5M17.5 12H22"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

export function WhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.31 20.62C8.75 21.41 10.38 21.82 12.04 21.82C17.5 21.82 21.95 17.37 21.95 11.91C21.95 9.26 20.92 6.77 19.05 4.9C17.18 3.03 14.69 2 12.04 2ZM17.78 16.05C17.54 16.73 16.39 17.35 15.83 17.43C15.33 17.51 14.7 17.54 14 17.32C13.57 17.18 13.02 17 12.31 16.69C9.35 15.41 7.42 12.42 7.27 12.22C7.12 12.02 6.07 10.62 6.07 9.17C6.07 7.72 6.83 7.01 7.1 6.71C7.37 6.42 7.69 6.34 7.89 6.34C8.08 6.34 8.28 6.34 8.45 6.35C8.63 6.36 8.87 6.28 9.11 6.85C9.35 7.44 9.94 8.89 10.01 9.04C10.09 9.19 10.14 9.36 10.04 9.56C9.94 9.76 9.89 9.88 9.74 10.05C9.59 10.22 9.43 10.43 9.3 10.56C9.15 10.71 9 10.87 9.17 11.17C9.34 11.47 9.93 12.43 10.81 13.21C11.94 14.22 12.89 14.53 13.19 14.68C13.49 14.83 13.66 14.8 13.84 14.6C14.01 14.4 14.58 13.74 14.78 13.44C14.98 13.14 15.17 13.19 15.44 13.29C15.71 13.39 17.17 14.11 17.46 14.26C17.76 14.41 17.95 14.48 18.03 14.6C18.1 14.73 18.1 15.37 17.78 16.05Z" />
    </svg>
  );
}

/**
 * Architectural geometric weave band inspired respectfully by traditional Tripura handloom diamond & chevron geometry.
 * Rendered in metallic platinum & crimson accents.
 */
export function TripuraWeaveBand({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden select-none pointer-events-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 44"
        fill="none"
        preserveAspectRatio="none"
        className="w-full h-9 text-zinc-400"
      >
        <defs>
          <pattern id="tripura-diamond-weave" width="80" height="44" patternUnits="userSpaceOnUse">
            <path
              d="M0 22L20 6L40 22L20 38L0 22Z"
              stroke="currentColor"
              strokeOpacity="0.28"
              strokeWidth="1"
            />
            <path
              d="M40 22L60 6L80 22L60 38L40 22Z"
              stroke="currentColor"
              strokeOpacity="0.28"
              strokeWidth="1"
            />
            <path
              d="M12 22L20 15L28 22L20 29L12 22Z"
              stroke="#DC2626"
              strokeOpacity="0.55"
              strokeWidth="1"
            />
            <path
              d="M52 22L60 15L68 22L60 29L52 22Z"
              stroke="#DC2626"
              strokeOpacity="0.55"
              strokeWidth="1"
            />
            <path d="M0 2H80M0 42H80" stroke="currentColor" strokeOpacity="0.14" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="1200" height="44" fill="url(#tripura-diamond-weave)" />
      </svg>
    </div>
  );
}

export function SectionDivider() {
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8" aria-hidden="true">
      <div className="relative flex items-center justify-center py-2">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        <div className="animate-insignia-float absolute flex items-center gap-2 bg-[#060608] px-4">
          <span className="h-px w-6 bg-gradient-to-r from-transparent to-red-600/80" />
          <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-zinc-300">
            <path d="M8 1L14 8L8 15L2 8L8 1Z" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="8" cy="8" r="1.5" fill="#DC2626" />
          </svg>
          <span className="h-px w-6 bg-gradient-to-l from-transparent to-red-600/80" />
        </div>
      </div>
    </div>
  );
}
