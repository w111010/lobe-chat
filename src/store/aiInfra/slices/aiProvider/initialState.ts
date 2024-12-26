import { AiProviderListItem } from '@/types/aiProvider';

export interface AIProviderState {
  aiProviderList: AiProviderListItem[];
  aiProviderLoadingIds: string[];
  initAiProviderList: boolean;
  providerSearchKeyword: string;
}

export const initialAIProviderState: AIProviderState = {
  aiProviderList: [],
  aiProviderLoadingIds: [],
  initAiProviderList: false,
  providerSearchKeyword: '',
};
