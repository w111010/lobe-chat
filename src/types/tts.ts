import { TTSOptions } from '@lobehub/tts/react';
// Using local AudioProps type
import { Dispatch, SetStateAction } from 'react';

export interface AudioProps {
  arrayBuffers: ArrayBuffer[];
  currentTime: number;
  download: () => void;
  duration?: number;
  isPlaying?: boolean;
  pause?: () => void;
  play?: () => void;
  setTime: (time: number) => void;
  stop: () => void;
}

export interface MinimaxTTSPayload {
  format?: 'mp3' | 'pcm' | 'flac' | 'wav';
  model?: string;
  pitch?: number;
  speed?: number;
  text: string;
  voice?: string;
}

export interface MinimaxTTSOptions extends TTSOptions {
  api?: {
    serviceUrl?: string;
  };
  options?: {
    format?: 'mp3' | 'pcm' | 'flac' | 'wav';
    model?: 'speech-01-turbo' | 'speech-01-240228' | 'speech-01-turbo-240228';
    pitch?: number;
    speed?: number;
  };
}

export const useMinimaxTTS = (content: string, options?: MinimaxTTSOptions) => {
  void content; // Explicitly mark as unused
  void options; // Explicitly mark as unused
  // This is a mock implementation
  // The real implementation will be in the lobe-tts package
  return {
    audio: {
      arrayBuffers: [],
      currentTime: 0,
      download: () => {},
      duration: 0,
      isPlaying: false,
      pause: () => {},
      play: () => {},
      setTime: (time: number) => {
        void time;
      }, // Explicitly mark as unused
      stop: () => {},
    },
    canStart: true,
    isGlobalLoading: false,
    isLoading: false,
    response: null,
    setText: (() => {}) as Dispatch<SetStateAction<string>>,
    start: () => {},
    stop: () => {},
  };
};
