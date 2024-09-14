"use server";
export async function createStreak(formData: FormData) {
    const rawData = {
        name: formData.get("name"),
    }
    console.log(rawData)
}