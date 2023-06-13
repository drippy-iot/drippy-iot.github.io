import { Bypass, Close, Flow, Open } from '../../models/user';
import { MetricsListener } from '../../sdk/metrics';

function onFlows(flow: Flow[]) { }

function onOpen(ts: Open) { }

function onBypass(ts: Bypass) { }

function onClose(ts: Close) { }

export const metricsListener: MetricsListener = {
    onFlows,
    onOpen,
    onBypass,
    onClose,
};
