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
        <Button disabled={pending} type="submit">
            {pending ? loading || children : children}
        </Button>
    );
};
