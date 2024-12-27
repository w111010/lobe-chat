import { isProviderDisableBroswerRequest } from '@/config/modelProviders';
import { AIProviderStoreState } from '@/store/aiInfra/initialState';
import { UserStore } from '@/store/user';
import { GlobalLLMProviderKey } from '@/types/user/settings';

// List
const enabledAiProviderList = (s: AIProviderStoreState) =>
  s.aiProviderList.filter((item) => item.enabled);

const disabledAiProviderList = (s: AIProviderStoreState) =>
  s.aiProviderList.filter((item) => !item.enabled);

const isProviderEnabled = (id: string) => (s: AIProviderStoreState) =>
  enabledAiProviderList(s).some((i) => i.id === id);

const isProviderLoading = (id: string) => (s: AIProviderStoreState) =>
  s.aiProviderLoadingIds.includes(id);

const activeProviderConfig = (s: AIProviderStoreState) => s.aiProviderDetail;

// Detail

const isAiProviderConfigLoading = (id: string) => (s: AIProviderStoreState) =>
  s.activeAiProvider !== id;

const providerWhitelist = new Set(['ollama']);

const isProviderEndpointNotEmpty = (s: UserStore) => {
  const config = activeProviderConfig(s);
  return !!vault?.baseURL || !!vault?.endpoint;
};

/**
 * @description The conditions to enable client fetch
 * 1. If no baseUrl and apikey input, force on Server.
 * 2. If only contains baseUrl, force on Client
 * 3. Follow the user settings.
 * 4. On Server, by default.
 */
const isProviderFetchOnClient =
  (provider: GlobalLLMProviderKey | string) => (s: AIProviderStoreState) => {
    const config = activeProviderConfig(s);

    // If the provider already disable broswer request in model config, force on Server.
    if (isProviderDisableBroswerRequest(provider)) return false;

    // If the provider in the whitelist, follow the user settings
    if (providerWhitelist.has(provider) && typeof config?.fetchOnClient !== 'undefined')
      return config?.fetchOnClient;

    // 1. If no baseUrl and apikey input, force on Server.
    const isProviderEndpointNotEmpty =
      keyVaultsConfigSelectors.isProviderEndpointNotEmpty(provider)(s);
    const isProviderApiKeyNotEmpty = keyVaultsConfigSelectors.isProviderApiKeyNotEmpty(provider)(s);
    if (!isProviderEndpointNotEmpty && !isProviderApiKeyNotEmpty) return false;

    // 2. If only contains baseUrl, force on Client
    if (isProviderEndpointNotEmpty && !isProviderApiKeyNotEmpty) return true;

    // 3. Follow the user settings.
    if (typeof config?.fetchOnClient !== 'undefined') return config?.fetchOnClient;

    // 4. On Server, by default.
    return false;
  };

export const aiProviderSelectors = {
  disabledAiProviderList,
  enabledAiProviderList,
  isAiProviderConfigLoading,
  isProviderEnabled,
  isProviderLoading,
};
