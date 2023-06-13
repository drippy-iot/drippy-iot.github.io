import { Bypass, Close, Flow, Open } from '../../models/user';
import { MetricsListener } from '../../sdk/metrics';
import { newFlow } from '../../stores/flow';

function onFlows(flow: Flow[]) {
    newFlow.update(old => {
        old.push(...flow);
        return old;
    });
}

function onOpen(ts: Open) { }

function onBypass(ts: Bypass) { }

function onClose(ts: Close) { }

export const metricsListener: MetricsListener = {
    onFlows,
    onOpen,
    onBypass,
    onClose,
};
