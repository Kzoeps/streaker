"use client";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "./button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogHeader,
    DialogFooter,
} from "./dialog";
import { Label } from "./label";

import { Input } from "./input";
import { createStreak } from "@/actions";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function AddDialog() {
    const [isOpen, setIsOpen] = useState(false);

    // const handleConfirm = () => {
    //     // Here you would typically handle the new streaker creation
    //     setIsOpen(false);
    // };

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
                        <form action={createStreak}>
                            <div className="grid gap-4 py-4">
                                <div className="flex items-center gap-3">
                                    <Label
                                        htmlFor="name"
                                        className="text-right"
                                    >
                                        Name
                                    </Label>
                                    <Input
                                        autoComplete="off"
                                        id="name"
                                        name="name"
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <DialogFooter className="flex flex-row justify-end gap-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit">Confirm</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}
