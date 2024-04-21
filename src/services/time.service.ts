'use client';

import dayjs from 'dayjs';
import 'dayjs/locale/de';
import relativeTime from 'dayjs/plugin/relativeTime';

// add relative time plugin, so fromNow() is available
dayjs.extend(relativeTime);

const LOCALE_DE = 'de';
const DD_MM_YYYY_FORMAT = 'DD.MM.YYYY';
const TRANSFORM_FORMAT_LIMIT = 14;

export const timeFromNow = (eventTimestamp: number): string => {
    const now = dayjs();
    const timeOfEvent = dayjs(eventTimestamp);
    // TODO: compare with server time instead of now
    const differenceInDays = now.diff(timeOfEvent, 'days');
    return differenceInDays > TRANSFORM_FORMAT_LIMIT
        ? timeOfEvent.locale(LOCALE_DE).format(DD_MM_YYYY_FORMAT)
        : timeOfEvent.locale(LOCALE_DE).from(now);
};
