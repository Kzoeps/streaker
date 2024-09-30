"use client";

import { Streak } from "@/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, toTitleCase } from "@/lib/utils";
import { getStreakCount, hasAlreadyUpdatedToday } from "@/utils/misc-utils";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { CheckCheck, Flame, Trash2, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { StreakCardCheckButton } from "./streak-card-check-button";
import { DeleteDialog } from "../delete-dialog";
import { Button } from "./button";
import SliderButton from "./slider-button";
import StreaksInfo from "./streaks-info-confirmation";

dayjs.extend(utc);

export interface StreakCardProps extends Omit<Streak, "userid"> {
    checked: boolean;
    timezone?: string;
}

export default function StreakCard({
    id,
    name,
    streakcount,
    last_completed_at,
    timezone,
}: StreakCardProps) {
    const [offset, setOffset] = useState(0);
    const [showDelete, setShowDelete] = useState(false);
    const [showComplete, setShowComplete] = useState(false);
    const today = dayjs().utc();
    const lastCompleted = dayjs(last_completed_at).utc();
    const streakCountForDisplay = getStreakCount(
        today,
        lastCompleted,
        streakcount,
        timezone
    );

    const handlers = useSwipeable({
        onSwiping: (event) => {
            if (
                event.deltaX < 0 &&
                !hasAlreadyUpdatedToday(today, lastCompleted, timezone)
            ) {
                setOffset(Math.max(-150, event.deltaX));
            } else if (event.deltaX > 0) {
                setOffset(Math.min(150, event.deltaX));
            }
        },
        onSwipedLeft: () => {
            if (offset > -100) setOffset(0);
            if (offset <= -100) {
                setTimeout(() => {
                    if (offset < -100) setShowComplete(true);
                }, 250);
            }
        },
        onSwipedRight: () => {
            if (offset < 100) setOffset(0);
            if (offset >= 100) {
                setTimeout(() => {
                    if (offset > 100) setShowDelete(true);
                }, 250);
            }
        },
        trackMouse: true,
    });

    const handleDeleteDialogClose = () => {
        setShowDelete(false);
        setOffset(0);
    };

    const handleCompleteDialogClose = useCallback(() => {
        setShowComplete(false);
        setOffset(0);
    }, []);

    return (
        <div className="">
            <div className="relative overflow-hidden" {...handlers}>
                <div
                    className={cn(
                        "absolute inset-0 box-border flex items-center rounded-xl border bg-green-400 px-4",
                        offset < 0
                            ? "justify-end bg-green-400"
                            : "justify-start bg-red-500"
                    )}
                    aria-hidden="true"
                >
                    {offset < 0 && (
                        <CheckCheck className="h-6 w-6 text-white" />
                    )}
                    {offset > 0 && <Trash2 className="h-6 w-6 text-white" />}
                </div>
                <Card
                    style={{
                        transform: `translateX(${offset}px)`,
                        transition: "transform 0.3s ease-out",
                    }}
                >
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
                                        streakCountForDisplay > 0
                                            ? "text-orange-500"
                                            : "text-gray-300"
                                    }`}
                                />
                                <span
                                    className={`${
                                        streakCountForDisplay > 0
                                            ? "text-orange-500"
                                            : "text-gray-300"
                                    }`}
                                >
                                    {streakCountForDisplay}
                                </span>
                            </div>
                            <StreakCardCheckButton
                                checked={hasAlreadyUpdatedToday(
                                    today,
                                    lastCompleted,
                                    timezone
                                )}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
            {showDelete && (
                <DeleteDialog
                    streakerId={id}
                    isOpen={showDelete}
                    setIsOpen={handleDeleteDialogClose}
                />
            )}
            {showComplete && (
                <div className="fixed inset-0 z-[50]">
                    <Button
                        onClick={handleCompleteDialogClose}
                        className="fixed right-0 top-2 z-30"
                        variant={"ghost"}
                    >
                        <X />
                    </Button>
                    <div className="fixed inset-0 top-1/3 z-30 max-h-48">
                        <StreaksInfo
                            name={name}
                            streakcount={streakCountForDisplay}
                        />
                    </div>
                    <SliderButton
                        id={id}
                        handleComplete={handleCompleteDialogClose}
                    />
                </div>
            )}
        </div>
    );
}
