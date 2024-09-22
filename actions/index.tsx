"use server";
import {
    FormStatusTypes,
    fromErrorToFormState,
    ZodFormState,
} from "@/utils/form-state-handlers";
import { auth } from "@clerk/nextjs/server";
import { sql } from "@vercel/postgres";
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
    streakCount: number;
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
        return {
            status: FormStatusTypes.SUCCESS,
            message: "Successfully created a streak",
            timeStamp: Date.now(),
        };
    } catch (e) {
        return fromErrorToFormState(e);
    }
}
