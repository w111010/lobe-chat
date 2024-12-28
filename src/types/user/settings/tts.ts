export type STTServer = 'openai' | 'browser';

export interface UserTTSConfig {
  minimax?: {
    model?: 'speech-01-turbo' | 'speech-01-240228' | 'speech-01-turbo-240228';
  };
  openAI: {
    sttModel: 'whisper-1';
    ttsModel: 'tts-1' | 'tts-1-hd';
  };
  sttAutoStop: boolean;
  sttServer: STTServer;
}
