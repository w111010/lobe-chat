export class MinimaxTTS {
  private apiKey: string;
  private baseURL?: string;
  private groupId: string;

  constructor({ apiKey, baseURL, groupId }: { apiKey: string; baseURL?: string; groupId: string }) {
    this.apiKey = apiKey;
    this.baseURL = baseURL;
    this.groupId = groupId;
  }

  async create(payload: any) {
    const response = await fetch(this.baseURL || 'https://api.minimax.chat/v1/t2a_v2', {
      body: JSON.stringify({
        ...payload,
        group_id: this.groupId,
      }),
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`Minimax TTS Error: ${response.statusText}`);
    }

    return response;
  }
}
