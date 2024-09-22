"use server";
import {
    FormStatusTypes,
    fromErrorToFormState,
    ZodFormState,
} from "@/utils/form-state-handlers";
import { auth } from "@clerk/nextjs/server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const Streak = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Name is required")
        .max(35, "Name must be less than 35 characters"),
});

export interface Streak {
    name: string;
    userId: string;
    streakcount: number;
    id: string;
}

export async function createStreak(
    formState: ZodFormState,
    formData: FormData
): Promise<ZodFormState> {
    try {
        const { userId } = auth();
        const data = Streak.parse({
            name: formData.get("name"),
        });
        await sql`INSERT INTO Streaks (id, name, userId) VALUES (${crypto.randomUUID()}, ${data.name as string}, ${userId})`;
        revalidatePath("/dashboard");
        return {
            status: FormStatusTypes.SUCCESS,
            message: "Successfully created a streak",
            timeStamp: Date.now(),
        };
    } catch (e) {
        return fromErrorToFormState(e);
    }
}

const IncreaseStreakSchema = z.object({
    id: z.string().trim().min(10),
});

export async function addStreak(formState: ZodFormState, formData: FormData) {
    try {
        const { userId } = auth();
        const payload = IncreaseStreakSchema.parse({
            id: formData.get("id"),
        });
        const streakData =
            await sql<Streak>`SELECT (streakcount) FROM Streaks WHERE userId = ${userId} AND id = ${payload.id}`;
        if (streakData.rowCount) {
            const streakCount = streakData.rows[0].streakcount;
            return {
                status: FormStatusTypes.SUCCESS,
                message: `Streak Count: ${streakCount}`,
                timeStamp: Date.now(),
            };
            // await sql<Streak>``
        }
        throw new Error("Couldn't find streak");
    } catch (e) {
        return fromErrorToFormState(e);
    }
}
