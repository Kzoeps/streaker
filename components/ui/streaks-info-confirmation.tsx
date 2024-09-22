import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame } from "lucide-react";

export default function StreaksInfo() {
    return (
        <div className="flex items-center justify-center p-4">
            <Card className="w-full max-w-sm bg-white/90 shadow-lg backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-2xl font-bold">
                        Daily Meditation
                    </CardTitle>
                    <div className="flex items-center space-x-1 rounded-full bg-orange-500 px-3 py-1">
                        <Flame className="h-5 w-5 text-white" />
                        <span className="font-semibold text-white">7</span>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="mt-2 text-sm text-gray-600">
                        Maintain your daily meditation practice to improve focus
                        and reduce stress.
                    </p>
                    <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                                Progress
                            </span>
                            <span className="text-sm font-semibold">70%</span>
                        </div>
                        <div className="h-2.5 w-full rounded-full bg-gray-200">
                            <div
                                className="h-2.5 rounded-full bg-orange-500"
                                style={{ width: "70%" }}
                            ></div>
                        </div>
                    </div>
                    <p className="mt-4 text-xs text-gray-500">
                        Next milestone: 10 day streak (3 days to go)
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
