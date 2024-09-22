"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { ReactElement } from "react";

export const SubmitButton = ({
    children,
    loading,
}: {
    children: ReactElement | string;
    loading?: ReactElement | string;
}) => {
    const { pending } = useFormStatus();
    return (
        <Button className="bg-orange-500" disabled={pending} type="submit">
            {pending ? loading || children : children}
        </Button>
    );
};
