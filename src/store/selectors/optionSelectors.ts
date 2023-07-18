import { RootState } from "../reducers/rootReducer"

export const getCsvData = (state: RootState) => state.appSlice.csvData
export const getCountryOptions=(state:RootState)=>state.optionsSlice.countries
export const getYearOptions=(state:RootState)=>state.optionsSlice.years
export const getSectorOptions=(state:RootState)=>state.optionsSlice.secors
export const getIndicatorOptions=(state:RootState)=>state.optionsSlice.indicators
export const getSubsectorOptions=(state:RootState)=>state.optionsSlice.subsectors
