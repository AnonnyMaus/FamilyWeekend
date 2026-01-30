import { NextResponse } from 'next/server';
import { getScores, updateScore, setScore, ScoreData } from '@/lib/storage';

export async function GET() {
    const scores = getScores();
    return NextResponse.json(scores);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { action, userName, delta, value, scores: bulkScores } = body;

        let newScores: ScoreData = {};

        if (action === 'update' && userName && typeof delta === 'number') {
            newScores = updateScore(userName, delta);
        } else if (action === 'set' && userName && typeof value === 'number') {
            newScores = setScore(userName, value);
        } else if (action === 'bulk_set' && bulkScores) {
            // Overwrite all or merge? Let's just iterate and set
            // Creating a bulk save function would be better but this works for small data
            // Actually, let's implement a simple direct save for bulk
            // BUT importing saveScores directly is better. 
            // For now, let's just support single updates or we loop.
            // Let's rely on simple loop for MVP
            for (const [u, v] of Object.entries(bulkScores as ScoreData)) {
                setScore(u, v as number);
            }
            newScores = getScores();
        } else {
            return NextResponse.json({ error: 'Invalid action or parameters' }, { status: 400 });
        }

        return NextResponse.json(newScores);
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
