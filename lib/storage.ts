import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const SCORES_FILE = path.join(DATA_DIR, 'scores.json');

export interface ScoreData {
    [userName: string]: number;
}

export function getScores(): ScoreData {
    if (!fs.existsSync(SCORES_FILE)) {
        return {};
    }
    try {
        const fileContent = fs.readFileSync(SCORES_FILE, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error("Error reading scores file:", error);
        return {};
    }
}

export function saveScores(scores: ScoreData) {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(SCORES_FILE, JSON.stringify(scores, null, 2), 'utf-8');
}

export function updateScore(userName: string, delta: number) {
    const scores = getScores();
    scores[userName] = (scores[userName] || 0) + delta;
    saveScores(scores);
    return scores;
}

export function setScore(userName: string, value: number) {
    const scores = getScores();
    scores[userName] = value;
    saveScores(scores);
    return scores;
}
