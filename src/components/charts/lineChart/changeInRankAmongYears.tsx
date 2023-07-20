import * as d3 from "d3"
import { useFetchCountryScoreYearQuery } from "src/store/reducers/apiSlice"
import ChartCard from "../chartCard"
import { getCountry } from "src/store/selectors/appSelectors"
import { useSelector } from "react-redux"
import { useEffect, useRef } from "react"
import { data } from "src/constants/data2"
export default function ChangeInRankAmongYears() {

    const country = useSelector(getCountry)
    // const { data, isLoading, error } = useFetchCountryScoreYearQuery({ country })
    const svgRef = useRef(null)


    useEffect(() => {


        // Sort the data by year
        const filtered = data.filter(d => d.sector === "Army")
        const sortedData = filtered.sort((a, b) => parseInt(a.year) - parseInt(b.year));

        // Set the dimensions and margins of the graph
        const margin = { top: 10, right: 30, bottom: 30, left: 60 },
            width = 460 - margin.left - margin.right,
            height = 200 - margin.top - margin.bottom;

        const svg = d3
            .select(svgRef.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const x = d3
            .scaleTime()
            .domain(d3.extent(sortedData, (d) => d3.timeParse("%Y")(d.year)))
            .range([0, width]);

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        const y = d3
            .scaleLinear()
            .domain([0, 100])
            .range([height, 0]);

        svg.append("g").call(d3.axisLeft(y));

        svg
            .append("path")
            .datum(sortedData)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2.5)
            .attr("d", d3.line()
                .x((d) => x(d3.timeParse("%Y")(d.year)))
                .y((d) => y(d.score))
            );


        const make_x_gridlines = d3.axisBottom(x)
            .tickSize(-height)
            .tickFormat("");

        const make_y_gridlines = d3.axisLeft(y)
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
    }, [])
    return (
        <ChartCard title="Change in Rank Among Years">
            {/* {(!country) ?
                    <p>Please select a country</p> :
                    isLoading ? <p>Loading</p> :
                        error ? <p>Error</p> :
                            data?.map(d => <p>{d.year} {d.sector} {d.year}</p>)
                } */}
            <div ref={svgRef}></div>
        </ChartCard>)
}