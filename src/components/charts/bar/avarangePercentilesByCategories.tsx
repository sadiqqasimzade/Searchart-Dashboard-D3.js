import { useFetchCountryAverageScoreQuery } from "src/store/reducers/apiSlice";
import ChartCard from "../chartCard";
import { useSelector } from "react-redux";
import { getCountry, getYear } from "src/store/selectors/appSelectors";

export default function AvarangePercentilesByCategories() {
    const country = useSelector(getCountry)
    const year = useSelector(getYear)
    // const { data, isLoading, isError, error } = useFetchCountryAverageScoreQuery({ country, year })

    return (
        <ChartCard title="Avarange Percentiles By Categories">
            {/* {(!year && !sector && !subsector && !country) ?
                    <p>Please select a country, year, sector,subsector</p> :
                    isLoading ? <p>Loading</p> :
                        error ? <p>Error</p> :
                    } */}
        </ChartCard>
    )
}