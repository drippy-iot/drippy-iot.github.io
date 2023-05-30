import { z } from 'zod';

export const FlowSchema = z.object({
    ty: z.literal('flow'),
    ts: z.coerce.date(),
    flow: z.number().int().nonnegative(),
});
export type Flow = z.infer<typeof FlowSchema>;

export const LeakSchema = z.object({
    ty: z.literal('leak'),
    ts: z.coerce.date(),
});
export type Leak = z.infer<typeof LeakSchema>;

export const ControlSchema = z.object({
    ty: z.literal('control'),
    ts: z.coerce.date(),
    shutdown: z.boolean(),
});
export type Control = z.infer<typeof ControlSchema>;

export const UserMessageSchema = z.discriminatedUnion('ty', [
    FlowSchema,
    LeakSchema,
    ControlSchema,
]);
export type UserMessage = z.infer<typeof UserMessageSchema>;
