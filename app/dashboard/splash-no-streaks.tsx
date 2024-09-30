import { Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddDialog from "@/components/ui/add-dialog";

export default function NoStreaks() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-200 p-4">
            <div className="text-center">
                <Flame className="mx-auto mb-6 h-24 w-24 text-orange-500" />
                <h1 className="mb-4 text-2xl font-bold text-gray-800">
                    No streaks yet
                </h1>
                <p className="mb-8 text-lg text-gray-600">
                    Create one and start streaking!
                </p>
                <AddDialog>
                    <Button id="add-streak" className="transform rounded-full bg-orange-500 px-4 py-2 font-bold text-white shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-orange-600">
                        Start Streaking
                    </Button>
                </AddDialog>
            </div>
        </div>
    );
}
