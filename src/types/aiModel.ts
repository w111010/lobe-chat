export type ModelPriceCurrency = 'CNY' | 'USD';

// 语言模型的设置参数
export interface LLMParams {
  /**
   * 控制生成文本中的惩罚系数，用于减少重复性
   * @default 0
   */
  frequency_penalty?: number;
  /**
   * 生成文本的最大长度
   */
  max_tokens?: number;
  /**
   * 控制生成文本中的惩罚系数，用于减少主题的变化
   * @default 0
   */
  presence_penalty?: number;
  /**
   * 生成文本的随机度量，用于控制文本的创造性和多样性
   * @default 1
   */
  temperature?: number;
  /**
   * 控制生成文本中最高概率的单个 token
   * @default 1
   */
  top_p?: number;
}

export interface ChatModelPricing {
  cachedInput?: number;
  /**
   * the currency of the pricing
   * @default USD
   */
  currency?: ModelPriceCurrency;
  /**
   * the input pricing, e.g. $1 / 1M tokens
   */
  input?: number;
  /**
   * the output pricing, e.g. $2 / 1M tokens
   */
  output?: number;
  writeCacheInput?: number;
}

interface AIBaseModelCard {
  /**
   * the context window (or input + output tokens limit)
   */
  contextWindowTokens?: number;
  description?: string;
  /**
   * the name show for end user
   */
  displayName?: string;

  id: string;
  /**
   * whether model is legacy (deprecated but not removed yet)
   */
  legacy?: boolean;
  /**
   * who create this model
   */
  organization?: string;

  releasedAt?: string;
}

export interface AIChatModelCard extends AIBaseModelCard {
  abilities?: {
    /**
     * whether model supports file upload
     */
    files?: boolean;
    /**
     * whether model supports function call
     */
    functionCall?: boolean;
    /**
     *  whether model supports vision
     */
    vision?: boolean;
  };
  /**
   * used in azure and doubao
   */
  deploymentName?: string;
  maxOutput?: number;
  pricing?: ChatModelPricing;
  type: 'chat';
}

export interface AIEmbeddingModelCard extends AIBaseModelCard {
  maxDimension: number;
  pricing?: {
    /**
     * the currency of the pricing
     * @default USD
     */
    currency?: ModelPriceCurrency;
    /**
     * the input pricing, e.g. $1 / 1M tokens
     */
    input?: number;
  };
  type: 'embedding';
}
