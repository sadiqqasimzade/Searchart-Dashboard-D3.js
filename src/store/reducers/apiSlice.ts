// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AvangeScore, CountryAverageScore, CountryDiagram, CountryInfo, CountryRankDifference, CountryScoreYear, SectorRankDifference, UniqueCountries, UniqueIndicators, UniqueSectors, UniqueSubsectors, UniqueYears, YearScore } from '../types/apiResonseTypes'

// Define our single API slice object
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.8.196:8000/api/',
    }),
    endpoints: builder => ({
        fetchCountryIndexDifference: builder.query<CountryRankDifference, { country: string | undefined, year1: string | undefined, year2: string | undefined, sector: string | undefined, subsector: string | undefined }>({
            query: (e) => ({ url: `country-rank-difference/?country=${e.country}&year1=${e.year1}&year2=${e.year2}&sector=${e.sector}&subsector=${e.subsector}` })
        }),//+
        fetchCountryDiagram: builder.query<CountryDiagram, { country: string | undefined, sector: string | undefined, subsector: string | undefined, indicator: string | undefined }>({
            query: (e) => ({ url: `country-diagram/?country=${e.country}&sector=${e.sector}&subsector=${e.subsector}&indicator=${e.indicator}` })
        }),//+
        fetchCountryInfo: builder.query<CountryInfo, { year: string | undefined, country: string | undefined, sector: string | undefined, subsector: string | undefined }>({
            query: (e) => ({ url: `country-info/?year=${e.year}&country=${e.country}&sector=${e.sector}&subsector=${e.subsector}` })
        }),//+
        fetchUniqueSubsectors: builder.query<UniqueSubsectors, { sector: string | undefined }>({
            query: (e) => ({ url: 'subsectors/' })
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

                return years;;
            }
        }),
        fetchUniqueIndicators: builder.query<UniqueIndicators, { sector: string | undefined, subsector: string | undefined }>({
            query: (e) => ({ url: 'indicators/' }),
        }),
        CountryScoreYear: builder.query<CountryScoreYear, { country: string | undefined }>({
            query: (e) => ({ url: `country-score-year/?country=${e.country}` })
        }),
        fetchCountryAverageScore: builder.query<CountryAverageScore, { country: string | undefined, year: string | undefined }>({
            query: (e) => ({ url: `sector-average-score/?country=${e.country}&year=${e.year}` })
        }),//+
        fetchYearScore: builder.query<YearScore, { country: string | undefined, sector: string | undefined }>({
            query: (e) => ({ url: `year-score/?country=${e.country}&sector=${e.sector}` })
        }),//+
        fetchSectorRankDifference: builder.query<SectorRankDifference, { year1: string | undefined, year2: string | undefined, country: string | undefined }>({
            query: (e) => ({ url: `sector-rank-difference/?year1=${e.year1}&year2=${e.year2}&country=${e.country}` })
        }),//+
        fetchAvarangeScore: builder.query<AvangeScore, { country: string | undefined, year: string | undefined }>({
            query: (e) => ({ url: `avarange-score/?country=${e.country}&year=${e.year}` })
        })
    })
})

// Export the auto-generated hook for the  query endpoint
export const { useFetchCountryAverageScoreQuery, useFetchCountryDiagramQuery, useFetchCountryIndexDifferenceQuery, useFetchCountryInfoQuery, useFetchCountryScoreYearQuery, useFetchSectorRankDifferenceQuery, useFetchUniqueCountriesQuery, useFetchUniqueSectorsQuery, useFetchUniqueYearsQuery, useFetchUniqueSubsectorsQuery, useFetchYearScoreQuery, useFetchUniqueIndicatorsQuery, useFetchAvarangeScoreQuery } = apiSlice
