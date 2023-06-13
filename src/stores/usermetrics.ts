import { writable } from '@square/svelte-store';
import { Bypass, Close, Flow, Open } from '../models/user';
import { MetricsListener } from '../sdk/metrics';

interface MetricEvent {
    ty: 'close' | 'bypass' | 'open' | 'flow';
    ts: Date;
    flow?: number;
}

export const userMetricsFlow = writable<Flow[]>([]);
export const userMetricsEvents = writable<MetricEvent[]>([]);

export const userMetricsListener: MetricsListener = {
    onFlows(flows) {
        userMetricsFlow.update(arr => {
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
                } as MetricEvent;
            });
            userMetricsEvents.update(arr => {
                arr.unshift(...eventFmt);
                return arr;
            });
        }
    },
    onOpen(ts) {
        userMetricsEvents.update(arr => {
            arr.unshift({
                ty: 'open',
                ts,
            });
            return arr;
        });
    },
    onBypass(ts) {
        userMetricsEvents.update(arr => {
            arr.unshift({
                ty: 'bypass',
                ts,
            });
            return arr;
        });
    },
    onClose(ts) {
        userMetricsEvents.update(arr => {
            arr.unshift({
                ty: 'close',
                ts,
            });
            return arr;
        });
    },
};
