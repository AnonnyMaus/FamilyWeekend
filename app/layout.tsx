import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "HANZINELLE DETECTIVE PROGRAMM",
    description: "Officiële Dossiers & Bewijsmateriaal",
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
