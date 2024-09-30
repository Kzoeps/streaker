"use server";
import {
    FormStatusTypes,
    fromErrorToFormState,
    ZodFormState,
} from "@/utils/form-state-handlers";
import { getStreakCount, hasAlreadyUpdatedToday } from "@/utils/misc-utils";
import { auth } from "@clerk/nextjs/server";
import { sql } from "@vercel/postgres";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { revalidatePath } from "next/cache";
import { z } from "zod";

dayjs.extend(utc);

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
    last_completed_at: string;
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
        const { userId, sessionClaims } = auth();
        const payload = IncreaseStreakSchema.parse({
            id: formData.get("id"),
        });
        const streakData =
            await sql<Streak>`SELECT streakcount, last_completed_at FROM Streaks WHERE userId = ${userId} AND id = ${payload.id}`;
        if (streakData.rowCount) {
            const data = streakData.rows[0];
            const today = dayjs().utc();
            const lastCompletedAt = dayjs(data.last_completed_at).utc();
            if (
                hasAlreadyUpdatedToday(
                    today,
                    lastCompletedAt,
                    sessionClaims?.timezone
                )
            ) {
                throw new Error("Already updated streak for today");
            }
            const updatedStreakCount =
                getStreakCount(
                    today,
                    lastCompletedAt,
                    data.streakcount,
                    sessionClaims?.timezone
                ) + 1;
            await sql`UPDATE Streaks SET streakcount = ${updatedStreakCount}, last_completed_at = NOW() AT TIME ZONE 'UTC' WHERE id = ${payload.id} AND userId = ${userId}`;
            revalidatePath("/dashboard");
            return {
                status: FormStatusTypes.SUCCESS,
                message: `Streak Count: ${updatedStreakCount}`,
                timeStamp: Date.now(),
            };
        }
        throw new Error("Couldn't find streak");
    } catch (e) {
        return fromErrorToFormState(e);
    }
}

const deleteStreakSchema = z.object({
    id: z.string().trim().min(10),
});

export async function deleteStreak(
    formState: ZodFormState,
    formData: FormData
) {
    try {
        const { userId } = auth();
        const payload = deleteStreakSchema.parse({
            id: formData.get("id"),
        });
        await sql`DELETE FROM Streaks WHERE id = ${payload.id} AND userId = ${userId}`;
        revalidatePath("/dashboard");
        return {
            status: FormStatusTypes.SUCCESS,
            message: "Successfully deleted streak",
            timeStamp: Date.now(),
        };
    } catch (e) {
        return fromErrorToFormState(e);
    }
}
