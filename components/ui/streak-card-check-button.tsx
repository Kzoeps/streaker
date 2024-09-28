"use client";

import { cn } from "@/lib/utils";
import { ArrowLeftFromLine, Check, ChevronRight } from "lucide-react";
import { StreakCardProps } from "./streak-card";

export interface StreakCardCheckButtonProps extends StreakCardProps {}

export const StreakCardCheckButton = ({
    checked,
}: StreakCardCheckButtonProps) => {
    return (
        <>
            <button
                disabled={checked}
                className={cn(
                    "rounded-full p-1",
                    checked && "bg-green-500",
                    !checked && "border border-gray-300 bg-gray-50"
                )}
            >
                {checked && <Check className={"h-4 w-4 text-white"} />}
                {!checked && (
                    // <ChevronRight className="h-4 w-4 text-orange-500" />
                    <ArrowLeftFromLine className="h-4 w-4 text-orange-500" />
                )}
            </button>
        </>
    );
};
