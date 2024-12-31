import { type Response } from './tts';
export { type Response };

export interface SpeechRecognitionOptions {
  continuous?: boolean;
  interimResults?: boolean;
  lang?: string;
}

export interface OpenAISTTOptions {
  apiKey?: string;
  model?: string;
  prompt?: string;
  temperature?: number;
  language?: string;
}

export interface TTSProviderAPI {
  serviceUrl?: string;
  headers?: Record<string, string>;
}

export interface TTSProviderPayload {
  input: string;
  options: {
    voice?: string;
    model?: string;
    [key: string]: any;
  };
}

export interface EdgeSpeechAPI extends TTSProviderAPI {
  locale?: string;
}

export interface EdgeSpeechPayload extends TTSProviderPayload {
  options: {
    voice: string;
  };
}

export interface MicrosoftSpeechAPI extends TTSProviderAPI {
  locale?: string;
}

export interface MicrosoftSpeechPayload extends TTSProviderPayload {
  options: {
    voice: string;
  };
}

export interface OpenAITTSAPI extends TTSProviderAPI {}

export interface OpenAITTSPayload extends TTSProviderPayload {
  options: {
    model: string;
    voice: string;
  };
}

export interface MinimaxTTSAPI extends TTSProviderAPI {}

export interface MinimaxTTSOptions {
  api?: MinimaxTTSAPI;
  options?: MinimaxTTSPayload['options'];
}

export interface MinimaxTTSPayload extends TTSProviderPayload {
  options: {
    model: string;
    voice?: string;
    format?: 'mp3' | 'pcm' | 'flac' | 'wav';
    speed?: number;
    pitch?: number;
  };
}
