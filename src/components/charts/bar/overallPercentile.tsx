import { useFetchCountryAverageScoreQuery } from "src/store/reducers/apiSlice"
import ChartCard from "../chartCard"
import { getCountry, getYear } from "src/store/selectors/appSelectors"
import { useSelector } from "react-redux"

export default function OverallPercentile(){
    const country = useSelector(getCountry)
    const year = useSelector(getYear)
    const { data, isLoading, error } = useFetchCountryAverageScoreQuery({ country,year })

    return(
        <ChartCard title="Overall Percentile">
            <div className="mt-1">
                {(!year && !country) ?
                    <p>Please select a country, year</p> :
                    isLoading ? <p>Loading</p> :
                        error ? <p>Error</p> :
                            <p>{data?.average_score}:{data?.country}</p>
                }
            </div>
        </ChartCard>
    )
}