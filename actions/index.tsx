"use server";
import { BaseFormState, FormStatusTypes } from "@/utils/form-state-handlers";
import { auth } from "@clerk/nextjs/server";
import { sql } from "@vercel/postgres";
export async function createStreak(
    formState: BaseFormState,
    formData: FormData
): Promise<BaseFormState> {
    const { userId } = auth();
    const rawData = {
        name: formData.get("name") || "",
    };
    await sql`INSERT INTO Streaks (id, name, userId) VALUES (${crypto.randomUUID()}, ${rawData.name as string}, ${userId})`;
    return {
        status: FormStatusTypes.SUCCESS,
        message: "Successfully created a streak",
    };
}
