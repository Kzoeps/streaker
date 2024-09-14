import { SignUp as SignUpForm } from "@clerk/nextjs";
export default function SignUp() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <SignUpForm />
        </div>
    );
}
