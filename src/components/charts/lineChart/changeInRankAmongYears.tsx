import * as d3 from "d3"
import { useFetchCountryScoreYearQuery } from "src/store/reducers/apiSlice"
import ChartCard from "../chartCard"
import { getCountry, getTableMode } from "src/store/selectors/appSelectors"
import { useSelector } from "react-redux"
import { useEffect, useRef } from "react"

type Props = {
    text_color: string
}
export default function ChangeInRankAmongYears({ text_color }: Props) {

    const country = useSelector(getCountry)
    const { data, isLoading, error } = useFetchCountryScoreYearQuery({ country })
    const svgRef = useRef(null)
    const tooltipRef = useRef(null)
    const tableMode = useSelector(getTableMode)
    useEffect(() => {
        if (data && data?.length > 0 && tableMode === false) {
            // Set the dimensions and margins of the graph
            const margin = { top: 10, right: 30, bottom: 30, left: 60 },
                width = 460 - margin.left - margin.right,
                height = 150 - margin.top - margin.bottom;
            d3.select(svgRef.current).selectAll("*").remove()
            //Svg element
            const svg = d3
                .select(svgRef.current)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


            //Scale
            const xScale = d3
                .scaleTime()
                .domain(d3.extent(data, (d) => d3.timeParse("%Y")(d.year)))
                .range([0, width]);
            const yScale = d3
                .scaleLinear()
                .domain([0, 100])
                .range([height, 0]);


            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(xScale))
                .attr('stroke-opacity', 0);;


            svg.append("g")
                .call(d3.axisLeft(yScale))
                .attr('stroke-opacity', 0);;

            svg
                .append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "red")
                .attr("stroke-width", 2.5)
                .attr("d", d3.line()
                    .x((d) => xScale(d3.timeParse("%Y")(d.year)))
                    .y((d) => yScale(d.average_score))
                );

            const make_x_gridlines = d3.axisBottom(xScale)
                .tickSize(-height)
                .tickFormat("");

            const make_y_gridlines = d3.axisLeft(yScale)
                .tickSize(-(width))
                .tickFormat("")

            svg.append("g")
                .attr('id', 'gridXLabel')
                .attr("transform", `translate(0,${height})`)
                .style("opacity", "0.1")
                .call(make_x_gridlines)

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
                .attr("cx", d => xScale(d3.timeParse("%Y")(d.year)))
                .attr("cy", d => yScale(d.average_score))
                .attr("r", 5).style('opacity', '0')
                .attr("fill", "steelblue")
                .on("mouseover", (event, d) => {
                    // Show the tooltip on mouseover
                    const tooltip = tooltipRef.current as HTMLDivElement
                    event.target.style = 'opacity:1'
                    tooltip.style.display = "block";
                    tooltip.style.left = event.pageX + "px";
                    tooltip.style.top = event.pageY + "px";
                    tooltip.textContent = `Date: ${d.year} Value: ${d.average_score}`;
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
        <ChartCard title="Change in Rank Among Years" text_color={text_color}>
            {(!country) ?
                <p>Please select a country</p> :
                isLoading ? <p>Loading</p> :
                    error ? <p>Error</p> :
                        data && (tableMode ?
                            <div className="max-w-md mx-auto relative">
                                <h2 className="text-lg  text-center">Years</h2>
                                <p className="absolute -rotate-90 -left-3 top-20 text-sm">Rank</p>
                                <div className="py-3 px-6">
                                    <div className="overflow-auto my-3 rounded-xl">
                                        <table className="text-sm">
                                            <thead className="dark:bg-chartCardHeader bg-lightChartHead uppercase">
                                                <tr className="">
                                                    {data.map(d =>
                                                        <th scope="col" className="py-2 px-2 text-left tracking-wider">
                                                            {d.year}
                                                        </th>
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody className="">

                                                <tr className="">

                                                    {data.map(d =>
                                                        <td className="py-2 px-2 dark:text-white text-lightTableText">
                                                            {d.average_score}
                                                        </td>
                                                    )}
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            :
                            <>
                                <div ref={tooltipRef} className="hidden absolute pointer-events-none w-28 border-gray-700 dark:bg-chartCardHeader border-2 h-16 p-2 text-sm bg-gray-100 rounded-2xl"></div>
                                <div ref={svgRef}>

                                </div>
                            </>
                        )}

        </ChartCard>)
}