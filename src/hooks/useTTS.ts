import {
  EdgeSpeechOptions,
  MicrosoftSpeechOptions,
  OpenAITTSOptions,
  TTSOptions,
  useEdgeSpeech,
  useMicrosoftSpeech,
  useOpenAITTS,
} from '@lobehub/tts/react';
import isEqual from 'fast-deep-equal';

import { createHeaderWithOpenAI } from '@/services/_header';
import { API_ENDPOINTS } from '@/services/_url';
import { useAgentStore } from '@/store/agent';
import { agentSelectors } from '@/store/agent/slices/chat';
import { useUserStore } from '@/store/user';
import { settingsSelectors, userGeneralSettingsSelectors } from '@/store/user/selectors';
import { TTSServer } from '@/types/agent';
import { MinimaxTTSOptions, useMinimaxTTS } from '@/types/tts';

interface TTSConfig extends TTSOptions {
  onUpload?: (currentVoice: string, arraybuffers: ArrayBuffer[]) => void;
  server?: TTSServer;
  voice?: string;
}

export const useTTS = (content: string, config?: TTSConfig) => {
  const ttsSettings = useUserStore(settingsSelectors.currentTTS, isEqual);
  const ttsAgentSettings = useAgentStore(agentSelectors.currentAgentTTS, isEqual);
  const lang = useUserStore(userGeneralSettingsSelectors.currentLanguage);
  const voice = useAgentStore(agentSelectors.currentAgentTTSVoice(lang));
  let useSelectedTTS;
  let options: any = {};
  switch (config?.server || ttsAgentSettings.ttsService) {
    case 'openai': {
      useSelectedTTS = useOpenAITTS;
      options = {
        api: {
          headers: createHeaderWithOpenAI(),
          serviceUrl: API_ENDPOINTS.tts,
        },
        options: {
          model: ttsSettings.openAI.ttsModel,
          voice: config?.voice || voice,
        },
      } as OpenAITTSOptions;
      break;
    }
    case 'edge': {
      useSelectedTTS = useEdgeSpeech;
      options = {
        api: {
          /**
           * @description client fetch
           * serviceUrl: TTS_URL.edge,
           */
        },
        options: {
          voice: config?.voice || voice,
        },
      } as EdgeSpeechOptions;
      break;
    }
    case 'microsoft': {
      useSelectedTTS = useMicrosoftSpeech;
      options = {
        api: {
          serviceUrl: API_ENDPOINTS.microsoft,
        },
        options: {
          voice: config?.voice || voice,
        },
      } as MicrosoftSpeechOptions;
      break;
    }
    case 'minimax': {
      useSelectedTTS = useMinimaxTTS;
      options = {
        api: {
          serviceUrl: API_ENDPOINTS.minimax,
        },
        options: {
          model: ttsSettings.minimax?.model || 'speech-01-turbo',
          voice: config?.voice || voice,
        },
      } as MinimaxTTSOptions;
      break;
    }
  }

  return useSelectedTTS(content, {
    ...config,
    ...options,
    onFinish: (arraybuffers: ArrayBuffer[]) => {
      config?.onUpload?.(options.voice || 'alloy', arraybuffers);
    },
  });
};
