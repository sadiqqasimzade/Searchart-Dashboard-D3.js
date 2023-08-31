import { useSelector } from "react-redux";
import ChartCard from "../chartCard";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { SerializedError } from "@reduxjs/toolkit";
import AnotherTable from "../anotherTable";
import { colors } from "../../../utils/constans";
import { useFetchCountryDiagramQuery } from "../../../store/reducers/apiSlice";
import { getCountry, getSector, getSubsector, getIndicator, getTableMode } from "../../../store/selectors/appSelectors";
import { CountryDiagram } from "../../../store/types/apiResonseTypes";

type Props = {
    text_color: string
}
export default function IndicatorPercentilesByYear({ text_color }: Props) {
    const country = useSelector(getCountry)
    const sector = useSelector(getSector)
    const subsector = useSelector(getSubsector)
    const indicator = useSelector(getIndicator)
    const tableMode = useSelector(getTableMode)
    const { data, isLoading, error } = useFetchCountryDiagramQuery({ country, sector, subsector })
    const tooltipRef = useRef<HTMLDivElement>(null)
    const svgRef = useRef(null)
    const [filtered, setFiltered] = useState<CountryDiagram>()
    useEffect(() => {
        if (data) {
            setFiltered(data.filter(d => indicator.includes(d.indicator)))
        }
    }, [data, indicator])
    useEffect(() => {

        if (filtered && filtered.length > 0 && tableMode === false) {
            const margin = { top: 10, right: 20, bottom: 30, left: 30 },
                width = 420 - margin.left - margin.right,
                height = 150 - margin.top - margin.bottom;
            d3.select(svgRef.current).selectAll("*").remove()

            const svg = d3
                .select(svgRef.current)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            const x = d3
                .scaleTime()
                .domain(d3.extent(filtered[0].data, (d) => d3.timeParse("%Y")(d.year)))
                .range([0, width]);

            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x))
                .attr('stroke-opacity', 0);;

            const y = d3
                .scaleLinear()
                .domain([0, 100])
                .range([height, 0]);

            svg.append("g")
                .call(d3.axisLeft(y).ticks(5))
                .attr('stroke-opacity', 0);

            filtered.forEach((element, i) => {
                svg
                    .append("path")
                    .datum(element.data)
                    .attr("fill", "none")
                    .attr("stroke", colors[i])
                    .attr("stroke-width", 2.5)
                    .attr("d", d3.line()
                        .x((d) => x(d3.timeParse("%Y")(d.year)))
                        .y((d) => y(d.score))
                    );
            });





            //grid
            const make_y_gridlines = d3.axisLeft(y)
                .tickSize(-(width))
                .tickFormat("")
            svg.append("g")
                .attr('id', 'gridYLabel')
                .attr("transform", `translate(${0},0)`)
                .style("opacity", "0.1")
                .call(make_y_gridlines)


            //create dots
            // Add data points as circles and attach event listeners for tooltips
            const filteredAll = filtered.map(f => f.data).flat(Infinity)

            svg.selectAll("circle")
                .data(filteredAll)
                .enter()
                .append("circle")
                .attr("cx", d => x(d3.timeParse("%Y")(d.year)))
                .attr("cy", d => y(d.score))
                .attr("r", 5)
                .style('opacity', '0')
                .attr("fill", "steelblue")
                .on("mouseover", (event, d) => {
                    // Show the tooltip on mouseover
                    const tooltip = tooltipRef.current as HTMLDivElement
                    event.target.style = 'opacity:1'
                    tooltip.style.display = "block";
                    tooltip.style.left = event.target.cx.baseVal.value + "px";
                    tooltip.style.top = event.target.cy.baseVal.value + 30 + "px";
                    tooltip.textContent = `Date: ${d.year} Value: ${d.score}`;
                })
                .on("mouseout", (event) => {
                    // Hide the tooltip on mouseout
                    event.target.style = 'opacity:0'

                    const tooltip = tooltipRef.current as HTMLDivElement
                    tooltip.style.display = "none";
                });

        }
    }, [tableMode, filtered])
    return (
        //indicator ? indicator :
        <ChartCard title={`${subsector ? subsector : "Sector"} 's percentiles by years`} text_color={text_color}>
            {isLoading ? <p>Loading</p> :
                error ? <p>{(error as SerializedError).message}</p> : filtered &&
                    <div className="relative flex justify-center flex-col">
                        <div className={`${tableMode ? 'block' : 'hidden'}`}>
                            <AnotherTable data={filtered.map(d => d.data)} indexes={filtered.map(d => d.indicator)} x_key="year" y_key="score" x_title="Year" y_title="Socre" />
                        </div>

                        <div className={`${tableMode ? 'hidden' : 'block '} `}>
                            <div ref={tooltipRef} className="hidden absolute pointer-events-none w-28 border-gray-700 dark:bg-chartCardHeader border-2 h-16 p-2 text-sm bg-gray-100 rounded-2xl"></div>
                            <div ref={svgRef}></div>
                        </div>
                    </div>
            }

        </ChartCard>
    )
}
