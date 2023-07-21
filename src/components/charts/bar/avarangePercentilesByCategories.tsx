import { useFetchAvarangeScoreQuery } from "src/store/reducers/apiSlice";
import ChartCard from "../chartCard";
import { useSelector } from "react-redux";
import { getCountry, getYear } from "src/store/selectors/appSelectors";
export default function AvarangePercentilesByCategories() {
    const country = useSelector(getCountry)
    const year = useSelector(getYear)
    const { data, isLoading, error } = useFetchAvarangeScoreQuery({ country, year })


    return (
        <ChartCard title="Avarange Percentiles By Categories">
            {(!year || !country) ?
                <p>Please select a country and year</p> :
                isLoading ? <p>Loading</p> :
                    error ? <p>Error</p> :
                        data && data.map(d => <div key={d.sector} className='grid' style={{ gridTemplateColumns: '4fr 6fr 2fr' }}>
                            <p className="text-start text-sm">{d.sector}</p>
                            <div className="bar h-4" style={{ '--bar-width': `${d.average_score}%`, '--color': 'red' }}></div>
                            <p className='text-gray '>{d.average_score}%</p>
                        </div>
                        )}

        </ChartCard >
    )
}