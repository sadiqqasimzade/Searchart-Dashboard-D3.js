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
import { useFetchUniqueCountriesQuery, useFetchUniqueIndicatorsQuery, useFetchUniqueSectorsQuery, useFetchUniqueSubsectorsQuery, useFetchUniqueYearsQuery } from "../store/reducers/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { getSubsector, getSector, getCountry, getCompareYears, getIndicator, getYear, getTableMode } from "../store/selectors/appSelectors";
import { colors } from "../utils/constans";
import { changeSubsector, changeIndicator, changeFlag, changeTableMode, changeCountry, changeYear, changeSector, changeComapreYears1, changeComapreYears2 } from "../store/reducers/appSlice";

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


    useEffect(() => {
        if (subsectors) {
            dispatch(changeSubsector(subsectors[0]))
        }
    }, [subsectors])
    useEffect(() => {
        if (indicators) {
            dispatch(changeIndicator([indicators[0]]))
        }
    }, [indicators])

    useEffect(() => {
        if (country) {
            fetch(`https://restcountries.com/v3.1/name/${country}`).then(res => res.json()).then((d) => {
                dispatch(changeFlag(d[0].flags.svg))
            }).catch(() => {
                dispatch(changeFlag('404notfound.png'))
            })
        }
    }, [country])
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Set initial dark mode based on user preference
        const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(userPrefersDark);

        // Listen for changes in user preference
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (event:any) => {
            setIsDarkMode(event.matches);
        };
        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    useEffect(() => {
        // Update the class on the html tag based on dark mode
        document.documentElement.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);


    return (
        <>
            <div className="flex justify-left">

                <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="flex mx-2 items-center border-2 dark:border-opacity-20 h-10 w-10 justify-center border-stone-100 rounded-lg"
                >
                    {isDarkMode ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                    </svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                        </svg>
                    }
                </button>

            </div>
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
            <div className="grid grid-flow-row gap-4 custom-grid-cols-4 mt-5">
                <p></p>
                <div className='flex gap-5'>
                    <div className="flex flex-col">
                        <p className="font-bold">Country</p>
                        <Select
                            className=""
                            defaultValue={{ value: country, label: country }}
                            isSearchable
                            options={countries?.map(c => { return { value: c, label: c } }) as []}
                            onChange={e => dispatch(changeCountry(e!.value!))}
                            classNamePrefix={'react-select'}
                            styles={{
                                option: (styles) => {
                                    return {
                                        ...styles,
                                        backgroundColor: '',
                                        ":hover": {
                                            backgroundColor: 'blue'
                                        },
                                    };
                                },
                            }}
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
                        options={indicators?.map((c, i) => { return { value: c, label: c, color: colors[i] } }) as []}
                        onChange={e => {
                            dispatch(changeIndicator(e.map((c:any) => c.value as string)))
                        }}
                        components={animatedComponents}
                        classNamePrefix={'react-select'}
                        styles={{
                            option: (styles, { data, isDisabled, isFocused, isSelected }) => {
                                return {
                                    ...styles,
                                    backgroundColor: '',
                                    ":hover": {
                                        backgroundColor: 'blue'
                                    },
                                    color: (data as {color:string}).color,
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
                                color: (data as {color:string}).color,

                            }),

                            indicatorsContainer: (styles) => ({ ...styles, display: 'flex', alignItems: 'start' }),

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