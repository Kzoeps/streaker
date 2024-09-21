"use server";
import { auth } from "@clerk/nextjs/server";
import { sql } from "@vercel/postgres";
export async function createStreak(formData: FormData) {
    const { userId } = auth();
    const rawData = {
        name: formData.get("name") || "",
    };
    await sql`INSERT INTO Streaks (id, name, userId) VALUES (${crypto.randomUUID()}, ${rawData.name as string}, ${userId})`;
}
