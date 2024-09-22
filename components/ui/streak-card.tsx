import { Flame, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Streak } from "@/actions";
import SliderButton from "./slider-button";
import { toTitleCase } from "@/lib/utils";
import StreaksInfo from "./streaks-info-confirmation";

export interface StreakCardProps extends Omit<Streak, "userId"> {
    checked: boolean;
}

export default function StreakCard({
    id,
    name,
    streakCount,
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
                                    streakCount > 0
                                        ? "text-orange-500"
                                        : "text-gray-300"
                                }`}
                            />
                            <span
                                className={`${
                                    streakCount > 0
                                        ? "text-orange-500"
                                        : "text-gray-300"
                                }`}
                            >
                                {streakCount}
                            </span>
                        </div>
                        <button
                            className={`rounded-full p-1 ${
                                checked ? "bg-green-500" : "bg-gray-200"
                            }`}
                        >
                            <Check className="h-4 w-4 text-white" />
                        </button>
                    </div>
                </CardContent>
            </Card>
            <div className="absolute inset-0 top-1/3 z-30">
                <StreaksInfo name={name} streakCount={0} />
            </div>
            <SliderButton />
        </>
    );
}
