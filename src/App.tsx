import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import type { PlayerProfile } from './data/roster';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { IdentitySection } from './components/IdentitySection';
import { RosterSection } from './components/RosterSection';
import { RolesMatrixSection } from './components/RolesMatrixSection';
import { TripuraOriginSection } from './components/TripuraOriginSection';
import { JourneySection } from './components/JourneySection';
import { CommunitySection } from './components/CommunitySection';
import { Footer } from './components/Footer';
import { PlayerProfileModal } from './components/PlayerProfileModal';
import { SoundToggle } from './components/SoundToggle';
import { SectionDivider } from './components/GeometricMotifs';

export default function App() {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerProfile | null>(null);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#060608] text-zinc-100 flex flex-col">
        <Navbar />

        <main className="flex-1">
          <HeroSection />
          <IdentitySection />
          <SectionDivider />
          <RosterSection onSelectPlayer={setSelectedPlayer} />
          <SectionDivider />
          <RolesMatrixSection />
          <SectionDivider />
          <TripuraOriginSection />
          <SectionDivider />
          <JourneySection />
          <SectionDivider />
          <CommunitySection />
        </main>

        <Footer />
        <SoundToggle />

        <PlayerProfileModal
          player={selectedPlayer}
          onClose={() => setSelectedPlayer(null)}
          onSelectPlayer={setSelectedPlayer}
        />
      </div>
    </MotionConfig>
  );
}
