import { RequestHandler, checkAuth } from '@/app/(backend)/middleware/auth';
import { MinimaxTTS } from '@/core/MinimaxTTS';
import type { MinimaxTTSPayload } from '@/types/tts';

export const runtime = 'edge';

export const preferredRegion = [
  'arn1',
  'bom1',
  'cdg1',
  'cle1',
  'cpt1',
  'dub1',
  'fra1',
  'gru1',
  'hnd1',
  'iad1',
  'icn1',
  'kix1',
  'lhr1',
  'pdx1',
  'sfo1',
  'sin1',
  'syd1',
];

const handler: RequestHandler = async (req, options) => {
  const { jwtPayload } = options;
  const payload = (await req.json()) as MinimaxTTSPayload;
  const { minimax } = jwtPayload;

  if (!minimax?.apiKey || !minimax?.groupId) {
    return new Response('Missing Minimax API key or Group ID', { status: 401 });
  }

  const minimaxTTS = new MinimaxTTS({
    apiKey: minimax.apiKey,
    baseURL: minimax.baseURL,
    groupId: minimax.groupId,
  });

  try {
    return await minimaxTTS.create(payload);
  } catch (error) {
    console.error('Minimax TTS Error:', error);
    return new Response(error instanceof Error ? error.message : 'Unknown error', {
      status: 500,
    });
  }
};

export const POST = checkAuth(handler);
