// /api/country-rank-difference/?country=Azerbaijan&year1=2019&year2=2020&sector=Economy&subsector=GDP%20and%20economic%20growth
export type CountryRankDifference = [string, number][];

// /api/country-diagram/?country=Azerbaijan&sector=Economy&subsector=GDP%20and%20economic%20growth&indicator=GDP%20per%20capita%20Purchasing%20Power%20Parity
export type CountryDiagram = {
    indicator: string;
    data: {
        year: string;
        score: number;
    }[];
}[]


// api/country-info/?year=2008&country=Belgium&sector=Index&subsector=Religious%20composition%20of%20the%20population
export type CountryInfo = {
    "indicator": string,
    "score": number
}[]

// /api/subsecors
export type UniqueSubsectors = string[]

// /api/unique-country/
export type UniqueCountries = string[]
export type UniqueSectors = string[]
export type UniqueIndicators = string[]
export type UniqueYears = {
    min_year: string,
    max_year: string
}

// /api/country-score-difference/?country=Azerbaijan&year1=2019&year2=2010
export type CountryScoreDifference = {
    "country": string,
    "score_difference": number
}

// /api/country-score-year/?country=Azerbaijan
export type CountryScoreYear = {
    "year": string,
    "average_score": number
}[]

// /sector-average-score/?country=Azerbaijan&year=2020
export type CountryAverageScore = {
    "country": string,
    "average_score": number
}
// /year-score/?country=Azerbaijan&sector=Economy
export type YearScore = {
    year: string;
    score: number;
}[];

// /api/sector-rank-difference/?country=Germany&year1=2019&year2=2018
export type SectorRankDifference = [string, number][]

// /api/avarange-score/?country=Azerbaijan&year=2020
export type AvangeScore = {
    sector: string
    average_score: number;
}[]