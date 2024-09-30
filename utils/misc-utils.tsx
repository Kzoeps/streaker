import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(timezone);

export const getDaysDifference = (
    today: Dayjs,
    lastCompleted: Dayjs,
    timezone?: string
) => {
    if (!lastCompleted.isValid()) return 0;
    if (timezone) {
        const lastCompletedInUserTimezone = lastCompleted
            .tz(timezone)
            .startOf("day");
        const todayInUserTimezone = today.tz(timezone).startOf("day");
        return todayInUserTimezone.diff(lastCompletedInUserTimezone, "d");
    }
    return today.startOf("day").diff(lastCompleted.startOf("day"), "d");
};

/**
 *
 * @param today today in UTC
 * @param lastCompleted lastCompleted in UTC
 * @param timezone timezone of the user
 * @returns
 */
export const hasAlreadyUpdatedToday = (
    today: Dayjs,
    lastCompleted: Dayjs,
    timezone?: string
) => {
    if (!lastCompleted.isValid()) return false;
    const difference = getDaysDifference(today, lastCompleted, timezone);
    return difference < 1;
};

export const getStreakCount = (
    today: Dayjs,
    lastCompleted: Dayjs,
    currentStreakCount: number | undefined,
    timezone?: string
) => {
    if (!lastCompleted.isValid()) return 0;
    const difference = getDaysDifference(today, lastCompleted, timezone);
    if (difference > 2) {
        return 0;
    } else {
        return currentStreakCount ?? 0;
    }
};
