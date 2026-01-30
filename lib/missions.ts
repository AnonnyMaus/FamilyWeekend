import seedrandom from 'seedrandom';

export interface Mission {
    id: number;
    text: string;
}

export const MISSIONS: Mission[] = [
    { id: 1, text: "Start een polonaise en krijg minstens 5 mensen mee." },
    { id: 2, text: "Verwissel stiekem een voorwerp van tafel A naar tafel B zonder dat iemand het merkt." },
    { id: 3, text: "Gebruik het woord \"hypotheekrenteaftrek\" in een normaal gesprek." },
    { id: 4, text: "Laat iemand anders jouw glas bijvullen, maar bedank met \"Dank u, gij nobele ridder\"." },
    { id: 5, text: "Ga op een groepsfoto staan, maar kijk als enige de compleet verkeerde kant op." },
    { id: 6, text: "Zing 'per ongeluk' luidkeels mee met een liedje, maar met de verkeerde tekst." },
    { id: 7, text: "High-five 5 verschillende mensen binnen 1 minuut." },
    { id: 8, text: "Overtuig iemand dat er een spook in de vijver is gezien." },
    { id: 9, text: "Loop 5 minuten achteruit (oefening voor de rug)." },
    { id: 10, text: "Wissel van één schoen met iemand anders." },
    { id: 11, text: "Maak een toast/speech van minstens 30 seconden over \"de servetten\"." },
    { id: 12, text: "Laat iemand je vragen of je ziek bent." },
    { id: 13, text: "Sluip in 3 selfies die andere mensen maken (photobomb)." },
    { id: 14, text: "Applaudisseer spontaan en luid nadat iemand een slok drinken neemt." },
    { id: 15, text: "Noem iedereen gedurende 5 minuten \"Kapitein\"." },
    { id: 16, text: "Eet een snack met mes en vork." },
    { id: 17, text: "Vertel een mop waar niemand om lacht." },
    { id: 18, text: "Raak je neus aan telkens als iemand \"ja\" zegt (minstens 5x)." },
    { id: 19, text: "Doe je horloge aan de andere arm en vraag of het opvalt." },
    { id: 20, text: "Zorg dat je het laatste woord hebt en loop dramatisch weg." },
];

export const ATTENDEES = [
    // Familie MAUS
    "Alain", "Laurence", "Quentin", "Kim", "Gaëlle", "Alexander",
    // Familie DEPECKER
    "Steve", "Oliva", "Maxime",
    // Familie VANLAERE
    "Pascal", "Carole", "Arthur", "Fien", "Jules", "Gitte",
    // Familie HAYEZ
    "Gilles", "Virginie", "Juliette", "Thibaut", "Farnoosh"
];

export function getMissionForUser(userName: string): Mission {
    // Use the user's name as a seed for the random number generator
    // This ensures the same user always gets the same mission defined by the seed
    // The 'secretmichael2025' string adds a salt to the seed
    const rng = seedrandom(userName.toLowerCase() + 'secretmichael2025');
    const randomIndex = Math.floor(rng() * MISSIONS.length);
    return MISSIONS[randomIndex];
}
