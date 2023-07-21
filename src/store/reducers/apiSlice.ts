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
            query: ({ country, sector, subsector, year1, year2 }) => {
                if (sector === null || country === null || subsector === null || year1 === null || year2 === null) {
                    throw new Error('Error');
                }
                return {
                    url: `country-rank-difference/?country=${country}&year1=${year1}&year2=${year2}&sector=${sector}&subsector=${subsector}`
                };
            }
        }),
        fetchCountryDiagram: builder.query<CountryDiagram, { country: string | null, sector: string | null, subsector: string | null, indicator: string | null }>({
            query: ({ country, sector, subsector, indicator }) => {
                if (country === null || sector === null || subsector === null || indicator === null) {
                    throw new Error('Error');
                }
                return {
                    url: `country-diagram/?country=${country}&sector=${sector}&subsector=${subsector}&indicator=${indicator}`
                };
            }
        }),
        fetchCountryInfo: builder.query<CountryInfo, { year: string | null, country: string | null, sector: string | null, subsector: string | null }>({
            query: ({ year, country, sector, subsector }) => {
                if (year === null || country === null || sector === null || subsector === null) {
                    throw new Error('Error');
                }
                return {
                    url: `country-info/?year=${year}&country=${country}&sector=${sector}&subsector=${subsector}`
                };
            }
        }),
        fetchUniqueSubsectors: builder.query<UniqueSubsectors, { sector: string | null }>({
            query: ({ sector }) => {
                if (sector === null) {
                    throw new Error('Error');
                }
                return {
                    url: `subsectors/?sector=${sector}`,
                };
            }
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
        fetchUniqueIndicators: builder.query<UniqueIndicators, { subsector: string | null }>({
            query: ({ subsector }) => {
                if (subsector === null) {
                    throw new Error('Error');
                }
                return {
                    url: `indicators/?subsector=${subsector}`
                };
            }
        }),
        fetchCountryScoreYear: builder.query<CountryScoreYear, { country: string | null }>({
            query: ({ country }) => {
                if (country === null) {
                    throw new Error('Error');
                }
                return {
                    url: `country-score-year/?country=${country}`
                };
            }
        }),
        fetchCountryAverageScore: builder.query<CountryAverageScore, { country: string | null, year: string | null }>({
            query: ({ country, year }) => {
                if (country === null || year === null) {
                    throw new Error('Error');
                }
                return {
                    url: `sector-average-score/?country=${country}&year=${year}`
                };
            }
        }),
        fetchYearScore: builder.query<YearScore, { country: string | null, sector: string | null }>({
            query: ({ country, sector }) => {
                if (country === null || sector === null) {
                    throw new Error('Error');
                }
                return {
                    url: `year-score/?country=${country}&sector=${sector}`
                };
            }
        }),
        fetchSectorRankDifference: builder.query<SectorRankDifference, { year1: string | null, year2: string | null, country: string | null }>({
            query: ({ year1, year2, country }) => {
                if (year1 === null || year2 === null || country === null) {
                    throw new Error('Error');
                }
                return {
                    url: `sector-rank-difference/?year1=${year1}&year2=${year2}&country=${country}`
                };
            }
        }),
        fetchAvarangeScore: builder.query<AvangeScore, { country: string | null, year: string | null }>({
            query: ({ country, year }) => {
                if (country === null || year === null) {
                    throw new Error('Error');
                }
                return {
                    url: `average-score/?country=${country}&year=${year}`
                };
            }
        }),
        fetchCountryScoreDifference: builder.query<CountryScoreDifference, { country: string | null, year1: string | null, year2: string | null }>({
            query: ({ country, year1, year2 }) => {
                if (country === null || year1 === null || year2 === null) {
                    throw new Error('Error');
                }
                return {
                    url: `country-score-difference/?country=${country}&year1=${year1}&year2=${year2}`
                };
            }
        }),
    })
})

// Export the auto-generated hook for the  query endpoint
export const { useFetchCountryScoreDifferenceQuery, useFetchCountryAverageScoreQuery, useFetchCountryDiagramQuery, useFetchCountryIndexDifferenceQuery, useFetchCountryInfoQuery, useFetchCountryScoreYearQuery, useFetchSectorRankDifferenceQuery, useFetchUniqueCountriesQuery, useFetchUniqueSectorsQuery, useFetchUniqueYearsQuery, useFetchUniqueSubsectorsQuery, useFetchYearScoreQuery, useFetchUniqueIndicatorsQuery, useFetchAvarangeScoreQuery } = apiSlice

