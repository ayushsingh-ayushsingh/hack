"use server";

import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function updateUserName(email: string, name: string) {
    try {
        await db.update(user)
            .set({
                name
            })
            .where(eq(user.email, email))

        console.log(`Name of ${email} updated to ${name}`);

        return { success: true, message: "Name updated" };
    } catch (error) {
        console.log("Could not update name by email", error);
        return { success: true, message: "Failed to update name" };
    }
}

export async function updateUserImage(email: string, imageURL: string) {
    try {
        await db.update(user)
            .set({
                image: imageURL
            })
            .where(eq(user.email, email))

        console.log(`Profile picture of ${email} updated to ${imageURL}`);

        return { success: true, message: "Profile picture updated" };
    } catch (error) {
        console.log("Could not update profile image by email", error);
        return { success: true, message: "Failed to update profile picture" };
    }
}

