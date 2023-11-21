import { z } from 'zod'

export const DataApiSchema = z.object({
  sizes: z.object({
    options: z.array(z.string()),
    prices: z.array(z.number()),
  }),
  fruits: z.object({
    options: z.array(z.string()),
    prices: z.array(z.number()),
  }),
  complements: z.object({
    options: z.array(z.string()),
    prices: z.array(z.number()),
  }),
  timeDelivery: z.array(z.number()),
  id: z.string(),
});