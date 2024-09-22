import { Streak } from "@/actions";
import NoStreaks from "@/app/dashboard/splash-no-streaks";
import AddDialog from "@/components/ui/add-dialog";
// import SliderButton from "@/components/ui/slider-button";
import StreakCard from "@/components/ui/streak-card";
import { auth } from "@clerk/nextjs/server";
import { sql } from "@vercel/postgres";

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
                    {data?.rows?.map(({ id, name, streakCount }, index) => (
                        <StreakCard
                            key={id}
                            id={id}
                            name={name}
                            streakCount={index % 2 === 0 ? streakCount : 3}
                            checked={index % 2 === 1 ? true : false}
                        />
                    ))}
                </div>
                <div>You dont have any streaks yet</div>
            </div>
            <AddDialog />
            {/* <SliderButton /> */}
        </div>
    );
}
