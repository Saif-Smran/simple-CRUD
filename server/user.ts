"use server";

import { db } from "@/db/db";
import { revalidatePath } from "next/cache";
import { UserInsert, UserSelect, users } from "@/db/schema";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";


// fetch all users
export async function getUsers(): Promise<UserSelect[]> {
    try {
        const allUsers = await db.select().from(users);
        return allUsers;
    } catch (err) {
        console.error("getUsers error", err);
        throw new Error("Failed to fetch users");
    }
}

// create a new user
export async function createUser(user: Omit<UserInsert, 'id' | 'updatedAt' | 'createdAt'>): Promise<UserSelect> {
    try {
        // NOTE: In production you should hash the password (e.g. bcrypt). Keeping plain for brevity.
        const inserted = await db
            .insert(users)
            .values({
                id: randomUUID(),
                ...user,
                updatedAt: new Date(),
            })
            .returning();
    const created = inserted[0];
    // Revalidate home page data (UsersTable)
    revalidatePath('/');
    return created;
    } catch (err) {
        console.error("createUser error", err);
        throw new Error("Failed to create user");
    }
}

// update a user
export async function updateUser(id: string, user: Omit<UserInsert, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserSelect | undefined> {
    try {
        // NOTE: In production you should hash the password (e.g. bcrypt). Keeping plain for brevity.
        const updated = await db
            .update(users)
            .set({ ...user, updatedAt: new Date() })
            .where(eq(users.id, id))
            .returning();
        return updated[0];
    } catch (err) {
        console.error("updateUser error", err);
        throw new Error("Failed to update user");
    }
}

// get user by email
export async function getUserByEmail(email: string): Promise<UserSelect | null> {
    try {
        const rows = await db.select().from(users).where(eq(users.email, email));
        return rows[0] ?? null;
    } catch (err) {
        console.error("getUserByEmail error", err);
        throw new Error("Failed to fetch user by email");
    }
}