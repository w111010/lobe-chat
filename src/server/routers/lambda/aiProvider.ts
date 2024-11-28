import { z } from 'zod';

import { serverDB } from '@/database/server';
import { AiProviderModel } from '@/database/server/models/aiProvider';
import { authedProcedure, router } from '@/libs/trpc';
import { insertAiProviderSchema } from '@/types/aiProvider';

const aiProviderProcedure = authedProcedure.use(async (opts) => {
  const { ctx } = opts;

  return opts.next({
    ctx: {
      aiProviderModel: new AiProviderModel(serverDB, ctx.userId),
    },
  });
});

export const aiProviderRouter = router({
  createAiProvider: aiProviderProcedure
    .input(insertAiProviderSchema)
    .mutation(async ({ input, ctx }) => {
      const data = await ctx.aiProviderModel.create(input);

      return data?.id;
    }),

  removeAiProvider: aiProviderProcedure
    .input(z.object({ id: z.string(), removeModels: z.boolean().optional() }))
    .mutation(async ({ input, ctx }) => {
      return ctx.aiProviderModel.delete(input.id);
    }),

  removeAllAiProviders: aiProviderProcedure.mutation(async ({ ctx }) => {
    return ctx.aiProviderModel.deleteAll();
  }),

  updateAiProvider: aiProviderProcedure
    .input(
      z.object({
        id: z.string(),
        value: insertAiProviderSchema.partial(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.aiProviderModel.update(input.id, input.value);
    }),

  updateAiProviderOrder: aiProviderProcedure
    .input(
      z.object({
        sortMap: z.array(
          z.object({
            id: z.string(),
            sort: z.number(),
          }),
        ),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.aiProviderModel.updateOrder(input.sortMap);
    }),
});

export type AiProviderRouter = typeof aiProviderRouter;
