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

export default function LoginForm() {
    return (
        <Card className="mx-auto w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-center text-2xl font-bold">
                    Login
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form name="login">
                    <div className="space-y-4">
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
                            Login
                        </Button>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="text-center">
                <p className="text-sm text-gray-600">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/sign-up"
                        className="text-blue-600 hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}
