import React, { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useTTS } from '@/hooks/useTTS';
import { useChatStore } from '@/store/chat';
import { useFileStore } from '@/store/file';
import { ChatMessageError, ChatTTS } from '@/types/message';
import { TTSHookResult } from '@/types/tts';

import Player from './Player';

export interface TTSProps extends ChatTTS {
  content: string;
  id: string;
  loading?: boolean;
}

const InitPlayer: React.FC<TTSProps> = memo(({ id, content, contentMd5, file }) => {
  const [isStart, setIsStart] = useState(false);
  const [error, setError] = useState<ChatMessageError>();
  const uploadTTS = useFileStore((s) => s.uploadTTSByArrayBuffers);
  const { t } = useTranslation('chat');

  const [ttsMessage, clearTTS] = useChatStore((s) => [s.ttsMessage, s.clearTTS]);

  const setDefaultError = useCallback(
    (err?: any) => {
      setError({ body: err, message: t('tts.responseError', { ns: 'error' }), type: 500 });
    },
    [t],
  );

  const ttsResult = useTTS(content, {
    onError: (err) => {
      ttsResult.stop();
      setDefaultError(err);
    },
    onErrorRetry: (err) => {
      ttsResult.stop();
      setDefaultError(err);
    },
    onSuccess: () => {
      // Success case is handled by the TTS hook internally
    },
    onUpload: async (currentVoice, arrayBuffers) => {
      const fileID = await uploadTTS(id, arrayBuffers);
      ttsMessage(id, { contentMd5, file: fileID, voice: currentVoice });
    },
  }) as TTSHookResult;

  const { isGlobalLoading, start, stop, audio } = ttsResult;

  const handleInitStart = useCallback(() => {
    if (isStart) return;
    start();
    setIsStart(true);
  }, [isStart, start]);

  const handleDelete = useCallback(() => {
    stop();
    clearTTS(id);
  }, [stop, id]);

  const handleRetry = useCallback(() => {
    setError(undefined);
    start();
  }, [start]);

  useEffect(() => {
    if (file) return;
    setTimeout(() => {
      handleInitStart();
    }, 100);
  }, [file]);

  return (
    <Player
      audio={audio}
      error={error}
      isLoading={isGlobalLoading}
      onDelete={handleDelete}
      onInitPlay={handleInitStart}
      onRetry={handleRetry}
    />
  );
});

export default InitPlayer;
