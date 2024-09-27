import type { Dayjs } from "dayjs";
export const isValidUpdate = (today: Dayjs, lastCompleted: Dayjs) => {
    if (!lastCompleted.isValid()) return true;
    return today.diff(lastCompleted, "m") > 1;
};
