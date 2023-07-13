import Options from "./options";
import * as d3 from "d3";
import { CsvType } from "../types/csvType";
import { useEffect, useRef, useState } from "react";
import DropdownMenu from "./dropdownMenu";


type OptionType = {
    sectorOptions: string[],
    subsectorOptions: string[],
    indicatorOptions: string[],
    yearOptions: string[],
    countryOptions: string[]
}
type QueryType = {
    sectorQuery: string
    subsectorQuery: string
    indicator: string
    year: string
    county: string
}
export default function Filters() {
    const [options, setOptions] = useState<OptionType>({
        sectorOptions: [],
        indicatorOptions: [],
        yearOptions: [],
        countryOptions: [],
        subsectorOptions: []
    })
    const [sector, setSector] = useState<string>('')
    const [country, setCountry] = useState<string[]>([])
    const [year, setYear] = useState<string>('')
    const [indicator, setIndicator] = useState<string>('')
    const [subsector, setSubsector] = useState<string>('')
    const [csvData, setCsvData] = useState<CsvType[]>()
    const [sortedCsvData, setSortedCsvData] = useState<CsvType[]>()
    type FlagState = Record<string, string>;

    //#region getting all options
    useEffect(() => {
        d3.csv('/MergedDataset.csv').then((data) => {
            const unsortedCountries: string[] = Array.from(new Set(data.map(item => item.Country)));
            const countries: string[] = unsortedCountries.sort(d3.ascending);
            const unsortedYears: string[] = Array.from(new Set(data.map(item => item.Year)));
            const years: string[] = unsortedYears.sort(d3.descending);
            const sectors: string[] = Array.from(new Set(data.map(item => item.Sector)))
            setOptions((prevState) => ({
                ...prevState,
                countryOptions: countries,
                yearOptions: years,
                sectorOptions: sectors,
            }))
            setCsvData(data)
        })
    }, [])
    //#endregion

    //#region change obserber
    useEffect(() => {
        if (csvData) {
            const filtered = d3.filter(csvData, data =>
                data.Subsector === subsector &&
                data.Year === year &&
                data.Sector === sector &&
                (country.length > 0 ? country.includes(data.Country) : true) &&
                data.Indicator === indicator
            );
            const sorted = d3.sort(filtered, (a, b) => parseInt(a.Rank) - parseInt(b.Rank));
            const sliced = sorted.slice(0, 20);
            setSortedCsvData(sliced);
        }
    }, [subsector, year, sector, country, indicator, csvData])
    //#endregion

    //#region filtering and sorting Subsector and Indicator depending on Sector value
    useEffect(() => {
        if (csvData) {
            const uniqueValues = Array.from(
                new Set(
                    csvData.filter((d) => d.Sector === sector)
                        .map((d) => d.Subsector).sort(d3.ascending)
                )
            );
            setOptions((prevState) => ({ ...prevState, subsectorOptions: uniqueValues, indicatorOptions: [] }))
            setSubsector('')
        }
    }, [sector])
    useEffect(() => {
        if (csvData) {
            const uniqueValues = Array.from(
                new Set(
                    csvData.filter((d) => d.Subsector === subsector)
                        .map((d) => d.Indicator).sort(d3.ascending)
                )
            );
            setOptions((prevState) => ({ ...prevState, indicatorOptions: uniqueValues }))
            setIndicator('')
        }
    }, [subsector])
    //#endregion
    //#region 


    //#endregion
    //#region creating table
    const tableRef = useRef<HTMLTableElement>(null)
    useEffect(() => {
        if (sortedCsvData) {
            const flags: FlagState[] = [];
            Promise.resolve().then(() => {
                const promises = sortedCsvData.map((d) =>
                    fetch(`https://restcountries.com/v3.1/name/${d.Country}`)
                        .then((response) => response.json())
                        .then((json) => {
                            flags[d.Country] = json[0].flags.png;
                        }).catch(() => {
                            flags[d.Country] = "";
                        })
                );

                Promise.all(promises).then(() => {
                    const amount = d3.map(sortedCsvData, d => parseFloat(d.Amount))
                    const domain = d3.extent(amount)
                    const scale = d3.scaleLinear()
                        .domain(domain as [number, number])
                        .range([0, 100]);
                    tableRef.current!.innerHTML = '';
                    const table = d3.select(tableRef.current)
                    table
                        .append('thead')
                        .append('tr').style('display', "grid").style("grid-template-columns", "1fr 3fr 6fr")
                        .selectAll('th')
                        .data(["Rank", "Country", "Amout"])
                        .enter()
                        .append('th')
                        .text((d) => d);

                    table
                        .append('tbody')
                        .selectAll('tr')
                        .data(sortedCsvData)
                        .enter()
                        .append('tr').style('display', "grid").style("grid-template-columns", "2fr 4fr 6fr").style("padding", "2px 0 2px 0")
                        .selectAll('td')
                        .data((d) => [d.Rank, d.Country, d.Amount])
                        .enter()
                        .append('td')
                        .style('place-items', "end").style("padding-left", "20px")
                        .html((d, i) => {
                            if (i === 0) {
                                return `<p class="text-end">${d}</p>`
                            }
                            if (i === 1) {
                                return `<p class="flex flex-row justify-end gap-5"><span>${d}</span><img class="country-img" src="${flags![d]}"/></p>`;
                            }
                            else {
                                return `<div class="bar" style="--bar-width: ${scale(parseFloat(d)) + '%'}"><p class="text-gray-700 pl-3">${d}</p></div>`
                            }
                        });
                });
            });
        }
    }, [sortedCsvData])
    //#endregion

    return (
        sortedCsvData ?
            <div>
                <p className="text-center font-bold text-3xl">Country Comparison</p>
                <div className="grid gap-5 grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                    <DropdownMenu head_title={'Countries'} options={options.countryOptions} setState={setCountry} state={country} />
                    {/* <Options head_title={'Countries'} options={options.countryOptions} setState={setCountry} state={country} multiple /> */}
                    <Options head_title={'Years'} options={options.yearOptions} setState={setYear} state={year} default_disabled />
                    <Options head_title={'Sectors'} options={options.sectorOptions} setState={setSector} state={sector} default_disabled />
                    <Options head_title={'Subsectors'} depends_on={sector} options={options.subsectorOptions} state={subsector} setState={setSubsector} default_disabled />
                    <Options head_title={'Indicators'} depends_on={subsector} options={options.indicatorOptions} state={indicator} setState={setIndicator} default_disabled />
                </div>
                <table ref={tableRef} className="w-full"></table>
                {sortedCsvData.length === 0 && <p>No data found for given filters</p>}
            </div> : <div><p>Loading</p></div>
    )

}
/**`<svg class="h-2">
                          <g>
                          <rect
                              width=${parseInt(d)}
                              height="10"
                              opacity="0.7"
                              stroke="#9d174d"
                              fill="#9d174d"
                              fillOpacity="0.3"
                              strokeWidth="1"
                              rx="1"
                          />
                          </g></svg> ` */