import COLORS from 'tailwindcss/colors';
import type { Option } from '../../components/Select/types.ts';

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

export const OPTIONS: Option[] = [
    'co:de:ba:be',
    '00:00:00:00',
    'ad:ad:ad:ad',
    '11:11:11:11',
];

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
