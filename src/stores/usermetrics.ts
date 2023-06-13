import { writable } from '@square/svelte-store';
import { Bypass, Close, Flow, Open } from '../models/user';
import { MetricsListener } from '../sdk/metrics';

interface Event {
    ev: "close" | "bypass" | "open"
    ts: Date
}

export const userMetricsFlow = writable<Flow[]>()
export const userMetricsEvents = writable<Event[]>()

function onFlows (flow: Flow[]) {
    userMetricsFlow.update(arr => {
        arr.push(...flow)
        return arr
    })
}

function onOpen(ts: Open) {
    userMetricsEvents.update(arr => {
        arr.push({
            ev: "open",
            ts,
        })
        return arr;
    })
}

function onBypass(ts: Bypass) {
    userMetricsEvents.update(arr => {
        arr.push({
            ev: "bypass",
            ts,
        })
        return arr;
    })
}

function onClose(ts: Close) {
    userMetricsEvents.update(arr => {
        arr.push({
            ev: "close",
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