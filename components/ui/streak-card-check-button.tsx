"use client";

import { cn } from "@/lib/utils";
import { Check, ChevronRight, X } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "./button";
import SliderButton from "./slider-button";
import { StreakCardProps } from "./streak-card";
import StreaksInfo from "./streaks-info-confirmation";

export interface StreakCardCheckButtonProps extends StreakCardProps {}

export const StreakCardCheckButton = ({
    checked,
    name,
    id,
    streakcount,
}: StreakCardCheckButtonProps) => {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleComplete = useCallback(() => {
        setShowConfirmation(false);
    }, []);
    return (
        <>
            <button
                disabled={checked}
                onClick={() => setShowConfirmation(true)}
                className={cn(
                    "rounded-full p-1",
                    checked && "bg-green-500",
                    !checked && "border border-gray-300 bg-gray-50 shadow-xl drop-shadow-lg "
                )}
            >
                {checked && <Check className={"h-4 w-4 text-white"} />}
                {!checked && (
                    <ChevronRight className="h-4 w-4 text-orange-500" />
                )}
            </button>
            {showConfirmation && (
                <div className="fixed inset-0 z-30">
                    <Button
                        onClick={() => setShowConfirmation(false)}
                        className="fixed right-0 top-2 z-30"
                        variant={"ghost"}
                    >
                        <X />
                    </Button>
                    <div className="fixed inset-0 top-1/3 z-30 max-h-48">
                        <StreaksInfo name={name} streakcount={streakcount} />
                    </div>
                    <SliderButton id={id} handleComplete={handleComplete} />
                </div>
            )}
        </>
    );
};
