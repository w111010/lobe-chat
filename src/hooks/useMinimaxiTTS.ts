import { useCallback, useRef } from 'react';

import { MinimaxiTTSOptions } from '../libs/agent-runtime/types/minimaxi';

export const useMinimaxiTTS = (content: string, options: MinimaxiTTSOptions) => {
  const { api, options: ttsOptions } = options;
  const abortControllerRef = useRef<AbortController>();

  const stop = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = undefined;
    }
  }, []);

  const speak = useCallback(async () => {
    try {
      stop();
      abortControllerRef.current = new AbortController();

      const response = await fetch(api.serviceUrl, {
        body: JSON.stringify({
          audio_setting: { format: 'mp3' },
          model: ttsOptions?.model || 'speech-01-turbo',
          stream: false,
          text: content,
          voice_setting: { voice_id: ttsOptions?.voice },
        }),
        headers: api.headers,
        method: 'POST',
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const audioData = data.data?.audio;

      if (!audioData) {
        throw new Error('No audio data in response');
      }

      // Convert base64 to ArrayBuffer
      const binaryString = atob(audioData);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const audio = new Audio();
      const blob = new Blob([bytes], { type: 'audio/mp3' });
      audio.src = URL.createObjectURL(blob);
      await audio.play();

      return audio;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }
      throw error;
    }
  }, [content, options, stop]);

  return {
    error: null,
    isLoading: false,
    speak,
    stop,
  };
};
