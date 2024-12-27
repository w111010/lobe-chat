import { AiProviderDetailItem, AiProviderListItem } from '@/types/aiProvider';

export interface AIProviderState {
  activeAiProvider?: string;
  aiProviderDetail?: AiProviderDetailItem | null;
  aiProviderList: AiProviderListItem[];
  aiProviderLoadingIds: string[];
  // providerDetailLoading
  initAiProviderList: boolean;
  providerSearchKeyword: string;
}

export const initialAIProviderState: AIProviderState = {
  aiProviderList: [],
  aiProviderLoadingIds: [],
  initAiProviderList: false,
  providerSearchKeyword: '',
};
