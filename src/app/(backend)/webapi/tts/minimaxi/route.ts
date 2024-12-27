import { NextResponse } from 'next/server';

import { AgentRuntimeErrorType } from '@/libs/agent-runtime/error';
import { LobeMinimaxiAI } from '@/libs/agent-runtime/minimaxi';
import { TextToSpeechPayload } from '@/libs/agent-runtime/types/tts';
import { AgentRuntimeError } from '@/libs/agent-runtime/utils/createError';

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

export const POST = async (req: Request) => {
  try {
    const payload = (await req.json()) as TextToSpeechPayload;

    // Get API key and group ID from environment variables or configuration
    // Get settings from the request headers
    const apiKey = req.headers.get('authorization')?.replace('Bearer ', '');
    const groupId = process.env.MINIMAXI_GROUP_ID; // TODO: Get from user settings

    if (!apiKey || !groupId) {
      throw AgentRuntimeError.createError(
        AgentRuntimeErrorType.InvalidProviderAPIKey,
        'No Minimaxi API key or Group ID provided',
      );
    }

    const minimaxi = new LobeMinimaxiAI({
      apiKey,
      groupId,
    });

    const audioBuffer = await minimaxi.textToSpeech(payload);

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    });
  } catch (error) {
    const errorPayload = AgentRuntimeError.createError(
      AgentRuntimeErrorType.AgentRuntimeError,
      error instanceof Error ? error.message : 'Unknown error',
    );

    return NextResponse.json(errorPayload, { status: 500 });
  }
};
