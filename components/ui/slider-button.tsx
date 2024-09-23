"use client";

import { addStreak } from "@/actions";
import { useFormToast } from "@/hooks/use-form-toast";
import { cn } from "@/lib/utils";
import {
    EMPTY_ZOD_FORM_STATE,
    FormStatusTypes,
} from "@/utils/form-state-handlers";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";

export interface SliderButtonProps {
    id: string;
    handleComplete: () => void;
}

export default function SliderButton({
    id,
    handleComplete,
}: SliderButtonProps) {
    const [sliderPosition, setSliderPosition] = useState(0);
    const [disableSlider, setDisableSlider] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [formState, action] = useFormState(addStreak, EMPTY_ZOD_FORM_STATE);

    useFormToast(formState);

    const isSliderComplete = () => {
        const slider = sliderRef.current;
        const button = buttonRef.current;
        if (slider && button) {
            return (
                sliderPosition ===
                slider.getBoundingClientRect().width - button.offsetWidth - 8
            );
        }
        return false;
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleStart = (clientX: number) => {
        setIsDragging(true);
    };

    const handleMove = (clientX: number) => {
        if (!isDragging) return;
        const slider = sliderRef.current;
        const button = buttonRef.current;
        if (slider && button && !disableSlider) {
            const sliderRect = slider.getBoundingClientRect();
            const buttonWidth = button.offsetWidth;
            const newPosition = Math.max(
                0,
                Math.min(
                    clientX - sliderRect.left - buttonWidth / 2,
                    sliderRect.width - buttonWidth - 8
                )
            );
            setSliderPosition(newPosition);
        }
    };

    const handleEnd = useCallback(async () => {
        setIsDragging(false);
        if (
            sliderPosition >=
            (sliderRef.current?.offsetWidth || 0) -
                (buttonRef.current?.offsetWidth || 0) -
                10
        ) {
            if (formRef.current) {
                setDisableSlider(true);
                formRef.current.requestSubmit();
            }
        } else {
            setSliderPosition(0);
        }
    }, [sliderPosition]);

    // Touch event handlers
    const handleTouchStart = (e: React.TouchEvent) =>
        handleStart(e.touches[0].clientX);
    const handleTouchMove = (e: React.TouchEvent) =>
        handleMove(e.touches[0].clientX);
    const handleTouchEnd = () => handleEnd();

    // Mouse event handlers
    const handleMouseDown = (e: React.MouseEvent) => handleStart(e.clientX);
    const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
    const handleMouseUp = () => handleEnd();

    useEffect(() => {
        if (formState.status === FormStatusTypes.ERROR) {
            setDisableSlider(false);
            setSliderPosition(0);
        }
        if (formState.status === FormStatusTypes.SUCCESS) {
            setDisableSlider(false);
            handleComplete();
        }
    }, [formState.status, formState.timeStamp, handleComplete]);

    useEffect(() => {
        const handleGlobalMouseUp = () => {
            if (isDragging) {
                handleEnd();
            }
        };
        document.addEventListener("mouseup", handleGlobalMouseUp);
        return () => {
            document.removeEventListener("mouseup", handleGlobalMouseUp);
        };
    }, [isDragging, handleEnd]);

    return (
        <>
            <form ref={formRef} action={action}>
                <input
                    required
                    name="id"
                    type="text"
                    className="hidden"
                    value={id}
                    readOnly
                />
                <div className="fixed bottom-4 left-4 right-4 z-20 mx-auto max-w-md">
                    <div className="fixed inset-0 bg-black opacity-30"></div>
                    <div
                        ref={sliderRef}
                        className={cn(
                            "relative z-50 h-14 cursor-pointer overflow-hidden rounded-full border-4 border-orange-100 bg-orange-100"
                        )}
                    >
                        <div
                            className={cn(
                                "absolute inset-0 z-10 h-12 bg-orange-500 transition-all duration-300 ease-out"
                            )}
                            style={{
                                // width: `${(sliderPosition / (sliderRef.current?.offsetWidth || 1)) * 100}%`,
                                width: `${isDragging || isSliderComplete() ? sliderPosition + (buttonRef.current?.offsetWidth || 2) / 2 : 0}px`,
                            }}
                        />
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                            <span className="font-semibold text-orange-500">
                                Confirm Completion
                            </span>
                        </div>
                        <div
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            ref={buttonRef}
                            className={cn(
                                "absolute z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 ease-out"
                            )}
                            style={{
                                transform: `translateX(${sliderPosition}px)`,
                            }}
                        >
                            {!disableSlider && (
                                <ArrowRight
                                    className={cn("text-orange-500")}
                                    size={24}
                                />
                            )}
                            {disableSlider && (
                                <LoaderCircle className="animate-spin text-orange-400" />
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
