import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Secret Michael",
    description: "Jouw geheime missie voor het familieweekend",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="nl">
            <body className="antialiased min-h-screen bg-neutral-950 text-neutral-100 selection:bg-gold-500 selection:text-black">
                {children}
            </body>
        </html>
    );
}
