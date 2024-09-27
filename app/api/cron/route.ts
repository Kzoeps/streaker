import { Streak } from "@/actions";
import { sql } from "@vercel/postgres";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
export async function POST() {
    const data =
        await sql<Streak>`SELECT id, streakcount, last_completed_at FROM Streaks`;
    data.rows.forEach(async ({ id, streakcount, last_completed_at }) => {
        const today = dayjs();
        const lastCompletedAt = dayjs(last_completed_at);
        if (today.diff(lastCompletedAt, "m") > 2 && streakcount !== 0) {
            await sql<Streak>`UPDATE Streaks SET streakcount = ${0} WHERE id = ${id}`;
        }
    });
    return new Response("OK", { status: 200 });
}
