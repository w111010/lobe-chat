import { type RefObject } from 'react';

export interface AudioProps {
  currentTime: number;
  download: () => void;
  duration: number;
  isPlaying: boolean;
  pause: () => void;
  play: () => void;
  reset: () => void;
  setTime: (time: number) => void;
  stop: () => void;
  url: string;
}

export interface AudioPlayerState extends AudioProps {
  arrayBuffers: ArrayBuffer[];
  isLoading?: boolean;
  ref: RefObject<HTMLAudioElement>;
  reset: () => void;
  url: string;
}
