"use client";
import { useUser } from "@clerk/nextjs";
import { Step, Steps } from "intro.js-react";
import "intro.js/introjs.css";
import { useEffect, useState } from "react";
export default function Onboarding() {
    const [onboarded, setOnboarded] = useState(false);
    const { user, isLoaded } = useUser();
    const steps: Step[] = [
        {
            element: "#streak-0",
            intro: "Drag the streak to the left to complete it",
        },
        {
            element: "#streak-0",
            intro: "you can also drag it to the right to delete it",
        },
        {
            element: "#add-streak",
            intro: "You can always add a new streak by clicking here",
        },
    ];

    useEffect(() => {
        if (isLoaded && user && onboarded) {
            user.update({
                unsafeMetadata: {
                    onboarded: true,
                },
            })
                .then(() => {
                    console.log("onboarded");
                })
                .catch((e) => {
                    console.log("onboarding failed");
                    if (e instanceof Error) {
                        console.error(e.message);
                    }
                });
        }
    }, [isLoaded, user, onboarded]);
    return (
        <div>
            <Steps
                enabled
                steps={steps}
                initialStep={0}
                onExit={() => setOnboarded(true)}
                options={{
                    doneLabel: "Got it!",
                    disableInteraction: true,
                }}
            />
        </div>
    );
}
