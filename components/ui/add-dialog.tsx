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

export default function AddDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [streaker, setStreaker] = useState("");

    const handleConfirm = () => {
        // Here you would typically handle the new streaker creation
        console.log("New streaker:", streaker);
        setIsOpen(false);
        setStreaker("");
    };

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
                        <DialogHeader className="justify-start">
                            <DialogTitle>New Streaker</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    autoComplete="off"
                                    id="name"
                                    value={streaker}
                                    onChange={(e) =>
                                        setStreaker(e.target.value)
                                    }
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
                            <Button onClick={handleConfirm}>Confirm</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}
