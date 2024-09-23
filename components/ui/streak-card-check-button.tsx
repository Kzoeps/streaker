"use client";

import { Check, Clock } from "lucide-react";
import { StreakCardProps } from "./streak-card";
import { useCallback, useState } from "react";
import SliderButton from "./slider-button";
import StreaksInfo from "./streaks-info-confirmation";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

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
                className={cn(checked && "rounded-full bg-green-500 p-1")}
            >
                {checked && <Check className={"h-4 w-4 text-white"} />}
                {!checked && <Clock className="h-5 w-5 text-orange-500" />}
            </button>
            {showConfirmation && (
                <>
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
                </>
            )}
        </>
    );
};
