import { AIProviderStoreState } from '@/store/aiInfra/initialState';

const enabledAiProviderList = (s: AIProviderStoreState) =>
  s.aiProviderList.filter((item) => item.enabled);

const disabledAiProviderList = (s: AIProviderStoreState) =>
  s.aiProviderList.filter((item) => !item.enabled);

const isProviderEnabled = (id: string) => (s: AIProviderStoreState) =>
  enabledAiProviderList(s).some((i) => i.id === id);

const isProviderLoading = (id: string) => (s: AIProviderStoreState) =>
  s.aiProviderLoadingIds.includes(id);

export const aiProviderSelectors = {
  disabledAiProviderList,
  enabledAiProviderList,
  isProviderEnabled,
  isProviderLoading,
};
