import fs from 'fs';
import path from 'path';
import { createClient } from '@vercel/kv';

const DATA_DIR = path.join(process.cwd(), 'data');
const SCORES_FILE = path.join(DATA_DIR, 'scores.json');

export interface ScoreData {
    [userName: string]: number;
}

// Support both Vercel KV (Legacy) and Upstash Redis (Marketplace)
const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

const kv = (KV_URL && KV_TOKEN) ? createClient({ url: KV_URL, token: KV_TOKEN }) : null;
const USE_KV = !!kv;

export async function getScores(): Promise<ScoreData> {
    if (USE_KV && kv) {
        try {
            const scores = await kv.hgetall('scores');
            return (scores as ScoreData) || {};
        } catch (error) {
            console.error("Vercel KV Error:", error);
            return {};
        }
    } else {
        // Local Fallback
        if (!fs.existsSync(SCORES_FILE)) {
            return {};
        }
        try {
            const fileContent = fs.readFileSync(SCORES_FILE, 'utf-8');
            return JSON.parse(fileContent);
        } catch (error) {
            console.error("Error reading local scores file:", error);
            return {};
        }
    }
}

async function saveScoresLocal(scores: ScoreData) {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(SCORES_FILE, JSON.stringify(scores, null, 2), 'utf-8');
}

export async function updateScore(userName: string, delta: number): Promise<ScoreData> {
    if (USE_KV && kv) {
        await kv.hincrby('scores', userName, delta);
        return await getScores();
    } else {
        const scores = await getScores();
        scores[userName] = (scores[userName] || 0) + delta;
        await saveScoresLocal(scores);
        return scores;
    }
}

export async function setScore(userName: string, value: number): Promise<ScoreData> {
    if (USE_KV && kv) {
        await kv.hset('scores', { [userName]: value });
        return await getScores();
    } else {
        const scores = await getScores();
        scores[userName] = value;
        await saveScoresLocal(scores);
        return scores;
    }
}
