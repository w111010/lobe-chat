import { UserTTSConfig } from '@/types/user/settings';

export const DEFAULT_TTS_CONFIG: UserTTSConfig = {
  minimax: {
    model: 'speech-01-turbo',
  },
  openAI: {
    sttModel: 'whisper-1',
    ttsModel: 'tts-1',
  },
  sttAutoStop: true,
  sttServer: 'openai',
};
