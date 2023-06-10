import { z } from 'zod';

export const FlowSchema = z.object({
    end: z.coerce.date(),
    flow: z.number().nonnegative(),
});
export type Flow = z.infer<typeof FlowSchema>;

export const OpenSchema = z.coerce.date();
export type Open = z.infer<typeof OpenSchema>;

export const CloseSchema = OpenSchema;
export type Close = z.infer<typeof CloseSchema>;

export const BypassSchema = CloseSchema;
export type Bypass = z.infer<typeof CloseSchema>;
