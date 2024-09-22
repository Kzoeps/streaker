"use client";
import { Plus } from "lucide-react";
import { cloneElement, ReactElement, useState } from "react";
import { Button } from "./button";

import { AddForm } from "../add-form";

interface AddDialogProps {
    children?: ReactElement;
}
export default function AddDialog({ children }: AddDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const ButtonWithProps =
        children &&
        cloneElement(children, {
            onClick: () => {
                setIsOpen(true);
            },
        });
    return (
        <>
            {children ? (
                ButtonWithProps
            ) : (
                <Button
                    className="fixed bottom-4 right-4 h-12 w-12 rounded-full bg-orange-500 p-0"
                    onClick={() => setIsOpen(true)}
                >
                    <Plus className="h-6 w-6" />
                </Button>
            )}

            <AddForm isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    );
}
