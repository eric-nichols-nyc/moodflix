export type Movie = {
    id: number;
    title: string;
    year: number;
    rating: number;
};

export type Assessment = {
    moodValue: number;
    anxietyValue: number;
    energyValue: number;
};

export type MovieRecommendation = {
    title: string;
    description: string;
};

export type RecommendationResponse = {
    stateSummary: string;
    recommendations: MovieRecommendation[];
    choicesSummary: string;
};