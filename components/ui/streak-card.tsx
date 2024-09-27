// "use client";
// import { Streak } from "@/actions";
// import { toTitleCase } from "@/lib/utils";
// import { isValidUpdate } from "@/utils/misc-utils";
// import dayjs from "dayjs";
// import { Flame } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "./card";
// import { StreakCardCheckButton } from "./streak-card-check-button";

// export interface StreakCardProps extends Omit<Streak, "userId"> {
//     checked: boolean;
// }

// export default function StreakCard({
//     id,
//     name,
//     streakcount,
//     last_completed_at,
// }: StreakCardProps) {
//     const today = dayjs();
//     const lastCompleted = dayjs(last_completed_at);
//     return (
//         <>
//             <Card key={id} className="relative">
//                 <CardHeader className="pb-2">
//                     <CardTitle className="h-9 overflow-hidden text-ellipsis">
//                         {toTitleCase(name)}
//                     </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-1">
//                             <Flame
//                                 className={`h-5 w-5 ${
//                                     streakcount > 0
//                                         ? "text-orange-500"
//                                         : "text-gray-300"
//                                 }`}
//                             />
//                             <span
//                                 className={`${
//                                     streakcount > 0
//                                         ? "text-orange-500"
//                                         : "text-gray-300"
//                                 }`}
//                             >
//                                 {streakcount}
//                             </span>
//                         </div>
//                         <StreakCardCheckButton
//                             name={name}
//                             last_completed_at={last_completed_at}
//                             streakcount={streakcount}
//                             id={id}
//                             checked={!isValidUpdate(today, lastCompleted)}
//                         />
//                     </div>
//                 </CardContent>
//             </Card>
//         </>
//     );
// }

"use client";

import { Streak } from "@/actions";
import { isValidUpdate } from "@/utils/misc-utils";
import dayjs from "dayjs";
import { Flame, Trash2 } from "lucide-react";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StreakCardCheckButton } from "./streak-card-check-button";
import { cn } from "@/lib/utils";

export interface StreakCardProps extends Omit<Streak, "userId"> {
    checked: boolean;
    onDelete: (id: string) => void;
}

function toTitleCase(str: string): string {
    return str.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
}

export default function StreakCard({
    id,
    name,
    streakcount,
    last_completed_at,
    onDelete,
}: StreakCardProps) {
    const [offset, setOffset] = useState(0);
    const today = dayjs();
    const lastCompleted = dayjs(last_completed_at);

    const handlers = useSwipeable({
        onSwiping: (event) => {
            if (event.deltaX < 0) {
                setOffset(Math.max(-100, event.deltaX));
            }
        },
        onSwipedLeft: () => {
            if (offset > -100) setOffset(0);
        },
        onSwipedRight: () => {
            setOffset(0);
        },
        trackMouse: true,
    });

    return (
        <div className="relative overflow-hidden" {...handlers}>
            <div
                className={cn(
                    "absolute inset-0 box-border flex items-center justify-end rounded-xl border bg-red-400 px-4"
                )}
                aria-hidden="true"
            >
                <Trash2 className="h-6 w-6 text-white" />
            </div>
            <div
                style={{
                    transform: `translateX(${offset}px)`,
                    transition: "transform 0.3s ease-out",
                }}
            >
                <Card className="relative">
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
                                onDelete={onDelete}
                                checked={!isValidUpdate(today, lastCompleted)}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
            {offset === -100 && (
                <button
                    className="absolute inset-0 z-10"
                    onClick={() => onDelete(id)}
                    aria-label="Delete streak"
                />
            )}
        </div>
    );
}
