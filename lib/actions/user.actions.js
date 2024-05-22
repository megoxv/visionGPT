"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// READ
export async function getUserById(userId) {
    try {
        const user = await prisma.user.findUnique({
            where: { userId: userId },
        });

        if (!user) throw new Error("User not found");

        return user;
    } catch (error) {
        handleError(error);
    }
}

// UPDATE
export async function updateUser(userId, user) {
    try {
        const updatedUser = await prisma.user.update({
            where: { userId },
            data: user,
        });

        if (!updatedUser) throw new Error("User update failed");

        return updatedUser;
    } catch (error) {
        handleError(error);
    }
}


// USE CREDITS
export async function updateCredits(userId, creditFee) {
    try {
        const updatedUserCredits = await prisma.user.update({
            where: { id: userId },
            data: {
                creditBalance: {
                    increment: creditFee,
                },
            },
        });

        if (!updatedUserCredits) throw new Error("User credits update failed");

        return updatedUserCredits;
    } catch (error) {
        handleError(error);
    }
}
