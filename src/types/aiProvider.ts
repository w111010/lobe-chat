import { z } from 'zod';

import { SmoothingParams } from '@/types/llm';

export interface AiProviderItem {
  /**
   * the default model that used for connection check
   */
  checkModel?: string;
  config: {
    /**
     * whether provider show browser request option by default
     *
     * @default false
     */
    defaultShowBrowserRequest?: boolean;
    /**
     * some provider server like stepfun and aliyun don't support browser request,
     * So we should disable it
     *
     * @default false
     */
    disableBrowserRequest?: boolean;
    proxyUrl?:
      | {
          desc?: string;
          placeholder: string;
          title?: string;
        }
      | false;

    /**
     * whether show api key in the provider config
     * so provider like ollama don't need api key field
     */
    showApiKey?: boolean;

    /**
     * whether show checker in the provider config
     */
    showChecker?: boolean;
    showDeployName?: boolean;
    showModelFetcher?: boolean;
    /**
     * whether to smoothing the output
     */
    smoothing?: SmoothingParams;
  };
  description?: string;
  enabledChatModels: string[];
  /**
   * provider's website url
   */
  homeUrl: string;
  id: string;
  logo?: string;
  /**
   * the url show the all models in the provider
   */
  modelsUrl?: string;
  /**
   * the name show for end user
   */
  name: string;
  /**
   * default openai
   */
  sdkType?: 'openai' | 'anthropic';
}

export const insertAiProviderSchema = z.object({
  checkModel: z.string().optional(),
  config: z.object({}).passthrough(),
  description: z.string().optional(),
  enabledChatModels: z.array(z.string()),
  homeUrl: z.string().optional(),
  id: z.string(),
  logo: z.string().optional(),
  modelsUrl: z.string().optional(),
  name: z.string(),
  sdkType: z.enum(['openai', 'anthropic']).optional(),
});
