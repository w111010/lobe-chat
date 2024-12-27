import { FilesConfig, FilesConfigItem } from '@/types/user/settings/filesConfig';

import {
  DEFAULT_EMBEDDING_MODEL,
  DEFAULT_PROVIDER,
  DEFAULT_RERANK_MODEL,
  DEFAULT_RERANK_PROVIDER,
  DEFAULT_RERANK_QUERY_MODE,
} from './llm';

export const DEFAULT_FILE_EMBEDDING_MODEL_ITEM: FilesConfigItem = {
  model: DEFAULT_EMBEDDING_MODEL,
  provider: DEFAULT_PROVIDER,
};

export const DEFAULT_FILE_RERANK_MODEL_ITEM: FilesConfigItem = {
  model: DEFAULT_RERANK_MODEL,
  provider: DEFAULT_RERANK_PROVIDER,
};

export const DEFAULT_FILES_CONFIG: FilesConfig = {
  embedding_model: DEFAULT_FILE_EMBEDDING_MODEL_ITEM,
  query_model: DEFAULT_RERANK_QUERY_MODE,
  reranker_model: DEFAULT_FILE_RERANK_MODEL_ITEM,
};
