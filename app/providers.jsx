"use client";

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from "next-themes";

export const Providers = ({ children }) => {
    return (
        <SessionProvider>
            <NextUIProvider>
                <NextThemesProvider attribute="class" defaultTheme="dark">
                    {children}
                </NextThemesProvider>
            </NextUIProvider>
        </SessionProvider>
    )
}
