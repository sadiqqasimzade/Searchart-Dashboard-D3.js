// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AvangeScore, CountryAverageScore, CountryDiagram, CountryInfo, CountryRankDifference, CountryScoreDifference, CountryScoreYear, SectorRankDifference, UniqueCountries, UniqueIndicators, UniqueSectors, UniqueSubsectors, UniqueYears, YearScore } from '../types/apiResonseTypes'

// Define our single API slice object
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.8.229:8000/api/',
    }),
    endpoints: builder => ({
        fetchCountryIndexDifference: builder.query<CountryRankDifference, { country: string | null, year1: string | null, year2: string | null, sector: string | null, subsector: string | null }>({
            query: (e) => ({ url: `country-rank-difference/?country=${e.country}&year1=${e.year1}&year2=${e.year2}&sector=${e.sector}&subsector=${e.subsector}` })
        }),//+
        fetchCountryDiagram: builder.query<CountryDiagram, { country: string | null, sector: string | null, subsector: string | null, indicator: string | null }>({
            query: (e) => ({ url: `country-diagram/?country=${e.country}&sector=${e.sector}&subsector=${e.subsector}&indicator=${e.indicator}` })
        }),//+
        fetchCountryInfo: builder.query<CountryInfo, { year: string | null, country: string | null, sector: string | null, subsector: string | null }>({
            query: (e) => ({ url: `country-info/?year=${e.year}&country=${e.country}&sector=${e.sector}&subsector=${e.subsector}` })
        }),//+
        fetchUniqueSubsectors: builder.query<UniqueSubsectors, { sector: string | null }>({
            query: (e) => ({ url: `subsectors/?sector=${e.sector}` })
        }),
        fetchUniqueSectors: builder.query<UniqueSectors, void>({
            query: (e) => ({ url: 'sectors/' })
        }),
        fetchUniqueCountries: builder.query<UniqueCountries, void>({
            query: (e) => ({ url: 'unique-country/' })
        }),
        fetchUniqueYears: builder.query<string[], void>({
            query: (e) => ({ url: 'min-max-years/' }),
            transformResponse: (e: UniqueYears) => {
                const years: string[] = [];
                const start = parseInt(e.min_year);
                const end = parseInt(e.max_year);

                for (let year = start; year <= end; year++) {
                    years.push(year.toString());
                }
                return years;
            }
        }),
        fetchUniqueIndicators: builder.query<UniqueIndicators, {subsector: string | null }>({
            query: (e) => ({ url: `indicators/?subsector=${e.subsector}` }),
        }),
        fetchCountryScoreYear: builder.query<CountryScoreYear, { country: string | null }>({
            query: (e) => ({ url: `country-score-year/?country=${e.country}` })
        }),
        fetchCountryAverageScore: builder.query<CountryAverageScore, { country: string | null, year: string | null }>({
            query: (e) => ({ url: `sector-average-score/?country=${e.country}&year=${e.year}` })
        }),//+
        fetchYearScore: builder.query<YearScore, { country: string | null, sector: string | null }>({
            query: (e) => ({ url: `year-score/?country=${e.country}&sector=${e.sector}` })
        }),//+
        fetchSectorRankDifference: builder.query<SectorRankDifference, { year1: string | null, year2: string | null, country: string | null }>({
            query: (e) => ({ url: `sector-rank-difference/?year1=${e.year1}&year2=${e.year2}&country=${e.country}` })
        }),//+
        fetchAvarangeScore: builder.query<AvangeScore, { country: string | null, year: string | null }>({
            query: (e) => ({ url: `avarange-score/?country=${e.country}&year=${e.year}` })
        }),
        fetchCountryScoreDifference: builder.query<CountryScoreDifference, { country: string | null, year1: string | null, year2: string | null }>({
            query: (e) => ({ url: `country-score-difference/?country=${e.country}&year1=${e.year1}&year2=${e.year2}` })
        })
    })
})

// Export the auto-generated hook for the  query endpoint
export const { useFetchCountryScoreDifferenceQuery, useFetchCountryAverageScoreQuery, useFetchCountryDiagramQuery, useFetchCountryIndexDifferenceQuery, useFetchCountryInfoQuery, useFetchCountryScoreYearQuery, useFetchSectorRankDifferenceQuery, useFetchUniqueCountriesQuery, useFetchUniqueSectorsQuery, useFetchUniqueYearsQuery, useFetchUniqueSubsectorsQuery, useFetchYearScoreQuery, useFetchUniqueIndicatorsQuery, useFetchAvarangeScoreQuery } = apiSlice
