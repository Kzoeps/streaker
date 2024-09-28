import { Streak } from "@/actions";
import NoStreaks from "@/app/dashboard/splash-no-streaks";
import AddDialog from "@/components/ui/add-dialog";
// import SliderButton from "@/components/ui/slider-button";
import StreakCard from "@/components/ui/streak-card";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { sql } from "@vercel/postgres";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import UpdateTimezone from "./update-timezone";

dayjs.extend(utc);

export default async function Dashboard() {
    const { userId } = auth();
    const data =
        await sql<Streak>`SELECT * FROM Streaks WHERE userId = ${userId}`;
    if (data.rowCount === 0) {
        return <NoStreaks />;
    }
    return (
        <div>
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {data?.rows.map(
                        ({ id, name, streakcount, last_completed_at }) => (
                            <StreakCard
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
