import { MinimaxiTTSConfig } from './minimaxi';

export type STTServer = 'openai' | 'browser';

export interface UserTTSConfig {
  minimaxi: MinimaxiTTSConfig & {
    apiKey?: string;
    groupId?: string;
  };
  openAI: {
    sttModel: 'whisper-1';
    ttsModel: 'tts-1' | 'tts-1-hd';
  };
  sttAutoStop: boolean;
  sttServer: STTServer;
}
