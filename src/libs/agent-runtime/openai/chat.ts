import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

import { AgentRuntimeErrorType } from '../error';
import {
  ChatCompletionErrorPayload,
  CreateChatCompletionOptions,
  ModelProvider,
} from '../types/type';
import { debugStream } from '../utils/debugStream';
import { DEBUG_CHAT_COMPLETION } from '../utils/env';

export const createChatCompletion = async ({ payload, chatModel }: CreateChatCompletionOptions) => {
  // ============  1. preprocess messages   ============ //
  const { messages, ...params } = payload;

  // ============  2. send api   ============ //

  try {
    const response = await chatModel.chat.completions.create(
      {
        messages,
        ...params,
        stream: true,
      } as unknown as OpenAI.ChatCompletionCreateParamsStreaming,
      { headers: { Accept: '*/*' } },
    );

    const stream = OpenAIStream(response);

    const [debug, prod] = stream.tee();

    if (DEBUG_CHAT_COMPLETION) {
      debugStream(debug).catch(console.error);
    }

    return new StreamingTextResponse(prod);
  } catch (error) {
    let errorType: any = AgentRuntimeErrorType.OpenAIBizError;
    let errorContent: any;

    // Check if the error is an OpenAI APIError
    if (error instanceof OpenAI.APIError) {
      let errorResult: any;

      // if error is definitely OpenAI APIError, there will be an error object
      if (error.error) {
        errorResult = error.error;
      }
      // Or if there is a cause, we use error cause
      // This often happened when there is a bug of the `openai` package.
      else if (error.cause) {
        errorResult = error.cause;
      }
      // if there is no other request error, the error object is a Response like object
      else {
        errorResult = { headers: error.headers, stack: error.stack, status: error.status };
      }

      errorContent = errorResult;
    } else {
      errorContent = JSON.stringify(error);
      errorType = AgentRuntimeErrorType.InternalServerError;
    }

    throw {
      error: errorContent,
      errorType,
      provider: ModelProvider.OpenAI,
    } as ChatCompletionErrorPayload;
  }
};
