import { Flame, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Streak } from "@/actions";
import SliderButton from "./slider-button";
import { toTitleCase } from "@/lib/utils";
import StreaksInfo from "./streaks-info-confirmation";
import { StreakCardCheckButton } from "./streak-card-check-button";

export interface StreakCardProps extends Omit<Streak, "userId"> {
    checked: boolean;
}

export default function StreakCard({
    id,
    name,
    streakcount,
    checked,
}: StreakCardProps) {
    return (
        <>
            <Card key={id} className="relative">
                <CardHeader className="pb-2">
                    <CardTitle>{toTitleCase(name)}</CardTitle>
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
                            streakcount={streakcount}
                            id={id}
                            checked={checked}
                        />
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
