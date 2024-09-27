"use client";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";

import { SubmitButton } from "./submit-button";
import { useFormState } from "react-dom";
import { deleteStreak } from "@/actions";
import { EMPTY_ZOD_FORM_STATE } from "@/utils/form-state-handlers";
import { useFormToast } from "@/hooks/use-form-toast";

export interface DeleteDialogProps {
    streakerId: string;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}
export const DeleteDialog = ({
    isOpen,
    setIsOpen,
    streakerId,
}: DeleteDialogProps) => {
    const [formState, action] = useFormState(
        deleteStreak,
        EMPTY_ZOD_FORM_STATE
    );
    useFormToast(formState, {
        successCallback: () => {
            setIsOpen(false);
        },
    });
    if (!isOpen) {
        return undefined;
    }
    return (
        <div className="relative">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <div className="fixed inset-0 bg-black opacity-30"></div>
                <DialogContent className="fixed w-full max-w-xs rounded-lg bg-white p-6 sm:max-w-sm">
                    <DialogHeader className="flex justify-start text-left">
                        <DialogTitle>Delete Streaker</DialogTitle>
                        <DialogDescription className="sr-only">
                            Are you sure you want to delete this streaker
                        </DialogDescription>
                    </DialogHeader>
                    <form id="deleteForm" action={action}>
                        <input
                            type="hidden"
                            name="id"
                            value={streakerId}
                            readOnly
                        />
                        <DialogFooter className="flex flex-row justify-end gap-4">
                            <Button
                                variant="outline"
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </Button>
                            <SubmitButton destructive loading={"Deleting"}>
                                Delete
                            </SubmitButton>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};
