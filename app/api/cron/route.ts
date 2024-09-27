import { sql } from "@vercel/postgres";
export async function GET() {
    const id = "e13d5b68-5775-430c-af50-eefcfdb542b0";
    await sql`UPDATE Streaks SET streakcount = 22 WHERE id = ${id}`;
    return new Response("OK", { status: 200 });
}
