import { useFetchSectorRankDifferenceQuery } from "src/store/reducers/apiSlice";
import ChartCard from "../chartCard";
import { useSelector } from "react-redux";
import { getCompareYears, getCountry } from "src/store/selectors/appSelectors";
import { data } from "src/constants/data4";
import { useEffect, useRef } from "react";
import * as d3 from "d3";
export default function SectorsAvarangeChange() {

    const country = useSelector(getCountry)
    const years = useSelector(getCompareYears)
    // const { data, isLoading, error } = useFetchSectorRankDifferenceQuery({ country, year1: years[0], year2: years[1] })
    const sorted = data.sort((a, b) => b.rank_difference - a.rank_difference)


    return (
        <ChartCard title="Index Scores By Years">
                {/* {(!years[0] && !years[1] && !country) ?
                    <p>Please select a country,years</p> :
                    isLoading ? <p>Loading</p> :
                        error ? <p>Error</p> :
                            data?.map(d => <p>{d.sector} {d["rank difference"]}</p>)
                } */}

                {sorted.map(d => <>
                    <div className="flex justify-between py-1">
                        <p>{d.sector}</p>
                        <div className="flex justify-end">
                            <p>{d.rank_difference}</p>
                            {d.rank_difference > 0 ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                            </svg>
                                : d.rank_difference < 0 ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
                                </svg>
                                    : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                                    </svg>
                            }
                        </div>
                    </div>
                    <hr />
                </>)}

        </ChartCard>
    )
}