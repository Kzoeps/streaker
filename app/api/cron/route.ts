import { Streak } from "@/actions";
import { getDaysDifference } from "@/utils/misc-utils";
// import { getDaysDifference } from "@/utils/misc-utils";
import { clerkClient } from "@clerk/nextjs/server";
import { sql } from "@vercel/postgres";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
export async function POST(req: Request) {
    if (process.env.CRON_SECRET !== req.headers.get("Authorization")) {
        return new Response("Unauthorized motherfucker!", { status: 401 });
    }
    const data =
        await sql<Streak>`SELECT id, userid, streakcount, last_completed_at FROM Streaks`;
    const userIds = new Set(data.rows.map(({ userid }) => userid));
    const response = await clerkClient().users.getUserList({
        userId: Array.from(userIds),
        limit: 100,
    });
    const { data: users } = response;
    const userMappedTimezone = users.reduce(
        (acc: Record<string, string | undefined>, user) => {
            acc[user.id] = user.unsafeMetadata?.timezone as string | undefined;
            return acc;
        },
        {}
    );
    for (const { id, streakcount, last_completed_at, userid } of data.rows) {
        const today = dayjs().utc();
        const lastCompletedAt = dayjs(last_completed_at).utc();
        const difference = getDaysDifference(
            today,
            lastCompletedAt,
            userMappedTimezone[userid]
        );
        if (difference >= 2 && streakcount !== 0) {
            await sql<Streak>`UPDATE Streaks SET streakcount = ${0} WHERE id = ${id}`;
        }
    }
    return new Response("OK", { status: 200 });
}
