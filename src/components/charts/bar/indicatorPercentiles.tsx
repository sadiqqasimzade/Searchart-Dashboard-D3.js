import { useSelector } from 'react-redux';
import { getCountry, getSector, getSubsector, getTableMode, getYear } from 'src/store/selectors/appSelectors';
import ChartCard from '../chartCard';
import { useFetchCountryInfoQuery } from 'src/store/reducers/apiSlice';

type Props = {
    text_color: string
}
export default function IndicatorPercentiles({ text_color }: Props) {
    const country = useSelector(getCountry)
    const year = useSelector(getYear)
    const sector = useSelector(getSector)
    const subsector = useSelector(getSubsector)
    const tableMode = useSelector(getTableMode)
    const { data, isLoading, error } = useFetchCountryInfoQuery({ country, sector, subsector, year })


    return (
        <ChartCard text_color={text_color} title={`${subsector ? subsector : 'Subsector'}'s Indicators Percentiles`}>
            {(!year || !sector || !subsector || !country) ?
                <p>Please select a country, year, sector and subsector</p> :
                isLoading ? <p>Loading</p> :
                    error ? <p>Error</p> :
                        data &&
                        (tableMode ? <div className="">
                            <div className="grid gap-2 grid-flow-row" style={{gridTemplateColumns:'2fr 6fr 2fr'}}>
                                <p></p>
                                <p className="text-center font-semibold">Categories</p>
                                <p className="text-end font-semibold">Percentiles</p>
                            </div>
                            <div className="flex flex-col pt-2 max-h-[150px] overflow-auto">
                                {data.map((d, index) => <div key={d.indicator} className='grid gap-2 rounded-md px-3 py-2 bg-transparent  dark:odd:bg-[#152134] dark:even:bg-transparent' style={{gridTemplateColumns:'2fr 6fr 2fr'}}>
                                    <p className="text-start text-sm">{index + 1}</p>
                                    <p className="text-start text-sm">{d.indicator}</p>
                                    <p className="text-end text-sm">{d.score}</p>
                                </div>)}

                            </div>
                        </div> : data.map(d => <div key={d.indicator} className='grid items-center gap-2' style={{ gridTemplateColumns: '4fr 6fr 2fr' }}>
                            <p className="text-start text-xs">{d.indicator}</p>
                            <div className="relative h-3 w-full rounded-lg overflow-hidden bg-stone-200 dark:bg-[#FFFFFF3D]">
                                <div
                                    className={`absolute h-full w-full rounded transition-all duration-500 `}
                                    style={{ width: d.score + '%', backgroundColor: `hsl(${302 - d.score}, 54%, 32%)` }}
                                ></div>
                            </div>
                            <p className='text-gray'>{d.score}%</p>
                        </div>
                        ))
            }
        </ChartCard >)
}