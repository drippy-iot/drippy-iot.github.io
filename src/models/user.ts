import { z } from 'zod';

export const PingSchema = z.object({
    ty: z.literal('flow'),
    ts: z.coerce.date(),
    flow: z.number().int().nonnegative(),
    leak: z.boolean(),
});
export type Ping = z.infer<typeof PingSchema>;

export const OpenSchema = z.object({
    ty: z.literal('open'),
    ts: z.coerce.date(),
});
export type Open = z.infer<typeof OpenSchema>;

export const CloseSchema = z.object({
    ty: z.literal('close'),
    ts: z.coerce.date(),
});
export type Close = z.infer<typeof CloseSchema>;

export const BypassSchema = z.object({
    ty: z.literal('bypass'),
    ts: z.coerce.date(),
});
export type Bypass = z.infer<typeof CloseSchema>;

export const UserMessageSchema = z.discriminatedUnion('ty', [
    PingSchema,
    OpenSchema,
    CloseSchema,
    BypassSchema,
]);
export type UserMessage = z.infer<typeof UserMessageSchema>;
