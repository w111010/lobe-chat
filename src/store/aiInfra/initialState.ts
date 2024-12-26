import { AIProviderState, initialAIProviderState } from '@/store/aiInfra/slices/aiProvider';

export type AIProviderStoreState = AIProviderState;

export const initialState: AIProviderStoreState = {
  ...initialAIProviderState,
};
