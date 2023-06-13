import { writable } from '@square/svelte-store';
import { Bypass, Close, Flow, Open } from '../models/user';
import { MetricsListener } from '../sdk/metrics';

interface MetricEvent {
    ty: "close" | "bypass" | "open" | "flow"
    ts: Date
    flow?: number
}

export const userMetricsFlow = writable<Flow[]>()
export const userMetricsEvents = writable<MetricEvent[]>()

function onFlows (flow: Flow[]) {
    userMetricsFlow.update(arr => {
        arr.push(...flow)
        return arr
    })
    // Assume that any leak event that ends up in userMetricsEvent is a leak.
    const leaks = flow.filter(record => record.flow)
    if (leaks) {
        const eventFmt = leaks.map(leak => {
            return {
                ty: "flow",
                ts: leak.end,
                flow: leak.flow
            } as MetricEvent
        })
        userMetricsEvents.update(arr => {
            arr.push(...eventFmt)
            return arr;
        })
    }
}

function onOpen(ts: Open) {
    userMetricsEvents.update(arr => {
        arr.push({
            ty: "open",
            ts,
        })
        return arr;
    })
}

function onBypass(ts: Bypass) {
    userMetricsEvents.update(arr => {
        arr.push({
            ty: "bypass",
            ts,
        })
        return arr;
    })
}

function onClose(ts: Close) {
    userMetricsEvents.update(arr => {
        arr.push({
            ty: "close",
            ts,
        })
        return arr;
    })
}

export const userMetricsListener: MetricsListener = {
    onFlows,
    onOpen,
    onBypass,
    onClose,
};