"use client";

import { Check } from "lucide-react";
import { StreakCardProps } from "./streak-card";
import { useState } from "react";
import SliderButton from "./slider-button";
import StreaksInfo from "./streaks-info-confirmation";
import { Button } from "./button";
import { X } from "lucide-react";

export const StreakCardCheckButton = ({
    checked,
    name,
    streakcount,
}: StreakCardProps) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    return (
        <>
            <button
                onClick={() => setShowConfirmation(true)}
                className={`rounded-full p-1 ${
                    checked ? "bg-green-500" : "bg-gray-200"
                }`}
            >
                <Check className="h-4 w-4 text-white" />
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
                    <SliderButton />
                </>
            )}
        </>
    );
};
