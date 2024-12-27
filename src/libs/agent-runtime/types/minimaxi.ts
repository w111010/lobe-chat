import { TTSOptions } from '@lobehub/tts/react';

import { TextToSpeechPayload } from './tts';

export interface MinimaxiTTSAPI {
  headers: {
    'Authorization': string;
    'Content-Type': string;
  };
  serviceUrl: string;
}

export interface MinimaxiTTSVoiceOptions {
  model: 'speech-01-turbo' | 'speech-01-240228' | 'speech-01-turbo-240228';
  voice: string;
}

export interface MinimaxiTTSOptions extends TTSOptions {
  api: MinimaxiTTSAPI;
  options: MinimaxiTTSVoiceOptions;
}

export interface MinimaxiTTSPayload extends TextToSpeechPayload {
  model: 'speech-01-turbo' | 'speech-01-240228' | 'speech-01-turbo-240228';
}

export interface MinimaxiTTSResponse {
  data: {
    audio: string; // base64 encoded audio data
  };
}
