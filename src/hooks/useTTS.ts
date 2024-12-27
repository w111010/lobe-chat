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

import { MinimaxiTTSOptions } from '../libs/agent-runtime/types/minimaxi';
import { useMinimaxiTTS } from './useMinimaxiTTS';

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
  interface TTSProviderMap {
    edge: {
      hook: typeof useEdgeSpeech;
      options: EdgeSpeechOptions;
    };
    microsoft: {
      hook: typeof useMicrosoftSpeech;
      options: MicrosoftSpeechOptions;
    };
    minimaxi: {
      hook: typeof useMinimaxiTTS;
      options: MinimaxiTTSOptions;
    };
    openai: {
      hook: typeof useOpenAITTS;
      options: OpenAITTSOptions;
    };
  }

  const selectedTTSType = (config?.server || ttsAgentSettings.ttsService) as TTSServer;
  let useSelectedTTS: TTSProviderMap[TTSServer]['hook'];
  let options = {} as TTSProviderMap[TTSServer]['options'];
  switch (selectedTTSType) {
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
    case 'minimaxi': {
      useSelectedTTS = useMinimaxiTTS;
      options = {
        api: {
          headers: {
            'Authorization': `Bearer ${ttsSettings.minimaxi?.apiKey}`,
            'Content-Type': 'application/json',
          },
          serviceUrl: API_ENDPOINTS.minimaxi,
        },
        options: {
          model: ttsSettings.minimaxi?.ttsModel || 'speech-01-turbo',
          voice: config?.voice || voice,
        },
      };
      break;
    }
  }

  // Type guard to ensure options match the selected TTS provider
  const getVoiceFromOptions = (opts: TTSProviderMap[TTSServer]['options']): string => {
    if ('options' in opts && opts.options?.voice) {
      return opts.options.voice;
    }
    return 'alloy';
  };

  const finalOptions = {
    ...config,
    ...options,
    onFinish: (arraybuffers: ArrayBuffer[]) => {
      const currentVoice = getVoiceFromOptions(options);
      config?.onUpload?.(currentVoice, arraybuffers);
    },
  };

  // Cast the options to the correct type based on the selected TTS provider
  switch (selectedTTSType) {
    case 'openai': {
      return (useSelectedTTS as TTSProviderMap['openai']['hook'])(
        content,
        finalOptions as TTSProviderMap['openai']['options'],
      );
    }
    case 'edge': {
      return (useSelectedTTS as TTSProviderMap['edge']['hook'])(
        content,
        finalOptions as TTSProviderMap['edge']['options'],
      );
    }
    case 'microsoft': {
      return (useSelectedTTS as TTSProviderMap['microsoft']['hook'])(
        content,
        finalOptions as TTSProviderMap['microsoft']['options'],
      );
    }
    case 'minimaxi': {
      return (useSelectedTTS as TTSProviderMap['minimaxi']['hook'])(
        content,
        finalOptions as TTSProviderMap['minimaxi']['options'],
      );
    }
    default: {
      throw new Error(`Unsupported TTS provider: ${selectedTTSType}`);
    }
  }
};
