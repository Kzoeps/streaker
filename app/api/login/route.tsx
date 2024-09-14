import { NextRequest } from "next/server";

export default async function POST(req: NextRequest) {
    const { email, password } = await req.json();
    console.log(email, password)
    return new Response("Login successful");
}