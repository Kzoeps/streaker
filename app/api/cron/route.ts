import { Streak } from "@/actions";
import { sql } from "@vercel/postgres";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
export async function POST() {
    const id = "01ee322c-7086-492f-b066-5abbbc99175c";
    const data =
        await sql<Streak>`SELECT streakcount FROM Streaks WHERE id = ${id}`;
    const streakcount = data.rows[0]?.streakcount ?? 0;
    const lastCompletedAt = dayjs(data.rows[0]?.last_completed_at);
    const today = dayjs().utc();
    if (!lastCompletedAt.isValid()) {
        return new Response("OK", { status: 200 });
    }
    if (today.diff(lastCompletedAt, "minute") > 10 && streakcount !== 0) {
        await sql<Streak>`UPDATE Streaks SET streakcount = ${0} WHERE id = ${id}`;
    }
    return new Response("OK", { status: 200 });
}
