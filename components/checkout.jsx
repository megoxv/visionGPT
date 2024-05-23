"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

import { checkoutCredits } from "@/lib/actions/transaction.action";
import { Button } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";

const Checkout = ({ plan, amount, credits, isMostPop }) => {
    const { data: session } = useSession();

    const [buyerId, setBuyerId] = useState(null);

    useEffect(() => {
        loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    }, []);

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);

        if (query.get("success")) {
            toast.success("Order placed! You will receive an email confirmation", {
                duration: 5000,
            });
        }

        if (query.get("canceled")) {
            toast.error("Order canceled! Continue to shop around and checkout when you're ready", {
                duration: 5000,
            });
        }
    }, []);

    useEffect(() => {
        if (session && session.user) {
            setBuyerId(session.user.id);
        }
    }, [session]);

    const onCheckout = async () => {
        const transaction = {
            plan,
            amount,
            credits,
            buyerId,
        };

        await checkoutCredits(transaction);
    };

    return (
        <form action={onCheckout} method="POST" className="w-full">
            <section>
                {
                    session ? (
                        <Button
                            color={isMostPop ? 'secondary' : 'default'}
                            type="submit"
                            role="link"
                            fullWidth
                        >
                            Buy Credit
                        </Button>
                    ) : (
                        <Button onClick={() => signIn('google')} color="secondary" fullWidth>
                            Buy Credit
                        </Button>
                    )
                }
            </section>
        </form>
    );
};

export default Checkout;
