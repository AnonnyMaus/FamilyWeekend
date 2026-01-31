import { NextResponse } from 'next/server';
import { getScores, updateScore, setScore, ScoreData } from '@/lib/storage';

export async function GET() {
    const scores = await getScores();
    return NextResponse.json(scores);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { action, userName, delta, value, scores: bulkScores } = body;

        let newScores: ScoreData = {};

        if (action === 'update' && userName && typeof delta === 'number') {
            newScores = await updateScore(userName, delta);
        } else if (action === 'set' && userName && typeof value === 'number') {
            newScores = await setScore(userName, value);
        } else if (action === 'reset') {
            const { resetScores } = await import('@/lib/storage');
            newScores = await resetScores();
        } else {
            newScores = await getScores(); // Just return current scores if invalid action to avoid crash
        }

        return NextResponse.json(newScores);
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
