export type PlayerRoleKey =
  | 'primary-rusher'
  | 'secondary-rusher'
  | 'third-rusher'
  | 'sniper-igl';

export type PlayerThemeTone = 'crimson' | 'blue-silver' | 'rose-silver' | 'sniper-silver';

export interface PlayerProfile {
  order: string;
  id: PlayerRoleKey;
  ign: string;
  uid: string;
  role: string;
  shortRole: string;
  isLeadVanguard?: boolean;
  isIgl?: boolean;
  selectedCharacter: string;
  characterArchetype: string;
  characterImage: string;
  characterImagePosition: 'upper' | 'full' | 'portrait';
  isPlayerPhoto?: boolean;
  skillName: string;
  skillIcon: string;
  skillDescription: string;
  tacticalSummary: string;
  engagementFocus: string;
  squadFunction: string[];
  themeTone: PlayerThemeTone;
}

export const WHATSAPP_COMMUNITY_URL =
  'https://chat.whatsapp.com/JuQzbmOvAHIEF7J23AU3Lb?s=cl&p=a&iam=2';

export const TEAM_LOGO_PATH = '/assets/tipra-elites-logo.jpg';
export const FREE_FIRE_LOGO_PATH = '/assets/free-fire-logo-platinum.svg';
export const HERO_BACKDROP_PATH = '/src/assets/images/hero_arena_backdrop_1795040102624.jpg';
export const TRIPURA_HERITAGE_PATH = '/src/assets/images/tripura_heritage_monolith_1795040105237.jpg';

/**
 * Official TIPRA ELITES Competitive Roster
 * Exact player sequence, IGNs, UIDs, and official Garena Free Fire character loadouts.
 */
export const ROSTER_PLAYERS: PlayerProfile[] = [
  {
    order: '01',
    id: 'primary-rusher',
    ign: 'AstonXato',
    uid: '1720987970',
    role: 'PRIMARY RUSHER',
    shortRole: 'Primary Rusher',
    isLeadVanguard: true,
    selectedCharacter: 'OSCAR',
    characterArchetype: 'Night Vigilante · Entry Breaker',
    characterImage: '/assets/players/astonxato.webp',
    characterImagePosition: 'portrait',
    isPlayerPhoto: true,
    skillName: 'VALIANT DASH',
    skillIcon: '/assets/characters/oscar_skill.webp',
    skillDescription:
      'Oscar charges forward, destroying Gloo Walls in his path and damaging and knocking back enemies encountered.',
    tacticalSummary:
      'First point of contact in close-quarters engagements. Spearheads compound breaches, shatters defensive utility, and creates decisive opening space for the squad.',
    engagementFocus: 'Point Entry & Gloo-Wall Shatter',
    squadFunction: [
      'Leads initial entry into contested compounds and zone-edge skirmishes.',
      'Uses Valiant Dash pressure to break defensive Gloo Wall setups on contact.',
      'Sets offensive tempo during high-pressure squad wipes and final circles.',
    ],
    themeTone: 'crimson',
  },
  {
    order: '02',
    id: 'secondary-rusher',
    ign: 'RSxBlASTER',
    uid: '1990979603',
    role: 'SECONDARY RUSHER',
    shortRole: 'Secondary Rusher',
    selectedCharacter: 'CHRONO',
    characterArchetype: 'Bounty Hunter · Tactical Shield',
    characterImage: '/assets/characters/chrono.webp',
    characterImagePosition: 'full',
    skillName: 'TIME TURNER',
    skillIcon: '/assets/characters/chrono_skill.webp',
    skillDescription:
      'Chrono creates a protective force field that blocks incoming damage, providing defensive cover for tactical plays.',
    tacticalSummary:
      'Second wave attacking force operating in tight synchronization with the primary entry. Punishes isolated opponents, secures immediate trades, and anchors mid-fight cover.',
    engagementFocus: 'Immediate Trade & Force-Field Cover',
    squadFunction: [
      'Follows primary breach within split-second timing to secure knockdowns.',
      'Deploys Time Turner force fields to hold exposed angles and protect trades.',
      'Controls lateral flank routes to prevent third-party squad ambushes.',
    ],
    themeTone: 'blue-silver',
  },
  {
    order: '03',
    id: 'third-rusher',
    ign: 'DB JAHIR',
    uid: '2766239132',
    role: 'THIRD RUSHER',
    shortRole: 'Third Rusher',
    selectedCharacter: 'KASSIE',
    characterArchetype: 'Electro-Medical Combatant',
    characterImage: '/assets/characters/kassie.webp',
    characterImagePosition: 'upper',
    skillName: 'ELECTRO THERAPY',
    skillIcon: '/assets/characters/kassie_skill.webp',
    skillDescription:
      'Kassie forms a healing bond with a teammate, gradually restoring HP, and can activate the skill again to provide additional healing.',
    tacticalSummary:
      'Third attacking pillar bridging frontline aggression and squad sustain. Anchors extended brawls, reinforces frontline health mid-push, and closes out multi-team fights.',
    engagementFocus: 'Sustained Assault & Squad Recovery',
    squadFunction: [
      'Reinforces frontline rushers during extended compound clears and rotations.',
      'Maintains Electro Therapy sustain links to keep entry players combat-ready.',
      'Balances aggressive push discipline with late-zone survival positioning.',
    ],
    themeTone: 'rose-silver',
  },
  {
    order: '04',
    id: 'sniper-igl',
    ign: 'TRP BLIAN7',
    uid: '1643257114',
    role: 'SNIPER + IN-GAME LEADER (IGL)',
    shortRole: 'Sniper + IGL',
    isIgl: true,
    selectedCharacter: 'RAFAEL',
    characterArchetype: 'Silent Marksman · Tactical Commander',
    characterImage: '/assets/players/trp_blian7.webp',
    characterImagePosition: 'portrait',
    isPlayerPhoto: true,
    skillName: 'DEAD SILENT',
    skillIcon: '/assets/characters/rafael_skill.webp',
    skillDescription:
      'Rafael silences sniper and marksman rifle shots, while enemies hit and downed suffer faster HP loss.',
    tacticalSummary:
      'Tactical architect and long-range precision anchor of TIPRA ELITES. Commands zone rotations, reads opposing squad movements, and delivers lethal silenced over-watch.',
    engagementFocus: 'Macro Shot-Calling & Silenced Over-Watch',
    squadFunction: [
      'Directs map rotations, engagement timing, and endgame zone strategy.',
      'Executes silenced Dead Silent sniping to force rapid enemy knock bleed-outs.',
      'Maintains squad composure and tactical clarity across every match phase.',
    ],
    themeTone: 'sniper-silver',
  },
];

export interface CombatPhase {
  id: string;
  step: string;
  title: string;
  leadIgn: string;
  roleTitle: string;
  objective: string;
  execution: string;
}

export const COMBAT_PHASES: CombatPhase[] = [
  {
    id: 'recon',
    step: '01',
    title: 'Macro Read & Over-Watch',
    leadIgn: 'TRP BLIAN7',
    roleTitle: 'Sniper + In-Game Leader (IGL)',
    objective: 'Map Intelligence & Dead Silent Pressure',
    execution:
      'Every engagement starts with disciplined information gathering. TRP BLIAN7 dictates rotation paths, locks long sightlines with Rafael’s Dead Silent precision, and calls the exact breach window.',
  },
  {
    id: 'breach',
    step: '02',
    title: 'Point Entry Breach',
    leadIgn: 'AstonXato',
    roleTitle: 'Primary Rusher',
    objective: 'First Contact & Valiant Dash Shatter',
    execution:
      'On the call, AstonXato drives forward as the spearhead—leveraging Oscar’s Valiant Dash to shatter Gloo Wall defenses, disrupt defenders, and claim immediate compound space.',
  },
  {
    id: 'trade',
    step: '03',
    title: 'Flank Pressure & Shield',
    leadIgn: 'RSxBlASTER',
    roleTitle: 'Secondary Rusher',
    objective: 'Synchronized Trade & Time Turner Cover',
    execution:
      'RSxBlASTER steps directly into the breach behind AstonXato, deploying Chrono’s Time Turner force field when contesting open angles while securing crisp follow-up eliminations.',
  },
  {
    id: 'close',
    step: '04',
    title: 'Sustained Assault Closure',
    leadIgn: 'DB JAHIR',
    roleTitle: 'Third Rusher',
    objective: 'Electro Therapy Sustain & Wipe Lock',
    execution:
      'DB JAHIR links Kassie’s Electro Therapy sustain onto frontline teammates and seals the engagement—overwhelming remaining defenders and keeping the squad healthy for third-party rotations.',
  },
];
