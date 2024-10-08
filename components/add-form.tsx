"use client";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";

import { createStreak } from "@/actions";
import { useFormToast } from "@/hooks/use-form-toast";
import { FormStatusTypes } from "@/utils/form-state-handlers";
import { useFormState } from "react-dom";
import { FieldError } from "./field-error";
import { SubmitButton } from "./submit-button";
import { Input } from "./ui/input";

export interface AddFormProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}
export const AddForm = ({ isOpen, setIsOpen }: AddFormProps) => {
    const [formState, action] = useFormState(createStreak, {
        status: FormStatusTypes.NA,
        message: null,
        timeStamp: Date.now(),
    });
    useFormToast(formState);

    useEffect(() => {
        if (formState.status === FormStatusTypes.SUCCESS) {
            setIsOpen(false);
        }
    }, [formState.timeStamp, setIsOpen, formState.status]);
    if (!isOpen) {
        return undefined;
    }
    return (
        <div id="add-form" className="relative">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <div className="fixed inset-0 bg-black opacity-30"></div>
                <DialogContent className="fixed top-1/4 w-full max-w-xs rounded-lg bg-white p-6 sm:max-w-sm">
                    <DialogHeader className="flex justify-start text-left">
                        <DialogTitle>New Streaker</DialogTitle>
                        <DialogDescription className="sr-only">
                            Create a new streaker
                        </DialogDescription>
                    </DialogHeader>
                    <form id="addForm" action={action}>
                        <div className="grid py-4">
                            <div className="flex items-center gap-3">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    required
                                    max={35}
                                    autoComplete="off"
                                    id="name"
                                    name="name"
                                    className="col-span-3"
                                />
                            </div>
                            <FieldError formState={formState} name="name" />
                        </div>
                        {/* for on enter */}
                        <input type="submit" className="hidden" />
                        <DialogFooter className="flex flex-row justify-end gap-4">
                            <Button
                                variant="outline"
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </Button>
                            <SubmitButton loading={"Adding"}>Add</SubmitButton>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};
