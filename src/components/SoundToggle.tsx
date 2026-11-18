import { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { isSoundMuted, setSoundMuted } from '../utils/sound';

export function SoundToggle() {
  const [muted, setMuted] = useState<boolean>(isSoundMuted());

  const handleToggle = () => {
    const next = !muted;
    setMuted(next);
    setSoundMuted(next);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-pressed={!muted}
      aria-label={muted ? 'Enable interface audio cues' : 'Mute interface audio cues'}
      className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 min-h-[44px] px-3.5 py-2 rounded bg-[#0E0E12]/90 backdrop-blur-md border border-zinc-800 hover:border-zinc-600 text-xs font-medium tracking-wide text-zinc-300 hover:text-white shadow-lg transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
    >
      {muted ? (
        <VolumeX className="w-4 h-4 text-zinc-400" aria-hidden="true" />
      ) : (
        <Volume2 className="w-4 h-4 text-red-500" aria-hidden="true" />
      )}
      <span className="whitespace-nowrap">{muted ? 'Sound: Off' : 'Sound: On'}</span>
    </button>
  );
}
