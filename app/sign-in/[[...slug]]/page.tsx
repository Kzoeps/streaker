// import LoginForm from "@/components/ui/login-form";

import { SignIn } from "@clerk/nextjs";

export default function Login() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <SignIn />
        </div>
    );
}
