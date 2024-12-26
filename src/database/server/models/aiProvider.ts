import { and, desc, eq } from 'drizzle-orm/expressions';

import { LobeChatDatabase } from '@/database/type';
import { ModelProvider } from '@/libs/agent-runtime';
import {
  AiProviderDetailItem,
  AiProviderListItem,
  CreateAiProviderParams,
} from '@/types/aiProvider';

import { AiProviderSelectItem, aiProviders } from '../../schemas';

interface AIProviderKeyVaults {
  apiKey?: string;
  proxyUrl?: string;
}
type DecryptUserKeyVaults = (encryptKeyVaultsStr: string | null) => Promise<AIProviderKeyVaults>;

type EncryptUserKeyVaults = (keyVaults: AIProviderKeyVaults) => Promise<string>;

export class AiProviderModel {
  private userId: string;
  private db: LobeChatDatabase;

  constructor(db: LobeChatDatabase, userId: string) {
    this.userId = userId;
    this.db = db;
  }

  create = async (
    { apiKey, proxyUrl, ...params }: CreateAiProviderParams,
    encryptor?: EncryptUserKeyVaults,
  ) => {
    const encrypt = encryptor ?? JSON.stringify;
    const keyVaults = await encrypt({ apiKey, proxyUrl });

    const [result] = await this.db
      .insert(aiProviders)
      .values({
        ...params,
        // each new ai provider we will set it to enabled by default
        enabled: true,
        keyVaults,
        userId: this.userId,
      })
      .returning();

    return result;
  };

  delete = async (id: string) => {
    return this.db
      .delete(aiProviders)
      .where(and(eq(aiProviders.id, id), eq(aiProviders.userId, this.userId)));
  };

  deleteAll = async () => {
    return this.db.delete(aiProviders).where(eq(aiProviders.userId, this.userId));
  };

  query = async () => {
    return this.db.query.aiProviders.findMany({
      orderBy: [desc(aiProviders.updatedAt)],
      where: eq(aiProviders.userId, this.userId),
    });
  };

  getAiProviderList = async (): Promise<AiProviderListItem[]> => {
    const result = await this.db
      .select({
        description: aiProviders.description,
        enabled: aiProviders.enabled,
        id: aiProviders.id,
        logo: aiProviders.logo,
        name: aiProviders.name,
        source: aiProviders.source,
      })
      .from(aiProviders)
      .where(eq(aiProviders.userId, this.userId))
      .orderBy(desc(aiProviders.updatedAt));

    return result as AiProviderListItem[];
  };

  findById = async (id: string) => {
    return this.db.query.aiProviders.findFirst({
      where: and(eq(aiProviders.id, id), eq(aiProviders.userId, this.userId)),
    });
  };

  update = async (id: string, value: Partial<AiProviderSelectItem>) => {
    return this.db
      .update(aiProviders)
      .set({ ...value, updatedAt: new Date() })
      .where(and(eq(aiProviders.id, id), eq(aiProviders.userId, this.userId)));
  };

  toggleProviderEnabled = async (id: string, enabled: boolean) => {
    const isBuiltin = Object.values(ModelProvider).includes(id as any);

    return this.db
      .insert(aiProviders)
      .values({
        enabled,
        id,
        source: isBuiltin ? 'builtin' : 'custom',
        updatedAt: new Date(),
        userId: this.userId,
      })
      .onConflictDoUpdate({
        set: { enabled },
        target: [aiProviders.id, aiProviders.userId],
      });
  };

  updateOrder = async (sortMap: { id: string; sort: number }[]) => {
    await this.db.transaction(async (tx) => {
      const updates = sortMap.map(({ id, sort }) => {
        return tx
          .update(aiProviders)
          .set({ sort, updatedAt: new Date() })
          .where(and(eq(aiProviders.id, id), eq(aiProviders.userId, this.userId)));
      });

      await Promise.all(updates);
    });
  };

  getAiProviderById = async (id: string, decryptor: DecryptUserKeyVaults) => {
    const result = await this.db.query.aiProviders.findFirst({
      where: and(eq(aiProviders.id, id), eq(aiProviders.userId, this.userId)),
    });

    if (!result) throw new Error(`provider ${id} not found`);

    const decrypt = decryptor ?? JSON.parse;

    const keyVaults = await decrypt(result.keyVaults);

    return { ...result, ...keyVaults } as AiProviderDetailItem;
  };
}
