import type { Dayjs } from "dayjs";
export const hasAlreadyUpdatedToday = (today: Dayjs, lastCompleted: Dayjs) => {
    if (!lastCompleted.isValid()) return false;
    return today.diff(lastCompleted, "h") < 24;
};
