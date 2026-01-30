"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getMissionForUser, Mission } from "@/lib/missions";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Eye, EyeOff, RefreshCw } from "lucide-react";
import Link from "next/link";

function MissionContent() {
    const searchParams = useSearchParams();
    const userName = searchParams.get("user");
    const [mission, setMission] = useState<Mission | null>(null);
    const [isOpened, setIsOpened] = useState(false);
    const [isBlur, setIsBlur] = useState(false);

    useEffect(() => {
        if (userName) {
            setMission(getMissionForUser(userName));
        }
    }, [userName]);

    if (!userName) {
        return (
            <div className="flex h-screen items-center justify-center text-neutral-400">
                <Link href="/" className="hover:text-gold-500 underline">Ongeldige toegang. Keer terug.</Link>
            </div>
        );
    }

    return (
        <div className="z-10 w-full max-w-md">

            {/* Header - Always visible but subtle */}
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
                                <h2 className="text-2xl font-bold text-neutral-200">TOP SECRET</h2>
                                <p className="text-neutral-500 text-sm mt-2">Tap to open mission file</p>
                            </div>
                        </div>

                        {/* "Wax Seal" */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-red-600 rounded-full blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="mission"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
                        className="bg-neutral-900 border border-gold-600/20 rounded-xl p-8 shadow-2xl relative overflow-hidden"
                    >
                        {/* Watermark */}
                        <div className="absolute -right-10 -top-10 text-9xl font-black text-white/5 rotate-12 select-none pointer-events-none">CONFIDENTIAL</div>

                        <div className="relative z-10 space-y-6">
                            <div className="flex justify-between items-start">
                                <div className="bg-gold-500/10 text-gold-500 px-3 py-1 rounded text-xs font-bold tracking-wider inline-block border border-gold-500/20">
                                    MISSION #{mission?.id.toString().padStart(3, '0')}
                                </div>
                                <button onClick={() => setIsBlur(!isBlur)} className="text-neutral-500 hover:text-white transition-colors">
                                    {isBlur ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>

                            <div className={`space-y-4 transition-all duration-300 ${isBlur ? 'blur-md opacity-50 select-none' : ''}`}>
                                <h3 className="text-neutral-400 text-sm uppercase tracking-widest border-b border-neutral-800 pb-2">Your Objective</h3>
                                <p className="text-2xl md:text-3xl font-serif text-white leading-relaxed">
                                    {mission?.text}
                                </p>
                            </div>

                            <div className="pt-8 border-t border-neutral-800 flex flex-col gap-4 text-center">
                                <p className="text-xs text-red-500 font-mono animate-pulse">
                                    DO NOT SHARE THIS INFORMATION
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
                        Reset Login
                    </Link>
                </motion.div>
            )}

        </div>
    );
}

export default function MissionPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-neutral-950 overflow-hidden relative">
            {/* Background patterns */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-neutral-800/20 via-transparent to-transparent opacity-50 pointer-events-none" />

            <Suspense fallback={<div className="text-neutral-500 animate-pulse">Decrypting...</div>}>
                <MissionContent />
            </Suspense>
        </main>
    );
}
