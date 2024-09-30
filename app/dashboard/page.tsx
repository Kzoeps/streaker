import { Streak } from "@/actions";
import NoStreaks from "@/app/dashboard/splash-no-streaks";
import AddDialog from "@/components/ui/add-dialog";
import StreakCard from "@/components/ui/streak-card";
import { auth } from "@clerk/nextjs/server";
import { sql } from "@vercel/postgres";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import UpdateTimezone from "./update-timezone";
import Onboarding from "./onboarding";

dayjs.extend(utc);

export default async function Dashboard() {
    const { userId, sessionClaims } = auth();
    const data =
        await sql<Streak>`SELECT *, last_completed_at FROM Streaks WHERE userId = ${userId} ORDER BY created_at DESC`;
    if (data.rowCount === 0) {
        return (
            <div>
                <NoStreaks />
                <Onboarding />
            </div>
        );
    }
    return (
        <div>
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {data?.rows.map(
                        ({ id, name, streakcount, last_completed_at }) => (
                            <StreakCard
                                timezone={sessionClaims?.timezone}
                                key={id}
                                last_completed_at={last_completed_at}
                                id={id}
                                name={name}
                                streakcount={streakcount}
                                checked={false}
                            />
                        )
                    )}
                </div>
            </div>
            <AddDialog />
            <UpdateTimezone />
        </div>
    );
}
