import { useFetchAvarangeScoreQuery } from "src/store/reducers/apiSlice";
import ChartCard from "../chartCard";
import { useSelector } from "react-redux";
import { getCountry, getTableMode, getYear } from "src/store/selectors/appSelectors";

type Props = {
    text_color: string
}
export default function AvarangePercentilesByCategories({ text_color }: Props) {
    const country = useSelector(getCountry)
    const year = useSelector(getYear)
    const { data, isLoading, error } = useFetchAvarangeScoreQuery({ country, year })
    const tableMode = useSelector(getTableMode)

    return (
        <ChartCard title="Avarange Percentiles By Categories" text_color={text_color}>
            {(!year || !country) ?
                <p>Please select a country and year</p> :
                isLoading ? <p>Loading</p> :
                    error ? <p>Error</p> :
                        data && (tableMode ?
                            <div className="">
                                <div className="grid gap-2 grid-flow-row px-2" style={{ gridTemplateColumns: '2fr 6fr 2fr' }}>
                                    <p></p>
                                    <p className="text-end font-semibold">Categories</p>
                                    <p className="text-end font-semibold">Percentiles</p>
                                </div>
                                <div className="flex flex-col pt-2 max-h-[120px] overflow-auto">
                                    <div className="px-2">
                                        {data.map((d, index) => <div key={d.sector} className='grid gap-2 rounded-md px-3 py-2 bg-transparent  dark:odd:bg-[#152134] dark:even:bg-transparent' style={{ gridTemplateColumns: '2fr 6fr 2fr' }}>
                                            <p className="text-start text-sm">{index + 1}</p>
                                            <p className="text-end text-sm">{d.sector}</p>
                                            <p className="text-end text-sm">{d.average_score}</p>
                                        </div>)}

                                    </div>

                                </div>
                            </div> :
                            <>
                                {data.map(d => <div key={d.sector} className='grid items-center gap-2' style={{ gridTemplateColumns: '4fr 6fr 2fr' }}>
                                    <p className="text-start text-sm">{d.sector}</p>
                                    <div className="relative h-3 w-full rounded-lg overflow-hidden bg-stone-200 dark:bg-[#FFFFFF3D]">
                                        <div
                                            className={`absolute h-full w-full rounded transition-all duration-500`}
                                            style={{ width: d.average_score + '%', backgroundColor: `hsl( ${d.average_score * 1.2} 100% 40% )` }}
                                        ></div>
                                    </div>
                                    <p className='text-gray '>{d.average_score}%</p>
                                </div>)}
                            </>)
            }

        </ChartCard >
    )
}