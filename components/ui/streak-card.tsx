import { Streak } from "@/actions";
import { isValidUpdate } from "@/utils/misc-utils";
import { toTitleCase } from "@/lib/utils";
import dayjs from "dayjs";
import { Flame } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { StreakCardCheckButton } from "./streak-card-check-button";

export interface StreakCardProps extends Omit<Streak, "userId"> {
    checked: boolean;
}

export default function StreakCard({
    id,
    name,
    streakcount,
    last_completed_at,
}: StreakCardProps) {
    const today = dayjs();
    const lastCompleted = dayjs(last_completed_at);
    return (
        <>
            <Card key={id} className="relative">
                <CardHeader className="pb-2">
                    <CardTitle className="h-9 overflow-hidden text-ellipsis">
                        {toTitleCase(name)}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                            <Flame
                                className={`h-5 w-5 ${
                                    streakcount > 0
                                        ? "text-orange-500"
                                        : "text-gray-300"
                                }`}
                            />
                            <span
                                className={`${
                                    streakcount > 0
                                        ? "text-orange-500"
                                        : "text-gray-300"
                                }`}
                            >
                                {streakcount}
                            </span>
                        </div>
                        <StreakCardCheckButton
                            name={name}
                            last_completed_at={last_completed_at}
                            streakcount={streakcount}
                            id={id}
                            checked={!isValidUpdate(today, lastCompleted)}
                        />
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
