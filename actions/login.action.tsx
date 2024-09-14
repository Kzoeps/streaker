"use server";

export async function login(formData: FormData) {
    const raw = {
        email: formData.get("email"),
        password: formData.get("password"),
    };
    console.log(raw);
    return "Login successful";
}

export async function signUp(formData: FormData) {
    const raw = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    };
    console.log(raw);
    return "Sign Up successful";
}
