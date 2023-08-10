import OverallPercentile from "./charts/bar/overallPercentile";
import OverallScoreChange from "./charts/change/overallScoreChange";
import ChangeInRankAmongYears from "./charts/lineChart/changeInRankAmongYears";
import AvarangePercentilesByCategories from './charts/bar/avarangePercentilesByCategories';
import IndexScoresByYears from './charts/lineChart/indexScoresByYears';
import SectorsAvarangeChange from './charts/change/sectorsAvarangeChange';
import IndicatorRankChange from './charts/change/indicatorRankChange';
import IndicatorPercentiles from './charts/bar/indicatorPercentiles';
import IndicatorPercentilesByYear from './charts/lineChart/indicatorPercentilesByYear';
import Filter from './inputs/filter';
import { useFetchUniqueCountriesQuery, useFetchUniqueIndicatorsQuery, useFetchUniqueSectorsQuery, useFetchUniqueSubsectorsQuery, useFetchUniqueYearsQuery } from "src/store/reducers/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCompareYears, getCountry, getIndicator, getSector, getSubsector, getTableMode, getYear } from "src/store/selectors/appSelectors";
import { changeComapreYears1, changeComapreYears2, changeCountry, changeFlag, changeIndicator, changeSector, changeSubsector, changeTableMode, changeYear } from "src/store/reducers/appSlice";
import { useEffect } from "react";
import Select from 'react-select';
import { colors } from "src/utils/constans";
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function ChartGrid() {
    const dispatch = useDispatch()

    const subsector = useSelector(getSubsector)
    const sector = useSelector(getSector)
    const country = useSelector(getCountry)
    const compareYears = useSelector(getCompareYears)
    const indicator = useSelector(getIndicator)
    const year = useSelector(getYear)
    const tablemode = useSelector(getTableMode)

    const { data: countries } = useFetchUniqueCountriesQuery()
    const { data: sectors } = useFetchUniqueSectorsQuery()
    const { data: subsectors } = useFetchUniqueSubsectorsQuery({ sector })
    const { data: years } = useFetchUniqueYearsQuery()
    const { data: indicators } = useFetchUniqueIndicatorsQuery({ subsector })


    useEffect(()=>{
        if(subsectors){
            dispatch(changeSubsector(subsectors[0]))
        }
    },[subsectors])
    useEffect(()=>{
        if(indicators){
            dispatch(changeIndicator([indicators[0]]))
        }
    },[indicators])

    useEffect(() => {
        if (country) {
            fetch(`https://restcountries.com/v3.1/name/${country}`).then(res => res.json()).then((d) => {
                dispatch(changeFlag(d[0].flags.svg))
            }).catch(() => {
                dispatch(changeFlag('404notfound.png'))
            })
        }
    }, [country])

    return (
        <>
            <div className='flex justify-center gap-6'>
                <button className={`flex  bg-white dark:bg-headLink   dark:border-darkHeadLinkBorder border-2 p-2 rounded-md  ${tablemode && 'dark:bg-[#0C1E3A7A]  text-[#CBCACA] dark:text-[#505866]'} `} onClick={() => dispatch(changeTableMode(false))} >
                    Chart
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                    </svg>
                </button>
                <select className="dark:bg-headLink bg-white p-2 rounded-md dark:border-darkHeadLinkBorder border-2">
                    <option value=''>Country Overview</option>
                </select>
                <button className={`flex  bg-white dark:bg-headLink   p-2 rounded-md dark:border-darkHeadLinkBorder border-2 ${!tablemode && 'dark:bg-[#0C1E3A7A]  text-[#CBCACA] dark:text-[#505866]'} `} onClick={() => dispatch(changeTableMode(true))}>
                    Table
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
                    </svg>
                </button>
            </div>
            <div className="grid grid-flow-row gap-4 custom-grid-cols-4  mt-5">
                <p></p>
                <div className='flex gap-5'>
                    <div className="flex flex-col">
                        <p className="font-bold">Country</p>
                        <Select
                            className=""
                            defaultValue={{ value: country, label: country }}
                            isSearchable
                            name="color"
                            options={countries?.map(c => { return { value: c, label: c } }) as []}
                            onChange={e => dispatch(changeCountry(e.value))}
                            classNamePrefix={'react-select'}
                        />
                    </div>
                    {/* <Filter head_title='Country' state={country} options={countries} setState={changeCountry} default_disabled /> */}
                    <Filter head_title='Year' state={year} options={years} setState={changeYear} depends_on={country} default_disabled />
                </div>
                <div className='flex'>
                    <Filter head_title='Sector' state={sector} options={sectors} setState={changeSector} depends_on={country} default_disabled />
                </div>
                <div className='flex gap-5 items-end'>
                    <Filter head_title='' options={years} state={compareYears[0]} setState={changeComapreYears1} default_disabled />
                    <Filter head_title='' options={years} state={compareYears[1]} setState={changeComapreYears2} default_disabled />
                </div>


                <div className="relative flex items-center">
                    <p className="absolute truncate text-xs grid -left-[4.5rem] -rotate-90 text-center text-md writing-mode-vertical-rl font-bold text-red-600">Overall Score Analysis</p>
                </div>
                <OverallPercentile text_color="text-red-600" />
                <ChangeInRankAmongYears text_color="text-red-600" />
                <OverallScoreChange text_color="text-red-600" />

                <div className="relative flex items-center">
                    <p className="absolute truncate text-xs grid -left-14  -rotate-90 text-center text-md writing-mode-vertical-rl font-bold text-green-600">Sector Analysis</p>
                </div>
                <AvarangePercentilesByCategories text_color="text-green-600" />
                <IndexScoresByYears text_color="text-green-600" />
                <SectorsAvarangeChange text_color="text-green-600" />

                <p></p>
                <div className="">
                    <Filter head_title='Subsector' options={subsectors} state={subsector} setState={changeSubsector} depends_on={sector} default_disabled />
                </div>
                <div className=" flex flex-col">
                    <p className="font-bold">Indicator</p>
                    <Select
                        name="color"
                        closeMenuOnSelect={false}
                        defaultValue={indicator.length > 0 ? indicator : null}
                        value={indicator.map((c, i) => { return { value: c, label: c, color: colors[i] } })}
                        isMulti
                        options={indicators?.map((c, i) => { return { value: c, label: c, color: 'white' } }) as []}
                        onChange={e => {
                            dispatch(changeIndicator(e.map(c => c.value)))
                        }}
                        components={animatedComponents}
                        classNamePrefix={'react-select'}
                        styles={{
                            control: (styles) => ({ ...styles, backgroundColor: 'white', overflow: "auto", height: '20px' }),
                            option: (styles, { data, isDisabled, isFocused, isSelected }) => {
                                return {
                                    ...styles,
                                    backgroundColor: '',
                                    ":hover": {
                                        backgroundColor: 'blue'
                                    },
                                    color: data.color,
                                };
                            },
                            multiValue: (styles, { data }) => {
                                return {
                                    ...styles,
                                    backgroundColor: 'gray',
                                };
                            },
                            multiValueLabel: (styles, { data }) => ({
                                ...styles,
                                color: data.color,

                            }),
                            multiValueRemove: (styles, { data }) => ({
                                ...styles,
                                ':hover': {
                                    backgroundColor: 'red',
                                    color: 'white',
                                },
                            }),
                            indicatorsContainer: (styles) => ({ ...styles, display: 'flex',alignItems:'start' }),
                            
                        }}
                    />

                </div>
                <div></div>

                <div className="relative flex items-center">
                    <p className="absolute truncate -left-14 grid text-xs -rotate-90  text-center text-md font-bold text-blue-600">Indicator Analysis</p>
                </div>
                <IndicatorPercentiles text_color="text-blue-600" />
                <IndicatorPercentilesByYear text_color="text-blue-600" />
                <IndicatorRankChange text_color="text-blue-600" />
            </div >
        </>
    )
}