import { useSelector } from 'react-redux';
import { getCountry, getSector, getSubsector, getYear } from 'src/store/selectors/appSelectors';
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
    const { data, isLoading, error } = useFetchCountryInfoQuery({ country, sector, subsector, year })


    return (
        <ChartCard text_color={text_color} title={`${subsector ? subsector : 'Subsector'}'s Indicators Percentiles`}>
            {(!year || !sector || !subsector || !country) ?
                <p>Please select a country, year, sector and subsector</p> :
                isLoading ? <p>Loading</p> :
                    error ? <p>Error</p> :
                        data && data.map(d => <div key={d.indicator} className='grid' style={{ gridTemplateColumns: '4fr 6fr 2fr' }}>
                            <p className="text-start text-sm">{d.indicator}</p>
                            <div className="relative h-3 w-full rounded-lg overflow-hidden bg-stone-200">
                                <div
                                    className={`absolute h-full w-full rounded transition-all duration-500 bg-blue-700`}
                                    style={{ width: d.score + '%', backgroundColor: `hsl(220 100% ${110 - d.score}%)` }}
                                ></div>
                            </div>
                            <p className='text-gray'>{d.score}%</p>
                        </div>
                        )
            }
        </ChartCard >)
}