import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getCountry, getSector, getSubsector, getYear } from 'src/store/selectors/appSelectors';
import ChartCard from '../chartCard';
import { useFetchCountryInfoQuery } from 'src/store/reducers/apiSlice';
import { data } from 'src/constants/data6';

export default function IndicatorPercentiles() {
    const country = useSelector(getCountry)
    const year = useSelector(getYear)
    const sector = useSelector(getSector)
    const subsector = useSelector(getSubsector)
    const tableRef = useRef<HTMLTableElement>(null)

    // const { data, isLoading, error } = useFetchCountryInfoQuery({ country, sector, subsector, year })

    useEffect(() => {
        if (data) {
            const sorted = data.sort((a, b) => a.score - b.score)
            tableRef.current!.innerHTML = '';
            const table = d3.select(tableRef.current)
            table
                .append('tbody')
                .selectAll('tr')
                .data(sorted)
                .enter()
                .append('tr').style('display', "grid").style("grid-template-columns", "4fr 6fr 1fr").style("padding", "2px 0 2px 0").style('text-size', 'small')
                .selectAll('td')
                .data((d) => [d.indicator, d.score,d.score])
                .enter()
                .append('td')
                .style('place-items', "end").style("padding-left", "20px")
                .html((d, i) => {
                    if (i === 0) {
                        return `<p class="text-start">${d}</p>`
                    }
                    if (i === 1) {
                        return `<div class="bar h-4" style="--bar-width: ${d}%"></div>`
                    }
                    else{
                        return `<p className='text-gray'>${d}</p>`
                    }
                });
        }
    }, [data])


    return (
        <ChartCard title="Index sector's Indicators Percentiles">
                {/* {(!year && !sector && !subsector && !country) ?
                    <p>Please select a country, year, sector,subsector</p> :
                    isLoading ? <p>Loading</p> :
                        error ? <p>Error</p> :
                    } */}
                <table ref={tableRef} className="w-full"></table>
        </ChartCard>)
}