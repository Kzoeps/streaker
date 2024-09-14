"use server";

export async function login(formData: FormData) {
    const raw = {
        email: formData.get("email"),
        password: formData.get("password"),
    };
    console.log(raw);
    return "Login successful";
}
