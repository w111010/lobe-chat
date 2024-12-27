import { AgentRuntimeErrorType } from '../error';
import { TextToSpeechOptions, TextToSpeechPayload } from '../types/tts';
import { AgentRuntimeError } from '../utils/createError';

interface MinimaxiConfig {
  apiKey?: string;
  groupId?: string;
}

export class LobeMinimaxiAI {
  private apiKey?: string;
  private groupId?: string;

  constructor({ apiKey, groupId }: MinimaxiConfig = {}) {
    this.apiKey = apiKey;
    this.groupId = groupId;

    if (!apiKey || !groupId)
      throw AgentRuntimeError.createError(AgentRuntimeErrorType.InvalidProviderAPIKey);
  }

  async textToSpeech(
    payload: TextToSpeechPayload,
    options?: TextToSpeechOptions,
  ): Promise<ArrayBuffer> {
    try {
      const { input, model = 'speech-01-turbo', voice } = payload;

      const body = {
        audio_setting: { format: 'mp3' },
        model,
        stream: false,
        text: input,
        voice_setting: { voice_id: voice },
      };

      const url = `https://api.minimax.chat/v1/t2a_v2?GroupId=${this.groupId}`;
      const response = await fetch(url, {
        body: JSON.stringify(body),
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          ...(options?.headers as Record<string, string>),
        },
        method: 'POST',
      });

      if (!response.ok) {
        throw AgentRuntimeError.createError(AgentRuntimeErrorType.ProviderBizError, {
          error: await response.json(),
          statusCode: response.status,
        });
      }

      const data = await response.json();

      const audioBase64 = data.data?.audio;
      if (!audioBase64) {
        throw AgentRuntimeError.createError(AgentRuntimeErrorType.ProviderBizError, {
          message: 'No audio data in response',
        });
      }

      // Convert base64 to ArrayBuffer
      const binaryString = atob(audioBase64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes.buffer;
    } catch (error) {
      // Re-throw if it's already an AgentRuntimeError
      if (error && typeof error === 'object' && 'errorType' in error) throw error;

      throw AgentRuntimeError.createError(AgentRuntimeErrorType.ProviderBizError, {
        error,
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }
}
