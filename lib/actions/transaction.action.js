"use server";

import { redirect } from 'next/navigation';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';
import { updateCredits } from './user.actions';

const prisma = new PrismaClient();

export async function checkoutCredits(transaction) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const amount = Number(transaction.amount) * 100;

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    unit_amount: amount,
                    product_data: {
                        name: transaction.plan,
                    }
                },
                quantity: 1
            }
        ],
        metadata: {
            plan: transaction.plan,
            credits: transaction.credits,
            buyerId: transaction.buyerId,
        },
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/`,
        cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/`,
    });

    redirect(session.url);
}

export async function createTransaction(transaction) {
    try {
        // Create a new transaction with a buyerId
        const newTransaction = await prisma.transaction.create({
            data: {
                createdAt: new Date(),
                stripeId: transaction.stripeId,
                amount: transaction.amount,
                plan: transaction.plan,
                credits: transaction.credits,
                buyer: {
                    connect: { id: transaction.buyerId }
                }
            }
        });

        await updateCredits(transaction.buyerId, transaction.credits);

        return JSON.parse(JSON.stringify(newTransaction));
    } catch (error) {
        if (error instanceof Error) {
            // This is a native JavaScript error (e.g., TypeError, RangeError)
            console.error(error.message);
            throw new Error(`Error: ${error.message}`);
        } else if (typeof error === "string") {
            // This is a string error message
            console.error(error);
            throw new Error(`Error: ${error}`);
        } else {
            // This is an unknown type of error
            console.error(error);
            throw new Error(`Unknown error: ${JSON.stringify(error)}`);
        }
    }
}
