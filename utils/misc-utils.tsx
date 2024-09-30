import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(timezone);

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
    if (timezone) {
        const lastCompletedInUserTimezone = lastCompleted.tz(timezone);
        const todayInUserTimezone = today.tz(timezone);
        return todayInUserTimezone.diff(lastCompletedInUserTimezone, "d") < 1;
    }
    return today.diff(lastCompleted, "d") < 1;
};

export const getStreakCount = (
    today: Dayjs,
    lastCompleted: Dayjs,
    currentStreakCount: number | undefined,
    timezone?: string
) => {
    if (!lastCompleted.isValid()) return 0;
    if (timezone) {
        const lastCompletedInUserTimezone = lastCompleted.tz(timezone);
        const todayInUserTimezone = today.tz(timezone);
        if (todayInUserTimezone.diff(lastCompletedInUserTimezone, "d") > 2) {
            return 0;
        } else {
            return currentStreakCount ?? 0;
        }
    }
    if (today.diff(lastCompleted, "d") > 2) {
        return 0;
    } else {
        return currentStreakCount ?? 0;
    }
};
