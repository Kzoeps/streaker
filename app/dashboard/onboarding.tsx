"use client";
import { useEffect, useState } from "react";
import Joyride from "react-joyride";

const steps = [
    {
        target: "#add-streak",
        content:
            "Lets start by adding a new streak. Click here to add a new streak.",
    },
];
export default function Onboarding() {
    const [run, setRun] = useState(false);
    useEffect(() => {
        setRun(true);
    }, []);
    return <Joyride run={run} steps={steps} />;
}
