"use client";
import { Step, Steps } from "intro.js-react";
import "intro.js/introjs.css";
// import Joyride, { Step } from "react-joyride";
// const [run, setRun] = useState(false);
// const steps: Step[] = [
//     {
//         target: "#add-streak",
//         content:
//             "Lets start by adding a new streak. Click here to add a new streak.",
//     },
// ];
// useEffect(() => {
//     setRun(true);
// }, []);
export default function Onboarding() {
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
    return (
        <div>
            <Steps
                enabled
                steps={steps}
                initialStep={0}
                onExit={() => {}}
                options={{
                    doneLabel: "Got it!",
                }}
            />
        </div>
    );
}
