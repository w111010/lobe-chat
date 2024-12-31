import { type SWRConfiguration } from 'swr';

// Define TTSServer type locally to avoid import issues
export type TTSServer = 'edge' | 'microsoft' | 'openai' | 'minimax';

export interface Response {
  status: number;
  statusText?: string;
  body?: any;
  headers?: Headers;
  ok?: boolean;
  redirected?: boolean;
  type?: ResponseType;
}

export interface TTSOptions extends SWRConfiguration {
  onError?: (error: Error | unknown) => void;
  onErrorRetry?: (error: Error | unknown) => void;
  onSuccess?: (response?: Response) => void;
  onTextChange?: (text: string) => void;
  onFinish?: (arrayBuffers: ArrayBuffer[]) => void;
  onStart?: () => void;
  onStop?: () => void;
}

export interface TTSConfig extends TTSOptions {
  server?: TTSServer;
  voice?: string;
  api?: {
    serviceUrl?: string;
    headers?: Record<string, string>;
  };
  options?: {
    model?: string;
    voice?: string;
    [key: string]: any;
  };
}
