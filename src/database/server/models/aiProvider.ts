import { and, desc, eq } from 'drizzle-orm/expressions';

import { LobeChatDatabase } from '@/database/type';

import { AiProviderItem, NewAiProviderItem, aiProviders } from '../../schemas';

export class AiProviderModel {
  private userId: string;
  private db: LobeChatDatabase;

  constructor(db: LobeChatDatabase, userId: string) {
    this.userId = userId;
    this.db = db;
  }

  create = async (params: NewAiProviderItem) => {
    const [result] = await this.db
      .insert(aiProviders)
      .values({ ...params, userId: this.userId })
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

  findById = async (id: string) => {
    return this.db.query.aiProviders.findFirst({
      where: and(eq(aiProviders.id, id), eq(aiProviders.userId, this.userId)),
    });
  };

  update = async (id: string, value: Partial<AiProviderItem>) => {
    return this.db
      .update(aiProviders)
      .set({ ...value, updatedAt: new Date() })
      .where(and(eq(aiProviders.id, id), eq(aiProviders.userId, this.userId)));
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
}
