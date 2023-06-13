import COLORS from 'tailwindcss/colors';
import { Granularity } from '../../components/Chart/types.ts';

export enum LogType {
    AUTO_CLOSE,
    MAN_CLOSE,
    OPEN,
}

export const LOG_TYPE_COLORS = {
    [LogType.AUTO_CLOSE]: { bg: COLORS.slate[900], fg: COLORS.white },
    [LogType.MAN_CLOSE]: { bg: COLORS.slate[700], fg: COLORS.white },
    [LogType.OPEN]: { bg: COLORS.white, fg: COLORS.slate[900] },
};

export const LOG_TYPE_TEXT = {
    [LogType.AUTO_CLOSE]: 'Automatically closed valve.',
    [LogType.MAN_CLOSE]: 'Manually closed valve.',
    [LogType.OPEN]: 'Valve has been reopened',
};

export const LOGS = [
    {
        timestamp: new Date(),
        type: LogType.AUTO_CLOSE,
    },
    {
        timestamp: new Date(),
        type: LogType.OPEN,
    },
    {
        timestamp: new Date(),
        type: LogType.MAN_CLOSE,
    },

    {
        timestamp: new Date(),
        type: LogType.OPEN,
    },
    {
        timestamp: new Date(),
        type: LogType.MAN_CLOSE,
    },
    {
        timestamp: new Date(),
        type: LogType.OPEN,
    },
    {
        timestamp: new Date(),
        type: LogType.AUTO_CLOSE,
    },
];

export const GRAN_OPTS = [
    {
        label: '1 hour',
        value: Granularity.HR_1,
    },

    {
        label: '30 mins',
        value: Granularity.MIN_30,
    },

    {
        label: '10 mins',
        value: Granularity.MIN_10,
    },

    {
        label: '5 mins',
        value: Granularity.MIN_5,
    },
    {
        label: '1 min',
        value: Granularity.MIN_1,
    },

    {
        label: '30 secs',
        value: Granularity.SEC_30,
    },
    {
        label: '10 secs',
        value: Granularity.SEC_10,
    },
    // Default
    {
        label: 'Realtime',
        value: Granularity.REALTIME,
    },
];
