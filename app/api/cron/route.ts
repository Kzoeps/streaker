import { Streak } from "@/actions";
import { sql } from "@vercel/postgres";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
export async function POST(req: Request) {
    console.log(req.headers.get("Authorization"));
    if (process.env.CRON_SECRET === req.headers.get("Authorization")) {
        return new Response("Unauthorized motherfucker!", { status: 401 });
    }
    const data =
        await sql<Streak>`SELECT id, streakcount, last_completed_at FROM Streaks`;
    for (const { id, streakcount, last_completed_at } of data.rows) {
        const today = dayjs();
        const lastCompletedAt = dayjs(last_completed_at);
        if (today.diff(lastCompletedAt, "h") > 48 && streakcount !== 0) {
            console.log("reset"!);
            await sql<Streak>`UPDATE Streaks SET streakcount = ${0} WHERE id = ${id}`;
        }
    }
    return new Response("OK", { status: 200 });
}
