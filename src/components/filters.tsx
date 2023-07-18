// import * as d3 from "d3";
// import { CsvType } from "../store/types/csvType";
// import { useEffect, useState } from "react";
// import Table from "./table";
// import DropdownMenu from "./inputs/dropdownMenu";
// import Filter from "./inputs/filter";


// type OptionType = {
//     sectorOptions: string[],
//     subsectorOptions: string[],
//     indicatorOptions: string[],
//     yearOptions: string[],
//     countryOptions: string[]
// }
// type QueryType = {
//     sectorQuery: string
//     subsectorQuery: string
//     indicator: string
//     year: string
//     county: string
// }
// export default function Filters() {
//     const [options, setOptions] = useState<OptionType>({
//         sectorOptions: [],
//         indicatorOptions: [],
//         yearOptions: [],
//         countryOptions: [],
//         subsectorOptions: []
//     })
//     const [sector, setSector] = useState<string>('')
//     const [country, setCountry] = useState<string>('')
//     const [year, setYear] = useState<string>('')
//     const [indicator, setIndicator] = useState<string>('')
//     const [subsector, setSubsector] = useState<string>('')
//     const [csvData, setCsvData] = useState<CsvType[]>()
//     const [sortedCsvData, setSortedCsvData] = useState<CsvType[]>()

//     //#region getting all options
//     useEffect(() => {
//         d3.csv('/MergedDataset.csv').then((data) => {
//             const unsortedCountries: string[] = Array.from(new Set(data.map(item => item.Country)));
//             const countries: string[] = unsortedCountries.sort(d3.ascending);
//             const unsortedYears: string[] = Array.from(new Set(data.map(item => item.Year)));
//             const years: string[] = unsortedYears.sort(d3.descending);
//             const sectors: string[] = Array.from(new Set(data.map(item => item.Sector)))
//             setOptions((prevState) => ({
//                 ...prevState,
//                 countryOptions: countries,
//                 yearOptions: years,
//                 sectorOptions: sectors,
//             }))
//             setCsvData(data)
//         })
//     }, [])
//     //#endregion

//     //#region change obserber
//     useEffect(() => {
//         if (csvData) {
//             const filtered = d3.filter(csvData, data =>
//                 data.Subsector === subsector &&
//                 data.Year === year &&
//                 data.Sector === sector 
//                 //&& (
//                 //     typeof country === "object" ?
//                 //         ((country as string[]).length > 0 ? (country as string[]).includes(data.Country) : isReturnedAllCountriesForDefault) :
//                 //         (country.length > 0 ? data.Country === country : isReturnedAllCountriesForDefault)
//                 // )
//             );
//             const sorted = d3.sort(filtered, (a, b) => parseInt(a.Rank) - parseInt(b.Rank));
//             // const sliced = sorted.slice(0, 20);
//             // setSortedCsvData(sliced);
//             setSortedCsvData(sorted);
//         }
//     }, [subsector, year, sector, country, csvData])
//     //#endregion

//     //#region filtering and sorting Subsector and Indicator depending on Sector value
//     useEffect(() => {
//         if (csvData) {
//             const uniqueValues = Array.from(
//                 new Set(
//                     csvData.filter((d) => d.Sector === sector)
//                         .map((d) => d.Subsector).sort(d3.ascending)
//                 )
//             );
//             setOptions((prevState) => ({ ...prevState, subsectorOptions: uniqueValues, indicatorOptions: [] }))
//             setSubsector('')
//         }
//     }, [sector])
//     useEffect(() => {
//         if (csvData) {
//             const uniqueValues = Array.from(
//                 new Set(
//                     csvData.filter((d) => d.Subsector === subsector)
//                         .map((d) => d.Indicator).sort(d3.ascending)
//                 )
//             );
//             setOptions((prevState) => ({ ...prevState, indicatorOptions: uniqueValues }))
//             setIndicator('')
//         }
//     }, [subsector])
//     //#endregion


//     return (
//         sortedCsvData ?
//             <>
//                 <div className="grid gap-14 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mt-10">
//                     <Filter head_title={'Country'} options={options.countryOptions} setState={setCountry} state={country} />

//                     {/* <DropdownMenu head_title={'Countries'} options={options.countryOptions} setState={setCountry} state={country} /> */}
//                     <Filter head_title={'Years'} options={options.yearOptions} setState={setYear} state={year} default_disabled />
//                     <Filter head_title={'Sectors'} options={options.sectorOptions} setState={setSector} state={sector} default_disabled />
//                     <Filter head_title={'Subsectors'} depends_on={sector} options={options.subsectorOptions} state={subsector} setState={setSubsector} default_disabled />
//                 </div>
//                 <Table sortedCsvData={sortedCsvData!} country={country} />
//             </> :
//             <p>Loading</p>

//     )

// }
