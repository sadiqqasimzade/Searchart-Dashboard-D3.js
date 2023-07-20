import { useFetchCountryScoreDifferenceQuery } from "src/store/reducers/apiSlice";
import ChartCard from "../chartCard";
import { useSelector } from "react-redux";
import { getCompareYears, getCountry } from "src/store/selectors/appSelectors";
import { data } from "src/constants/data8";

export default function OverallScoreChange() {
    const country = useSelector(getCountry)
    const years = useSelector(getCompareYears)
    // const {data,isLoading,error}= useFetchCountryScoreDifferenceQuery({ country, year1: years[0], year2: years[1] })

    return (
        <ChartCard title="Overall Score Change">
            {/* {(!years[0] && !years[1] && !country) ?
                    <p>Please select a country,years</p> :
                    isLoading ? <p>Loading</p> :
                        error ? <p>Error</p> :
                            data?.map(d => <p>{d.sector} {d["rank difference"]}</p>)
                } */}

            <div className="flex justify-end">
                <p>{data.score_difference}</p>
                {data.score_difference > 0 ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
                    : data.score_difference < 0 ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
                    </svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                        </svg>
                }
            </div>

        </ChartCard>
    )
}