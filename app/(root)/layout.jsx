import { Inter } from "next/font/google";
import "../globals.css";
import { Providers } from "../providers";
import { Navbar } from "@/components/navbar";
import { BgGradient } from "@/components/bg-gradient";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Vision GPT - Analyze Images & Gain Insights Instantly",
    description: "Analyze and understand images in seconds. Get AI-driven insights at your fingertips.",
    icons: {
        icon: '/favicon.png',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <Navbar />
                    <main>
                        {children}
                    </main>
                    <BgGradient />
                </Providers>
            </body>
        </html>
    );
}
