import * as d3 from "d3";

import { useEffect, useRef } from "react";
import { CsvType } from "src/types/csvType";


export default function Table({sortedCsvData}:{sortedCsvData:CsvType[]}){
    const tableRef = useRef<HTMLTableElement>(null)
    type FlagState = Record<string, string>;

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
                            flags[d.Country] = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/600px_Grey_HEX-DADADA_with_White_question_mark.svg/1280px-600px_Grey_HEX-DADADA_with_White_question_mark.svg.png";
                        })
                );

                Promise.all(promises).then(() => {
                    const amount = d3.map(sortedCsvData, d => parseFloat(d.Amount))
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

    return (
            <div className="mt-5">
                <table ref={tableRef} className="w-full"></table>
                {sortedCsvData.length === 0 && <p>No data found for given filters</p>}
            </div> 
    )
}