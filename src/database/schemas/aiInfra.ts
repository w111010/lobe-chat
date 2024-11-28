/* eslint-disable sort-keys-fix/sort-keys-fix  */
import { boolean, integer, jsonb, pgTable, primaryKey, text, varchar } from 'drizzle-orm/pg-core';

import { timestamps } from '@/database/schemas/_helpers';
import { users } from '@/database/schemas/user';

export const aiProviders = pgTable(
  'ai_providers',
  {
    id: varchar('id', { length: 64 }).notNull(),
    name: text('name'),

    userId: text('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),

    sort: integer('sort'),
    enabled: boolean('enabled'),
    checkModel: text('check_model'),
    logo: text('logo'),
    // OpenAI /  Anthropic / Gemini API schema
    sdkType: text('sdk_type').default('openai'),
    description: text('description'),

    enabledChatModels: text('enabled_chat_models').array(),
    // need to be encrypted
    keyVaults: text('key_vaults'),
    config: jsonb('config'),

    ...timestamps,
  },
  (table) => [primaryKey({ columns: [table.id, table.userId] })],
);

export type NewAiProviderItem = Omit<typeof aiProviders.$inferInsert, 'userId'>;
export type AiProviderItem = typeof aiProviders.$inferSelect;

export const aiModels = pgTable(
  'ai_models',
  {
    id: varchar('id', { length: 150 }).notNull(),
    displayName: varchar('display_name', { length: 200 }),
    description: text('description'),
    organization: varchar('organization', { length: 100 }),
    type: varchar('type', { length: 20 }).default('chat').notNull(),

    userId: text('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    pricing: jsonb('pricing'),
    parameters: jsonb('parameters').default({}),
    config: jsonb('config'),
    abilities: jsonb('abilities').default({}),
    contextWindowTokens: integer('context_window_tokens'),

    ...timestamps,
  },
  (table) => [primaryKey({ columns: [table.id, table.userId] })],
);

export type NewAiModelItem = Omit<typeof aiModels.$inferInsert, 'userId'>;
export type AiModelItem = typeof aiModels.$inferSelect;
