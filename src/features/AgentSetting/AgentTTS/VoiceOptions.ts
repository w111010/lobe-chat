import { SelectProps } from 'antd';

import { MINIMAXI_VOICES } from '@/const/settings/minimaxiVoices';
import { TTSServer } from '@/types/agent';

export const getVoiceOptions = (server: TTSServer): SelectProps['options'] => {
  switch (server) {
    case 'minimaxi': {
      return MINIMAXI_VOICES;
    }

    case 'openai': {
      return [
        {
          label: 'Alloy',
          value: 'alloy',
        },
        {
          label: 'Echo',
          value: 'echo',
        },
        {
          label: 'Fable',
          value: 'fable',
        },
        {
          label: 'Onyx',
          value: 'onyx',
        },
        {
          label: 'Nova',
          value: 'nova',
        },
        {
          label: 'Shimmer',
          value: 'shimmer',
        },
      ];
    }

    case 'edge': {
      return [
        {
          label: 'Jenny',
          value: 'en-US-JennyMultilingualNeural',
        },
        {
          label: 'Guy',
          value: 'en-US-GuyNeural',
        },
      ];
    }

    case 'microsoft': {
      return [
        {
          label: 'Jenny',
          value: 'en-US-JennyMultilingualNeural',
        },
        {
          label: 'Guy',
          value: 'en-US-GuyNeural',
        },
      ];
    }

    default: {
      return [];
    }
  }
};
