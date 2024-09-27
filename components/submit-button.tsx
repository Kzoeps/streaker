"use client";
import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./ui/button";
import { ReactElement } from "react";

export const SubmitButton = ({
    children,
    loading,
    destructive,
}: {
    children: ReactElement | string;
    loading?: ReactElement | string;
    destructive?: boolean;
} & ButtonProps) => {
    const { pending } = useFormStatus();
    return (
        <Button
            variant={destructive ? "destructive" : "default"}
            className={!destructive ? "bg-orange-500" : ""}
            disabled={pending}
            type="submit"
        >
            {pending ? loading || children : children}
        </Button>
    );
};
