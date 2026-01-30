"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ATTENDEES } from "@/lib/missions";
import { MoveRight } from "lucide-react";

export default function Home() {
    const [selectedName, setSelectedName] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedName) {
            // Encode script to be safe
            const encoded = encodeURIComponent(selectedName);
            router.push(`/mission?user=${encoded}`);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-950 to-black">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-yellow-200 drop-shadow-sm">
                        SECRET MICHAEL
                    </h1>
                    <p className="text-neutral-400 text-sm tracking-widest uppercase">
                        Top Secret Clearance Required
                    </p>
                </div>

                <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-neutral-500 ml-1">
                                Identificatie
                            </label>
                            <div className="relative">
                                <select
                                    id="name"
                                    value={selectedName}
                                    onChange={(e) => setSelectedName(e.target.value)}
                                    className="w-full appearance-none bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-gold-500/50 transition-all text-white placeholder-neutral-600"
                                    required
                                >
                                    <option value="" disabled>Selecteer je naam...</option>
                                    {ATTENDEES.sort().map((name) => (
                                        <option key={name} value={name} className="bg-neutral-900">
                                            {name}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={!selectedName}
                            className="group w-full bg-gold-600 hover:bg-gold-500 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-4 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <span>Start Missie</span>
                            <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </div>

                <p className="text-center text-xs text-neutral-600">
                    © 2025 Antigravity Intelligence Agency
                </p>
            </div>
        </main>
    );
}
