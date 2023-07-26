import { useSelector } from "react-redux";
import { useFetchCountryDiagramQuery } from "src/store/reducers/apiSlice";
import { getCountry, getSector, getSubsector, getIndicator, getTableMode } from "src/store/selectors/appSelectors";
import ChartCard from "../chartCard";
import { useEffect, useRef } from "react";
import * as d3 from "d3";

type Props = {
    text_color: string
}
export default function IndicatorPercentilesByYear({ text_color }: Props) {
    const country = useSelector(getCountry)
    const sector = useSelector(getSector)
    const subsector = useSelector(getSubsector)
    const indicator = useSelector(getIndicator)
    const tableMode = useSelector(getTableMode)
    const { data, isLoading, error } = useFetchCountryDiagramQuery({ country, indicator, sector, subsector })
    const tooltipRef = useRef(null)
    const svgRef = useRef(null)
    useEffect(() => {
        if (data && data?.length > 0 && tableMode === false) {

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
                .domain(d3.extent(data, (d) => d3.timeParse("%Y")(d.year)))
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
                .call(d3.axisLeft(y))
                .attr('stroke-opacity', 0);;

            svg
                .append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 2.5)
                .attr("d", d3.line()
                    .x((d) => x(d3.timeParse("%Y")(d.year)))
                    .y((d) => y(d.score))
                );

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
            svg.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", d => x(d3.timeParse("%Y")(d.year)))
                .attr("cy", d => y(d.score))
                .attr("r", 5).style('opacity', '0')
                .attr("fill", "steelblue")
                .on("mouseover", (event, d) => {
                    // Show the tooltip on mouseover
                    const tooltip = tooltipRef.current as HTMLDivElement
                    event.target.style = 'opacity:1'
                    tooltip.style.display = "block";
                    tooltip.style.left = event.pageX + "px";
                    tooltip.style.top = event.pageY + "px";
                    tooltip.textContent = `Date: ${d.year} Value: ${d.score}`;
                })
                .on("mouseout", (event) => {
                    // Hide the tooltip on mouseout
                    event.target.style = 'opacity:0'

                    const tooltip = tooltipRef.current as HTMLDivElement
                    tooltip.style.display = "none";
                });
        }
    }, [data, tableMode])
    return (
        <ChartCard title={`${indicator ? indicator : "Indicator"} 's percentiles by years`} text_color={text_color}>
            {(!indicator && !sector && !subsector && !country) ?
                <p>Please select a country,indicator, sector,subsector</p> :
                isLoading ? <p>Loading</p> :
                    error ? <p>Error</p> : data && (tableMode ?
                        <div className="max-w-md mx-auto relative">
                            <h2 className="text-lg text-center">Years</h2>
                            <p className="absolute -rotate-90 -left-3 top-20 text-sm">Score</p>
                            <div className="py-3 px-6">
                                <div className="overflow-auto my-3 rounded-xl">
                                    <table className="text-sm">
                                        <thead className="dark:bg-chartCardHeader bg-lightChartHead uppercase">
                                            <tr className="">
                                                {data.map((d, i) =>
                                                    i % 5 === 0 &&

                                                    <th scope="col" className="py-2 px-2 text-left tracking-wider">
                                                        {d.year}
                                                    </th>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody className="">
                                            <tr className="">
                                                {data.map((d, i) =>
                                                    i % 5 === 0 &&

                                                    <td className="py-2 px-2 dark:text-white text-lightTableText">
                                                        {d.score}
                                                    </td>
                                                )}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="flex justify-center">
                            <div ref={tooltipRef} className="hidden absolute pointer-events-none w-28 border-gray-700 dark:bg-chartCardHeader  border-2 h-16 p-2 text-sm bg-gray-100 rounded-2xl"></div>
                            <div ref={svgRef}>

                            </div>
                        </div>
                    )
            }

        </ChartCard>
    )
}
