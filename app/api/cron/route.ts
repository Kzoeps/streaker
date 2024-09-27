import { Streak } from "@/actions";
import { sql } from "@vercel/postgres";
export async function POST() {
    const id = "e13d5b68-5775-430c-af50-eefcfdb542b0";
    const data =
        await sql<Streak>`SELECT streakcount FROM Streaks WHERE id = ${id}`;
    const streakcount = data.rows?.[0]?.streakcount ?? 0;
    console.log(streakcount);
    await sql`UPDATE Streaks SET streakcount = ${streakcount + 1} WHERE id = ${id}`;
    return new Response("OK", { status: 200 });
}
