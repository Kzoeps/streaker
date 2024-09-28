import { Button } from "@/components/ui/button";
import { Award, Calendar, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="flex h-14 items-center px-4 lg:px-6">
                <Link className="flex items-center justify-center" href="#">
                    <Zap className="h-6 w-6 text-orange-500" />
                    <span className="sr-only">Streaker</span>
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <Link
                        className="text-sm font-medium underline-offset-4 hover:underline"
                        href="/sign-in"
                    >
                        Login
                    </Link>
                </nav>
            </header>
            <main className="flex-1">
                <section className="w-full bg-orange-500 py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    Build Habits, Maintain Streaks
                                </h1>
                                <p className="mx-auto max-w-[700px] text-white md:text-xl">
                                    Streaker helps you create and maintain daily
                                    habits. Don't break the chain!
                                </p>
                            </div>
                            <div className="space-x-4">
                                <Link href="/sign-up">
                                    <Button className="bg-white text-orange-500 hover:bg-orange-100">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    id="features"
                    className="w-full bg-white py-12 md:py-24 lg:py-32"
                >
                    <div className="container px-4 md:px-6">
                        <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter text-orange-500 sm:text-5xl">
                            Features
                        </h2>
                        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
                            <div className="flex flex-col items-center text-center">
                                <Calendar className="mb-4 h-12 w-12 text-orange-500" />
                                <h3 className="mb-2 text-xl font-bold">
                                    Daily Tracking
                                </h3>
                                <p className="text-gray-500">
                                    Keep track of your habits on a daily basis
                                    with ease.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <TrendingUp className="mb-4 h-12 w-12 text-orange-500" />
                                <h3 className="mb-2 text-xl font-bold">
                                    Streak Monitoring
                                </h3>
                                <p className="text-gray-500">
                                    Watch your streaks grow and stay motivated.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <Award className="mb-4 h-12 w-12 text-orange-500" />
                                <h3 className="mb-2 text-xl font-bold">
                                    Achievements
                                </h3>
                                <p className="text-gray-500">
                                    Earn badges and rewards for consistent habit
                                    maintenance.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <section
                    id="testimonials"
                    className="w-full bg-orange-50 py-12 md:py-24 lg:py-32"
                >
                    <div className="container px-4 md:px-6">
                        <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter text-orange-500 sm:text-5xl">
                            What Our Users Say
                        </h2>
                        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                            <div className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md">
                                <p className="mb-4 text-gray-500">
                                    "Streaker has completely transformed my
                                    daily routine. I've never been more
                                    productive!"
                                </p>
                                <p className="font-bold">- Sarah J.</p>
                            </div>
                            <div className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md">
                                <p className="mb-4 text-gray-500">
                                    "I love how easy it is to track my habits.
                                    The streak feature keeps me motivated every
                                    day."
                                </p>
                                <p className="font-bold">- Mike T.</p>
                            </div>
                            <div className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md">
                                <p className="mb-4 text-gray-500">
                                    "Since using Streaker, I've been able to
                                    read every day for 100 days straight.
                                    Amazing app!"
                                </p>
                                <p className="font-bold">- Emily R.</p>
                            </div>
                        </div>
                    </div>
                </section> */}
                {/* <section
                    id="pricing"
                    className="w-full bg-white py-12 md:py-24 lg:py-32"
                >
                    <div className="container px-4 md:px-6">
                        <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter text-orange-500 sm:text-5xl">
                            Simple Pricing
                        </h2>
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
                                <h3 className="mb-4 text-center text-2xl font-bold">
                                    Free
                                </h3>
                                <p className="mb-4 text-center text-gray-500">
                                    Perfect for getting started
                                </p>
                                <ul className="mb-6 space-y-2">
                                    <li className="flex items-center">
                                        <CheckCircle className="mr-2 text-green-500" />
                                        Track up to 3 habits
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="mr-2 text-green-500" />
                                        Basic streak tracking
                                    </li>
                                </ul>
                                <Button className="mt-auto bg-orange-500 hover:bg-orange-600">
                                    Get Started
                                </Button>
                            </div>
                            <div className="flex flex-col rounded-lg bg-orange-500 p-6 text-white shadow-lg">
                                <h3 className="mb-4 text-center text-2xl font-bold">
                                    Pro
                                </h3>
                                <p className="mb-4 text-center">
                                    For serious habit builders
                                </p>
                                <ul className="mb-6 space-y-2">
                                    <li className="flex items-center">
                                        <CheckCircle className="mr-2 text-white" />
                                        Unlimited habit tracking
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="mr-2 text-white" />
                                        Advanced analytics
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="mr-2 text-white" />
                                        Custom reminders
                                    </li>
                                </ul>
                                <Button className="mt-auto bg-white text-orange-500 hover:bg-orange-100">
                                    Choose Pro
                                </Button>
                            </div>
                            <div className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
                                <h3 className="mb-4 text-center text-2xl font-bold">
                                    Team
                                </h3>
                                <p className="mb-4 text-center text-gray-500">
                                    For groups and organizations
                                </p>
                                <ul className="mb-6 space-y-2">
                                    <li className="flex items-center">
                                        <CheckCircle className="mr-2 text-green-500" />
                                        All Pro features
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="mr-2 text-green-500" />
                                        Team collaboration
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="mr-2 text-green-500" />
                                        Admin dashboard
                                    </li>
                                </ul>
                                <Button className="mt-auto bg-orange-500 hover:bg-orange-600">
                                    Contact Sales
                                </Button>
                            </div>
                        </div>
                    </div>
                </section> */}
                <section className="w-full bg-orange-500 py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
                                    Start Your Streak Today
                                </h2>
                                <Link href={"/sign-up"}>
                                    <Button className="bg-white text-orange-500 hover:bg-orange-100">
                                        Lets get it!!
                                    </Button>
                                </Link>
                            </div>
                            {/* <div className="w-full max-w-sm space-y-2">
                                <form className="flex space-x-2">
                                    <Input
                                        className="max-w-lg flex-1 bg-white text-orange-500"
                                        placeholder="Enter your email"
                                        type="email"
                                    />
                                    <Button
                                        className="bg-white text-orange-500 hover:bg-orange-100"
                                        type="submit"
                                    >
                                        Sign Up
                                    </Button>
                                </form>
                                <p className="text-xs text-white">
                                    By signing up, you agree to our{" "}
                                    <Link
                                        className="underline underline-offset-2"
                                        href="#"
                                    >
                                        Terms & Conditions
                                    </Link>
                                </p>
                            </div> */}
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
                <p className="text-xs text-gray-500">
                    © 2023 Streaker. All rights reserved.
                </p>
                <nav className="flex gap-4 sm:ml-auto sm:gap-6">
                    <Link
                        className="text-xs underline-offset-4 hover:underline"
                        href="#"
                    >
                        Terms of Service
                    </Link>
                    <Link
                        className="text-xs underline-offset-4 hover:underline"
                        href="#"
                    >
                        Privacy
                    </Link>
                </nav>
            </footer>
        </div>
    );
}
