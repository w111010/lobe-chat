import { and, desc, eq } from 'drizzle-orm/expressions';

import { LobeChatDatabase } from '@/database/type';

import { AiModelSelectItem, NewAiModelItem, aiModels } from '../../schemas';

export class AiModelModel {
  private userId: string;
  private db: LobeChatDatabase;

  constructor(db: LobeChatDatabase, userId: string) {
    this.userId = userId;
    this.db = db;
  }

  create = async (params: NewAiModelItem) => {
    const [result] = await this.db
      .insert(aiModels)
      .values({ ...params, userId: this.userId })
      .returning();

    return result;
  };

  delete = async (id: string) => {
    return this.db
      .delete(aiModels)
      .where(and(eq(aiModels.id, id), eq(aiModels.userId, this.userId)));
  };

  deleteAll = async () => {
    return this.db.delete(aiModels).where(eq(aiModels.userId, this.userId));
  };

  query = async () => {
    return this.db.query.aiModels.findMany({
      orderBy: [desc(aiModels.updatedAt)],
      where: eq(aiModels.userId, this.userId),
    });
  };

  findById = async (id: string) => {
    return this.db.query.aiModels.findFirst({
      where: and(eq(aiModels.id, id), eq(aiModels.userId, this.userId)),
    });
  };

  update = async (id: string, value: Partial<AiModelSelectItem>) => {
    return this.db
      .update(aiModels)
      .set({ ...value, updatedAt: new Date() })
      .where(and(eq(aiModels.id, id), eq(aiModels.userId, this.userId)));
  };
}
