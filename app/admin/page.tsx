"use client";

import { useState, useEffect } from "react";
import { ASSIGNMENTS, ATTENDEES, Card, getCardForUser } from "@/lib/missions";
import { motion } from "framer-motion";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [scores, setScores] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(true);

    // Filter lists
    const assignments = Object.entries(ASSIGNMENTS).map(([name, card]) => ({ name, ...card }));
    const uniqueMotives = Array.from(new Set(assignments.map(a => a.motive)));
    const uniqueRoles = Array.from(new Set(assignments.map(a => a.role)));
    const uniqueWeapons = Array.from(new Set(assignments.map(a => a.weapon)));

    useEffect(() => {
        fetchScores();
    }, []);

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

    const updateScore = async (userName: string, delta: number) => {
        const res = await fetch('/api/scores', {
            method: 'POST',
            body: JSON.stringify({ action: 'update', userName, delta }),
            headers: { 'Content-Type': 'application/json' }
        });
        const newScores = await res.json();
        setScores(newScores);
    };

    const addPointsByCriteria = async (key: keyof Card, value: string, points: number) => {
        const usersToUpdate = assignments.filter(a => a[key] === value).map(a => a.name);
        await Promise.all(usersToUpdate.map(name => updateScore(name, points)));
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
                <div className="w-full max-w-sm space-y-4">
                    <h1 className="text-2xl text-gold-500 font-bold text-center">ADMIN ACCESS</h1>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter PIN"
                        className="w-full bg-neutral-900 border border-neutral-800 p-3 rounded text-center text-white text-xl tracking-widest placeholder:tracking-normal"
                    />
                    <button
                        onClick={() => {
                            if (password === "3090") setIsAuthenticated(true);
                            else alert("Access Denied");
                        }}
                        className="w-full bg-red-900/50 hover:bg-red-800 text-red-200 p-3 rounded border border-red-900 font-bold"
                    >
                        VERIFY
                    </button>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-neutral-950 p-4 md:p-8 text-neutral-200">
            <h1 className="text-3xl text-gold-500 font-serif mb-8 border-b border-gold-500/20 pb-4">Hanzinelle Admin</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Section 1: Bulk Actions */}
                <div className="space-y-8">
                    <section className="bg-neutral-900/50 p-6 rounded-lg border border-neutral-800">
                        <h2 className="text-xl font-bold mb-4 text-white">Bulk Scoring</h2>

                        <div className="space-y-6">
                            {/* By Motive */}
                            <div>
                                <h3 className="text-sm uppercase tracking-wider text-neutral-500 mb-2">By Motive</h3>
                                <div className="grid grid-cols-1 gap-2">
                                    {uniqueMotives.map(m => (
                                        <div key={m} className="flex items-center justify-between bg-neutral-800/30 p-2 rounded border border-neutral-800">
                                            <span className="text-sm text-neutral-300 ml-2">{m}</span>
                                            <div className="flex gap-2">
                                                <button onClick={() => addPointsByCriteria('motive', m, -1)} className="w-8 h-8 flex items-center justify-center bg-red-900/30 hover:bg-red-800/50 border border-red-900/50 rounded text-red-200 font-bold">-1</button>
                                                <button onClick={() => addPointsByCriteria('motive', m, 1)} className="w-8 h-8 flex items-center justify-center bg-green-900/30 hover:bg-green-800/50 border border-green-900/50 rounded text-green-200 font-bold">+1</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* By Role */}
                            <div>
                                <h3 className="text-sm uppercase tracking-wider text-neutral-500 mb-2">By Role</h3>
                                <div className="grid grid-cols-1 gap-2">
                                    {uniqueRoles.map(r => (
                                        <div key={r} className="flex items-center justify-between bg-neutral-800/30 p-2 rounded border border-neutral-800">
                                            <span className="text-sm text-neutral-300 ml-2">{r}</span>
                                            <div className="flex gap-2">
                                                <button onClick={() => addPointsByCriteria('role', r, -1)} className="w-8 h-8 flex items-center justify-center bg-red-900/30 hover:bg-red-800/50 border border-red-900/50 rounded text-red-200 font-bold">-1</button>
                                                <button onClick={() => addPointsByCriteria('role', r, 1)} className="w-8 h-8 flex items-center justify-center bg-green-900/30 hover:bg-green-800/50 border border-green-900/50 rounded text-green-200 font-bold">+1</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* By Weapon */}
                            <div>
                                <h3 className="text-sm uppercase tracking-wider text-neutral-500 mb-2">By Weapon</h3>
                                <div className="grid grid-cols-1 gap-2">
                                    {uniqueWeapons.map(w => (
                                        <div key={w} className="flex items-center justify-between bg-neutral-800/30 p-2 rounded border border-neutral-800">
                                            <span className="text-sm text-neutral-300 ml-2">{w}</span>
                                            <div className="flex gap-2">
                                                <button onClick={() => addPointsByCriteria('weapon', w, -1)} className="w-8 h-8 flex items-center justify-center bg-red-900/30 hover:bg-red-800/50 border border-red-900/50 rounded text-red-200 font-bold">-1</button>
                                                <button onClick={() => addPointsByCriteria('weapon', w, 1)} className="w-8 h-8 flex items-center justify-center bg-green-900/30 hover:bg-green-800/50 border border-green-900/50 rounded text-green-200 font-bold">+1</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Section 2: Leaderboard & Individual Edit */}
                <div className="space-y-8">
                    <section className="bg-neutral-900/50 p-6 rounded-lg border border-neutral-800">
                        <h2 className="text-xl font-bold mb-4 text-white">Leaderboard & Edit</h2>
                        <div className="space-y-2">
                            {ATTENDEES.sort((a, b) => (scores[b] || 0) - (scores[a] || 0)).map((name, i) => (
                                <div key={name} className="flex items-center justify-between bg-black/40 p-3 rounded">
                                    <div className="flex items-center gap-4">
                                        <span className={`font-mono font-bold w-6 text-center ${i < 3 ? 'text-gold-400' : 'text-neutral-600'}`}>#{i + 1}</span>
                                        <span>{name}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button onClick={() => updateScore(name, -1)} className="w-8 h-8 flex items-center justify-center bg-neutral-800 rounded hover:bg-neutral-700">-</button>
                                        <span className="w-8 text-center font-bold">{scores[name] || 0}</span>
                                        <button onClick={() => updateScore(name, 1)} className="w-8 h-8 flex items-center justify-center bg-neutral-800 rounded hover:bg-neutral-700">+</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
