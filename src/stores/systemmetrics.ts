import { writable } from '@square/svelte-store';
import { Flow } from '../models/user';
import { MetricsListener } from '../sdk/metrics';

interface SystemMetricEvent {
    ty: 'flow';
    ts: Date;
    flow?: number;
}

export const systemMetricsFlow = writable<Flow[]>([]);
export const systemMetricsEvents = writable<SystemMetricEvent[]>([]);

export const systemMetricsListener: Pick<MetricsListener, 'onFlows'> = {
    onFlows(flows) {
        systemMetricsFlow.update(arr => {
            arr.push(...flows);
            return arr;
        });
        // Assume that any leak event that ends up in userMetricsEvent is a leak.
        const leaks = flows.filter(record => record.flow);
        if (leaks) {
            const eventFmt = leaks.map(leak => {
                return {
                    ty: 'flow',
                    ts: leak.end,
                    flow: leak.flow,
                } as SystemMetricEvent;
            });
            systemMetricsEvents.update(arr => {
                arr.unshift(...eventFmt);
                return arr;
            });
        }
    },
};
