export interface Card {
    motive: string;
    role: string;
    weapon: string;
}

export const ASSIGNMENTS: Record<string, Card> = {
    "Alain": { motive: "Geld", role: "De Butler", weapon: "Vergif" },
    "Laurence": { motive: "Jaloezie", role: "De Erfgenaam", weapon: "Loden Pijp" },
    "Gaëlle": { motive: "Geld", role: "De Erfgenaam", weapon: "Wurgkoord" },
    "Alexander": { motive: "Jaloezie", role: "De Butler", weapon: "Dolk" },
    "Steve": { motive: "Wraak", role: "De Zakenpartner", weapon: "Bijl" },
    "Oliva": { motive: "Chantage", role: "De Minnaar", weapon: "Honkbalknuppel" },
    "Maxime": { motive: "Geld", role: "De Minnaar", weapon: "Pistool" },
    "Pascal": { motive: "Jaloezie", role: "De Zakenpartner", weapon: "Kandelaar" },
    "Carole": { motive: "Wraak", role: "De Butler", weapon: "Pistool" },
    "Arthur": { motive: "Chantage", role: "De Erfgenaam", weapon: "Bijl" },
    "Fien": { motive: "Geld", role: "De Zakenpartner", weapon: "Dolk" },
    "Jules": { motive: "Jaloezie", role: "De Minnaar", weapon: "Vergif" },
    "Gitte": { motive: "Wraak", role: "De Erfgenaam", weapon: "Moersleutel" },
    "Gilles": { motive: "Chantage", role: "De Butler", weapon: "Wurgkoord" },
    "Virginie": { motive: "Geld", role: "De Erfgenaam", weapon: "Kandelaar" },
    "Juliette": { motive: "Jaloezie", role: "De Zakenpartner", weapon: "Honkbalknuppel" },
    "Thibaut": { motive: "Wraak", role: "De Minnaar", weapon: "Loden Pijp" },
    "Farnoosh": { motive: "Chantage", role: "De Zakenpartner", weapon: "Moersleutel" },
    "Quentin": { motive: "Macht", role: "Game Master", weapon: "Laptop" },
    "Kim": { motive: "Gerechtigheid", role: "Hoofdinspecteur", weapon: "Vergrootglas" },
};

export const ATTENDEES = Object.keys(ASSIGNMENTS).sort();

export function getCardForUser(userName: string): Card | null {
    return ASSIGNMENTS[userName] || null;
}
