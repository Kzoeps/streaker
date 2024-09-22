"use client";

import { AddForm } from "@/components/add-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const AddButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                className="transform rounded-full bg-orange-500 px-4 py-2 font-bold text-white shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-orange-600"
            >
                Start Streaking
            </Button>
            <AddForm isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    );
};
