"use client";

import { useState, useEffect } from "react";
import { ATTENDEES } from "@/lib/missions";
import { Trophy } from "lucide-react";
import { motion } from "framer-motion";

export default function LeaderboardPage() {
    const [scores, setScores] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const res = await fetch('/api/scores');
                const data = await res.json();
                setScores(data);
                setLoading(false);
            } catch (e) {
                console.error("Failed to fetch scores", e);
                setLoading(false);
            }
        };

        fetchScores();
        // Poll for updates every 10 seconds
        const interval = setInterval(fetchScores, 10000);
        return () => clearInterval(interval);
    }, []);

    const sortedAttendees = ATTENDEES.sort((a, b) => (scores[b] || 0) - (scores[a] || 0));

    return (
        <main className="min-h-screen bg-neutral-950 p-4 md:p-8 text-neutral-200">
            <div className="max-w-2xl mx-auto space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl md:text-5xl font-serif text-white tracking-tighter">
                        OFFICIAL<br /><span className="text-gold-500">STANDINGS</span>
                    </h1>
                    <p className="text-neutral-500 font-mono text-xs tracking-[0.3em] uppercase">Hanzinelle Detective Program</p>
                </div>

                {loading ? (
                    <div className="text-center text-neutral-500 animate-pulse">Thinking...</div>
                ) : (
                    <div className="space-y-3">
                        {sortedAttendees.map((name, i) => {
                            const score = scores[name] || 0;
                            const isTop3 = i < 3;

                            return (
                                <motion.div
                                    key={name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className={`flex items-center justify-between p-4 rounded-lg border ${isTop3 ? 'bg-gold-500/10 border-gold-500/30' : 'bg-neutral-900/50 border-neutral-800'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold font-mono ${isTop3 ? 'bg-gold-500 text-black' : 'bg-neutral-800 text-neutral-500'}`}>
                                            {i + 1}
                                        </div>
                                        <span className={`text-lg ${isTop3 ? 'text-white font-bold' : 'text-neutral-300'}`}>{name}</span>
                                        {isTop3 && <Trophy className="w-4 h-4 text-gold-500" />}
                                    </div>
                                    <div className="font-mono text-xl font-bold text-white">
                                        {score} <span className="text-xs text-neutral-500 font-normal">pts</span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}
