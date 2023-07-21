import { useSelector } from 'react-redux';
import { getCountry, getSector, getSubsector, getYear } from 'src/store/selectors/appSelectors';
import ChartCard from '../chartCard';
import { useFetchCountryInfoQuery } from 'src/store/reducers/apiSlice';


export default function IndicatorPercentiles() {
    const country = useSelector(getCountry)
    const year = useSelector(getYear)
    const sector = useSelector(getSector)
    const subsector = useSelector(getSubsector)
    const { data, isLoading, error } = useFetchCountryInfoQuery({ country, sector, subsector, year })


    return (
        <ChartCard title={`${subsector?subsector:'Subsector'}'s Indicators Percentiles`}>
            {(!year || !sector || !subsector || !country) ?
                <p>Please select a country, year, sector and subsector</p> :
                isLoading ? <p>Loading</p> :
                    error ? <p>Error</p> :
                        data && data.map(d => <div key={d.indicator} className='grid' style={{ gridTemplateColumns: '4fr 6fr 2fr' }}>
                            <p className="text-start text-sm">{d.indicator}</p>
                            <div className="bar h-4" style={{ '--bar-width': `${d.score}%` }}></div>
                            <p className='text-gray'>{d.score}%</p>
                        </div>
                        )
            }
        </ChartCard >)
}