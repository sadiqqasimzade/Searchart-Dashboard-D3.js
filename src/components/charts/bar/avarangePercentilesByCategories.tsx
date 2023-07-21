import { useFetchAvarangeScoreQuery } from "src/store/reducers/apiSlice";
import ChartCard from "../chartCard";
import { useSelector } from "react-redux";
import { getCountry, getYear } from "src/store/selectors/appSelectors";

type Props = {
    text_color: string
}
export default function AvarangePercentilesByCategories({ text_color }: Props) {
    const country = useSelector(getCountry)
    const year = useSelector(getYear)
    const { data, isLoading, error } = useFetchAvarangeScoreQuery({ country, year })

    return (
        <ChartCard title="Avarange Percentiles By Categories" text_color={text_color}>
            {(!year || !country) ?
                <p>Please select a country and year</p> :
                isLoading ? <p>Loading</p> :
                    error ? <p>Error</p> :
                        data && data.map(d => <div key={d.sector} className='grid' style={{ gridTemplateColumns: '4fr 6fr 2fr' }}>
                            <p className="text-start text-sm">{d.sector}</p>
                            <div className="relative h-3 w-full rounded-lg overflow-hidden bg-stone-200">
                                <div
                                    className={`absolute h-full w-full rounded transition-all duration-500 bg-blue-700`}
                                    style={{ width: d.average_score + '%', backgroundColor: `hsl( ${d.average_score * 1.2} 100% 40% )` }}
                                ></div>
                            </div>
                            <p className='text-gray '>{d.average_score}%</p>
                        </div>
                        )}

        </ChartCard >
    )
}