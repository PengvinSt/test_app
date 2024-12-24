import { zodResolver } from '@hookform/resolvers/zod';
import type { ZodRawShape } from 'zod';
import { z } from 'zod';

type ZodObjectRefineArgs = Parameters<
  ReturnType<typeof z.object<ZodRawShape>>['refine']
>;
export const validator = (
  schema: ZodRawShape,
  refineFn: ZodObjectRefineArgs[0] = () => true,
  refineObj?: ZodObjectRefineArgs[1]
) => zodResolver(z.object(schema).refine(refineFn, refineObj));

const numberId = z.number().min(1);
const stringRequired = z.string().min(1);
const zNull = z.null();

export const validation = {
  id: numberId,
  null: zNull,
  number: z.number(),
  numberOrNull: z.union([z.number(), zNull]),
  string: z.string(),
  stringRequired,
  stringOrNull: z.union([z.string(), zNull]),
  email: z.string().email(),
  password: z.string().min(8),
  boolean: z.boolean(),
};
