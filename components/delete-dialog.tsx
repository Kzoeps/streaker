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
                    <form id="deleteForm">
                        <input
                            type="hidden"
                            name="streakerId"
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
