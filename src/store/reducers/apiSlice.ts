// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CountryAverageScore, CountryDiagram, CountryInfo, CountryRankDifference, CountryScoreYear, SectorRankDifference, UniqueCountries, UniqueSectors, UniqueSubsectors, UniqueYears, YearScore } from '../types/apiResonseTypes'

// Define our single API slice object
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/',
    }),
    endpoints: builder => ({
        fetchCountryIndexDifference: builder.query<CountryRankDifference, { country: string|undefined, year1: string|undefined, year2: string|undefined, sector: string|undefined, subsector: string|undefined }>({
            query: (e) => ({ url: `country-rank-difference/?country=${e.country}&year1=${e.year1}&year2=${e.year2}&sector=${e.sector}&subsector=${e.subsector}` })
        }),//+
        fetchCountryDiagram: builder.query<CountryDiagram, { country: string|undefined, sector: string|undefined, subsector: string|undefined, indicator: string|undefined }>({
            query: (e) => ({ url: `country-diagram/?country=${e.country}&sector=${e.sector}&subsector=${e.subsector}&indicator=${e.indicator}` })
        }),//+
        fetchCountryInfo: builder.query<CountryInfo, { year: string|undefined, country: string|undefined, sector: string|undefined, subsector: string|undefined }>({
            query: (e) => ({ url: `country-info/?year=${e.year}&country=${e.country}&sector=${e.sector}&subsector=${e.subsector}` })
        }),//+
        fetchUniqueSubsectors: builder.query<UniqueSubsectors, void>({
            query: (e) => ({ url: 'subsecors/' })
        }),
        fetchUniqueSectors: builder.query<UniqueSectors, void>({
            query: (e) => ({ url: 'sectors/' })
        }),
        fetchUniqueCountries: builder.query<UniqueCountries, void>({
            query: (e) => ({ url: 'countries/' })
        }),
        fetchUniqueYears: builder.query<UniqueYears, void>({
            query: (e) => ({ url: 'min-max-years/' })
        }),
        fetchCountryScoreYear: builder.query<CountryScoreYear, { country: string|undefined }>({
            query: (e) => ({ url: `country-score-year/?country=${e.country}` })
        }),
        fetchCountryAverageScore: builder.query<CountryAverageScore, { country: string|undefined, year: string|undefined }>({
            query: (e) => ({ url: `country-average-score/?country=${e.country}&year=${e.year}` })
        }),//+
        fetchYearScore: builder.query<YearScore, { country: string|undefined, sector: string|undefined }>({
            query: (e) => ({ url: `year-score/?country=${e.country}&sector=${e.sector}` })
        }),//+
        fetchSectorRankDifference: builder.query<SectorRankDifference, { year1: string|undefined, year2: string|undefined, country: string|undefined }>({
            query: (e) => ({ url: `sector-rank-difference/?year1=${e.year1}&year2=${e.year2}&country=${e.country}` })
        })//+
    })
})

// Export the auto-generated hook for the  query endpoint
export const { useFetchCountryAverageScoreQuery, useFetchCountryDiagramQuery, useFetchCountryIndexDifferenceQuery, useFetchCountryInfoQuery, useFetchCountryScoreYearQuery, useFetchSectorRankDifferenceQuery, useFetchUniqueCountriesQuery, useFetchUniqueSectorsQuery, useFetchUniqueYearsQuery, useFetchUniqueSubsectorsQuery, useFetchYearScoreQuery } = apiSlice
