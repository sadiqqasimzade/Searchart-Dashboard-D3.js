import { useFetchCountryScoreDifferenceQuery } from "src/store/reducers/apiSlice";
import ChartCard from "../chartCard";
import { useSelector } from "react-redux";
import { getCompareYears, getCountry, getFlag } from "src/store/selectors/appSelectors";

type Props = {
    text_color: string
}
export default function OverallScoreChange({ text_color }: Props) {
    const country = useSelector(getCountry)
    const years = useSelector(getCompareYears)
    const flag = useSelector(getFlag)
    const { data, isLoading, error } = useFetchCountryScoreDifferenceQuery({ country, year1: years[0], year2: years[1] })

    return (
        <ChartCard title={`Overall Score Change between ${years[0] ? years[0] : 'Year1'} and ${years[1] ? years[1] : 'Year2'}`} text_color={text_color}>
            {(!years[0] && !years[1] && !country) ?
                <p>Please select a country,years</p> :
                isLoading ? <p>Loading</p> :
                    error ? <p>Error</p> :
                        data &&
                        <div className="flex flex-col">
                            <div className="flex justify-between">
                                <img src={flag} alt="Flag" className="w-32 h-20 rounded-xl" />
                                <div className="flex flex-col gap-5">
                                    <p className="font-semibold">Country : {country}</p>
                                    <div className="flex flex-row gap-3">
                                        {data.score_difference > 0 ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-10 h-10">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                                        </svg>
                                            : data.score_difference < 0 ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-10 h-10">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
                                            </svg>
                                                : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-10 h-10">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                                                </svg>
                                        }
                                        <p className={`border-2 min-w-[50px] border-gray-400 dark:border-white py-1 px-3 flex justify-center items-center ${data.score_difference > 0 ? 'text-green-500' : data.score_difference< 0 ? 'text-red-500' : 'text-gray-500'}`}>{data.score_difference}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="py-3">
                                <div className="relative h-5 w-full rounded-lg overflow-hidden bg-stone-200">
                                    <div
                                        className={`absolute h-full w-full rounded transition-all duration-500 bg-blue-700`}
                                        style={{ width: (data.score_difference > 0 ? data.score_difference : - data.score_difference) * 100 + '%', backgroundColor: `${data.score_difference > 0 ? 'green' : 'red'}` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
            }
        </ChartCard>
    )
}
