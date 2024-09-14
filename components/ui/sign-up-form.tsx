import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import PasswordInput from "./input-icon";

export default function SignupForm() {
    return (
        <Card className="mx-auto w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-center text-2xl font-bold">
                    Sign Up
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <PasswordInput />
                        </div>
                        <Button type="submit" className="w-full">
                            Sign Up
                        </Button>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="text-center">
                <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-blue-600 hover:underline"
                    >
                        Log in
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}
