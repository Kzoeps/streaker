"use client";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./dialog";
import { Label } from "./label";

import { createStreak } from "@/actions";
import { FormStatusTypes } from "@/utils/form-state-handlers";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useFormState } from "react-dom";
import { SubmitButton } from "../submit-button";
import { Input } from "./input";
import { FieldError } from "../field-error";
import { useToast } from "@/hooks/use-toast";

export default function AddDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [formState, action] = useFormState(createStreak, {
        status: FormStatusTypes.NA,
        message: null,
    });
    const { toast } = useToast();

    useEffect(() => {
        if (formState.status === FormStatusTypes.SUCCESS) {
            setIsOpen(false);
        }
        if (formState.message) {
            toast({
                title: formState.message,
                variant:
                    formState.status === FormStatusTypes.ERROR
                        ? "destructive"
                        : "default",
            });
        }
    }, [formState.message, formState.status, toast]);
    return (
        <>
            <Button
                className="fixed bottom-4 right-4 h-12 w-12 rounded-full p-0"
                onClick={() => setIsOpen(true)}
            >
                <Plus className="h-6 w-6" />
            </Button>

            {isOpen && (
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <div className="fixed inset-0 bg-black opacity-30"></div>
                    <DialogContent className="fixed w-full max-w-xs rounded-lg bg-white p-6 sm:max-w-sm">
                        <DialogHeader className="flex justify-start text-left">
                            <DialogTitle>New Streaker</DialogTitle>
                            <DialogDescription className="sr-only">
                                Create a new streaker
                            </DialogDescription>
                        </DialogHeader>
                        <form action={action}>
                            <div className="grid py-4">
                                <div className="flex items-center gap-3">
                                    <Label
                                        htmlFor="name"
                                        className="text-right"
                                    >
                                        Name
                                    </Label>
                                    <Input
                                        // required
                                        // max={35}
                                        autoComplete="off"
                                        id="name"
                                        name="name"
                                        className="col-span-3"
                                    />
                                </div>
                                <FieldError formState={formState} name="name" />
                            </div>
                            <DialogFooter className="flex flex-row justify-end gap-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <SubmitButton loading={"Adding"}>
                                    Add
                                </SubmitButton>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}
