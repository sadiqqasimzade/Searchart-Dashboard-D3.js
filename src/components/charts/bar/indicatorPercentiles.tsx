import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getCountry, getSector, getSubsector, getYear } from 'src/store/selectors/appSelectors';
import ChartCard from '../chartCard';
import { useFetchCountryInfoQuery } from 'src/store/reducers/apiSlice';
export default function IndicatorPercentiles() {
    const country = useSelector(getCountry)
    const year = useSelector(getYear)
    const sector = useSelector(getSector)
    const subsector = useSelector(getSubsector)
    const tableRef = useRef<HTMLTableElement>(null)

    const { data, isLoading, error } = useFetchCountryInfoQuery({ country, sector, subsector, year })

    useEffect(() => {
        if (data) {
            tableRef.current!.innerHTML = '';
            const table = d3.select(tableRef.current)
            table
                .append('tbody')
                .selectAll('tr')
                .data(data)
                .enter()
                .append('tr').style('display', "grid").style("grid-template-columns", "6fr 4fr").style("padding", "2px 0 2px 0")
                .selectAll('td')
                .data((d) => [d.indicator, d.score])
                .enter()
                .append('td')
                .style('place-items', "end").style("padding-left", "20px")
                .html((d, i) => {
                    if (i === 0) {
                        return `<p class="text-end">${d}</p>`
                    }
                    if (i === 1) {
                        return `<p class="flex flex-row gap-5"><span class="">${d}</span>`;
                    }
                    else {
                        return `<div class="bar" style="--bar-width: ${d}"><p class="text-gray-900 z-40 pl-3">${d}%</p></div>`
                    }
                });
        }
    }, [data])


    return (
        <ChartCard title="Indicator Percentiles">
            <div className="mt-1">
                {(!year && !sector && !subsector && !country) ?
                    <p>Please select a country, year, sector,subsector</p> :
                    isLoading ? <p>Loading</p> :
                        error ? <p>Error</p> :
                            <table ref={tableRef} className="w-full"></table>
                }
            </div>
        </ChartCard>)
}