import { useFetchCountryAverageScoreQuery } from "src/store/reducers/apiSlice"
import ChartCard from "../chartCard"
import { getCountry, getFlag, getYear } from "src/store/selectors/appSelectors"
import { useSelector } from "react-redux"
type Props = {
    text_color: string
}
export default function OverallPercentile({ text_color }: Props) {
    const country = useSelector(getCountry)
    const year = useSelector(getYear)
    const flag = useSelector(getFlag)
    const { data, isLoading, error } = useFetchCountryAverageScoreQuery({ country, year })

    return (
        <ChartCard title="Overall Percentile" text_color={text_color}>
            {(!year || !country) ?
                <p>Please select a country and year</p> :
                isLoading ? <p>Loading</p> :
                    error ? <p>Error</p> :
                        data &&
                        <div className="w-full h-full flex justify-center items-center flex-col">
                            <div className="flex items-center justify-between gap-5">
                                <p>{data.country}</p>
                                <img src={flag} className="h-5 w-8" alt="country flag" />
                            </div>
                            <div className="progress">
                                <div className="barOverflow">
                                    <div className="bar-overall transition-all" style={{
                                        transform: `rotate(${45 + data.average_score * 1.8}deg)`,
                                        borderBottomColor: `hsl(${data.average_score}, 100%, 40%)`,
                                        borderRightColor: `hsl(${data.average_score}, 100%, 40%)`,
                                    }}></div>
                                </div>
                                <span className="font-semibold text-lg">{data.average_score}</span>%
                            </div>

                        </div>
            }


        </ChartCard >
    )
}