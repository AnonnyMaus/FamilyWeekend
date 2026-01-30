"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCardForUser, Card } from "@/lib/missions";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Eye, EyeOff, RefreshCw, Briefcase, User, Sword, Trophy } from "lucide-react";
import Link from "next/link";

function MissionContent() {
    const searchParams = useSearchParams();
    const userName = searchParams.get("user");
    const [card, setCard] = useState<Card | null>(null);
    const [score, setScore] = useState<number>(0);
    const [rank, setRank] = useState<number | null>(null);
    const [isOpened, setIsOpened] = useState(false);
    const [isBlur, setIsBlur] = useState(false);

    useEffect(() => {
        if (userName) {
            setCard(getCardForUser(userName));
            fetchScore(userName);
        }
    }, [userName]);

    const fetchScore = async (name: string) => {
        try {
            const res = await fetch('/api/scores');
            const data = await res.json();

            // Calculate Rank
            const sortedUsers = Object.keys(data).sort((a, b) => (data[b] || 0) - (data[a] || 0));
            const userRank = sortedUsers.indexOf(name) + 1;

            setScore(data[name] || 0);
            if (userRank > 0) setRank(userRank);
        } catch (e) {
            console.error("Failed to load scores", e);
        }
    };

    if (!userName) {
        return (
            <div className="flex h-screen items-center justify-center text-neutral-400">
                <Link href="/" className="hover:text-gold-500 underline">Ongeldige toegang. Keer terug.</Link>
            </div>
        );
    }

    if (!card) {
        return (
            <div className="flex h-screen items-center justify-center text-neutral-400 flex-col gap-4">
                <p>Speler niet gevonden in de administratie.</p>
                <Link href="/" className="hover:text-gold-500 underline">Keer terug</Link>
            </div>
        );
    }

    return (
        <div className="z-10 w-full max-w-md">

            {/* Header */}
            <div className="text-center mb-8 opacity-50">
                <p className="text-xs tracking-[0.3em] font-mono text-gold-500/80">CONFIDENTIAL // {userName.toUpperCase()}</p>
            </div>

            <AnimatePresence mode="wait">
                {!isOpened ? (
                    <motion.div
                        key="envelope"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.5, opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 0.5 }}
                        onClick={() => setIsOpened(true)}
                        className="cursor-pointer group relative aspect-[4/3] bg-[#2a2a2a] rounded-lg shadow-2xl flex items-center justify-center border-t border-white/5 overflow-hidden transform transition-transform hover:scale-[1.02]"
                    >
                        {/* Envelope Flap Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                        <div className="text-center space-y-4">
                            <div className="w-20 h-20 mx-auto rounded-full bg-red-900/20 border border-red-900/50 flex items-center justify-center group-hover:bg-red-900/30 transition-colors">
                                <Lock className="w-8 h-8 text-red-700" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-neutral-200">DOSSIER</h2>
                                <p className="text-neutral-500 text-sm mt-2">Tik om te openen</p>
                            </div>
                        </div>

                        {/* "Wax Seal" */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-red-600 rounded-full blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="card"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
                        className="bg-neutral-900 border border-gold-600/20 rounded-xl p-8 shadow-2xl relative overflow-hidden"
                    >
                        {/* Watermark */}
                        <div className="absolute -right-10 -top-10 text-9xl font-black text-white/5 rotate-12 select-none pointer-events-none opacity-10">TOP SECRET</div>

                        <div className="relative z-10 space-y-6">
                            <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                <div className="text-gold-500 font-bold tracking-widest text-sm uppercase">
                                    Jouw Karakter
                                </div>
                                <div className="flex items-center gap-3">
                                    {/* Score Badge */}
                                    <div className="flex items-center gap-1.5 bg-gold-500/10 border border-gold-500/20 px-2 py-1 rounded text-gold-400 text-xs font-mono">
                                        <Trophy className="w-3 h-3" />
                                        <span>#{rank ?? '-'} / {score}pts</span>
                                    </div>
                                    <button onClick={() => setIsBlur(!isBlur)} className="text-neutral-500 hover:text-white transition-colors">
                                        {isBlur ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className={`space-y-6 transition-all duration-300 ${isBlur ? 'blur-md opacity-50 select-none' : ''}`}>

                                {/* Item 1: Rol */}
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-neutral-400 text-xs uppercase tracking-wider">
                                        <User className="w-3 h-3" />
                                        <span>Rol</span>
                                    </div>
                                    <p className="text-2xl font-serif text-white">{card.role}</p>
                                </div>

                                {/* Item 2: Motief */}
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-neutral-400 text-xs uppercase tracking-wider">
                                        <Briefcase className="w-3 h-3" />
                                        <span>Motief</span>
                                    </div>
                                    <p className="text-2xl font-serif text-white">{card.motive}</p>
                                </div>

                                {/* Item 3: Wapen */}
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-neutral-400 text-xs uppercase tracking-wider">
                                        <Sword className="w-3 h-3" />
                                        <span>Wapen</span>
                                    </div>
                                    <p className="text-2xl font-serif text-red-500">{card.weapon}</p>
                                </div>

                            </div>

                            <div className="pt-6 border-t border-neutral-800 text-center">
                                <p className="text-[10px] text-neutral-600 font-mono">
                                    HOUD DIT KAARTJE GEHEIM
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {isOpened && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="mt-12 text-center"
                >
                    <Link href="/" className="inline-flex items-center text-xs text-neutral-600 hover:text-neutral-400 transition-colors gap-2">
                        <RefreshCw className="w-3 h-3" />
                        Terug naar start
                    </Link>
                </motion.div>
            )}

        </div>
    );
}

export default function MissionPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-neutral-950 overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-neutral-800/20 via-transparent to-transparent opacity-50 pointer-events-none" />
            <Suspense fallback={<div className="text-neutral-500 animate-pulse">Dossier laden...</div>}>
                <MissionContent />
            </Suspense>
        </main>
    );
}
