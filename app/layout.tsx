import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Streaker",
    description: "Maintain streaks to maintain yourself",
    authors: {
        name: "kzoeps",
        url: "https://kzoeps.com",
    },
    keywords: ["habits", "streaks", "streaker"],
    openGraph: {
        type: "website",
        url: "https://streaker-mauve.vercel.app",
        description: "Maintain streaks to maintain yourself",
        siteName: "Streaker",
        images: [
            {
                url: "https://streaker-mauve.vercel.app/streaks.jpeg",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Streaker",
        description: "Maintain streaks to maintain yourself",
        creator: "@kzoeps",
        images: ["https://streaker-mauve.vercel.app/streaks.jpeg"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                >
                    {children}
                    <Toaster />
                </body>
            </html>
        </ClerkProvider>
    );
}
