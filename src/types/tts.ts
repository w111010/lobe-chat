import { type AudioPlayerProps } from '@lobehub/tts/react';

export interface TTSHookResult {
  audio: AudioPlayerProps['audio'];
  isGlobalLoading: boolean;
  response?: Response;
  setText: (text: string) => void;
  start: () => void;
  stop: () => void;
}
