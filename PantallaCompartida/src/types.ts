export interface Track {
  title: string;
  duration: string;
  url: string;
}

export interface SoundElement {
  id: string;
  name: string;
  emoji: string;
  audioActive: boolean;
  intensity: number; // 0 to 100
}

export type MediaType = 'podcast' | 'video' | 'interactive';

export interface Cartridge {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  mediaType: MediaType;
  coverBg: string; // Tailwind class like bg-gradient-to-tr from-emerald-800 to-teal-500
  accentColor: string; // Tailwind color name like emerald or indigo
  iconName: 'mic' | 'video' | 'compass' | 'rocket' | 'music';
  author: string;
  year: string;
  tracks?: Track[];
  interactiveElements?: SoundElement[];
  videoSnippet?: string; // Simulated video scene tag line or action
  videoEmbedUrl?: string; // Embeddable youtube-nocookie or Vimeo placeholder
}

export type TVStatus = 'off' | 'booting' | 'on' | 'glitching';
