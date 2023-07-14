import * as d3 from "d3";

import { useEffect, useRef } from "react";
import { CsvType } from "src/types/csvType";

export default function Table({ sortedCsvData, country }: { sortedCsvData: CsvType[], country: string }) {
    const sortedForCountry = sortedCsvData.filter(d => d.Country === country)

    const tableRef = useRef<HTMLTableElement>(null)
    useEffect(() => {
        if (sortedCsvData) {
            const amount = d3.map(sortedForCountry, d => (1 - (parseFloat(d.Rank) / sortedCsvData.length)) * 100)
            const max_rank = d3.max(sortedCsvData, (sd) => parseInt(sd.Rank))
            amount.push(0)
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
                .data(["Rank", "Indicator", "Amout"])
                .enter()
                .append('th')
                .text((d) => d);
            table
                .append('tbody')
                .selectAll('tr')
                .data(sortedForCountry)
                .enter()
                .append('tr').style('display', "grid").style("grid-template-columns", "2fr 4fr 6fr").style("padding", "2px 0 2px 0")
                .selectAll('td')
                .data((d) => [d.Rank, d.Indicator, d.Rank])
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
                        return `<div class="bar" style="--bar-width: ${(1 - (parseInt(d) / max_rank)) * 100 + '%'}"><p class="text-gray-900 z-40 pl-3">${(1 - (parseFloat(d) / max_rank)) * 100}%</p></div>`
                    }
                });
        }
    }, [sortedForCountry])

    return (
        <div className="mt-5">
            <table ref={tableRef} className="w-full"></table>
            {sortedForCountry.length === 0 && <p>No data found for given filters</p>}
        </div>
    )
}