"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ATTENDEES } from "@/lib/missions";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
    const [selectedName, setSelectedName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const passwordInputRef = useRef<HTMLInputElement>(null);

    // Focus password input when it appears
    useEffect(() => {
        if (showPassword && passwordInputRef.current) {
            passwordInputRef.current.focus();
        }
    }, [showPassword]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedName) return;

        if (selectedName === "Quentin" || selectedName === "Kim") {
            setShowPassword(true);
            return;
        }

        const encoded = encodeURIComponent(selectedName);
        router.push(`/mission?user=${encoded}`);
    };

    const handleSecurityCheck = (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedName === "Quentin" && password === "3090") {
            router.push("/admin");
        } else if (selectedName === "Kim" && password === "6767") {
            router.push("/leaderboard");
        } else {
            alert("Toegang geweigerd: Verkeerde code");
            setPassword("");
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-neutral-950 overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800/20 via-transparent to-transparent opacity-40 pointer-events-none" />

            <AnimatePresence mode="wait">
                {!showPassword ? (
                    <motion.div
                        key="login-form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                        className="z-10 w-full max-w-sm"
                    >
                        <div className="text-center mb-12 space-y-4">
                            <h1 className="text-3xl md:text-5xl font-serif text-white tracking-tighter leading-tight">
                                HANZINELLE<br /><span className="text-gold-500">DETECTIVE PROGRAM</span>
                            </h1>
                            <p className="text-neutral-500 font-mono text-xs tracking-[0.3em] uppercase">Authorized Personnel Only</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs text-neutral-500 uppercase tracking-wider ml-1">Identificatie</label>
                                <div className="relative">
                                    <select
                                        value={selectedName}
                                        onChange={(e) => setSelectedName(e.target.value)}
                                        required
                                        className="w-full appearance-none bg-neutral-900/50 border border-neutral-800 focus:border-gold-500/50 rounded-lg p-4 text-white outline-none transition-colors cursor-pointer"
                                    >
                                        <option value="" disabled>Selecteer je naam...</option>
                                        {ATTENDEES.sort().map((name) => (
                                            <option key={name} value={name}>{name}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={!selectedName}
                                className="w-full bg-gold-600 hover:bg-gold-500 disabled:opacity-50 disabled:cursor-not-allowed text-neutral-950 font-bold py-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(234,179,8,0.1)]"
                            >
                                Verder
                            </button>
                        </form>

                        <div className="mt-16 text-center opacity-30">
                            <img src="/logo.svg" alt="" className="w-12 h-12 mx-auto mb-4 grayscale hidden" />
                            <p className="text-[10px] text-neutral-600 font-mono">
                                SECURE CONNECTION ESTABLISHED<br />
                                ENCRYPTION LEVEL: MAX
                            </p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="password-form"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="z-10 w-full max-w-sm"
                    >
                        <div className="text-center mb-12 space-y-4">
                            <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tighter">
                                SECURITY
                            </h1>
                            <p className="text-gold-500 font-mono text-xs tracking-[0.3em] uppercase">Enter Clearance Code</p>
                        </div>

                        <form onSubmit={handleSecurityCheck} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs text-neutral-500 uppercase tracking-wider ml-1">Pin Code for {selectedName}</label>
                                <input
                                    ref={passwordInputRef}
                                    type="password"
                                    inputMode="numeric"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-neutral-900/50 border border-neutral-800 focus:border-gold-500/50 rounded-lg p-4 text-white text-center text-2xl tracking-[0.5em] outline-none transition-colors"
                                    placeholder="****"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gold-600 hover:bg-gold-500 text-neutral-950 font-bold py-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(234,179,8,0.1)]"
                            >
                                Verify Access
                            </button>

                            <button
                                type="button"
                                onClick={() => { setShowPassword(false); setPassword(""); }}
                                className="w-full text-neutral-500 text-xs hover:text-white transition-colors uppercase tracking-wider"
                            >
                                Terug
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
