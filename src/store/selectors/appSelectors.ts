import { RootState } from "../reducers/rootReducer"

export const getCountry = (state: RootState) => state.appSlice.country
export const getYear = (state: RootState) => state.appSlice.year
export const getSector = (state: RootState) => state.appSlice.sector
export const getSubsector = (state: RootState) => state.appSlice.subsector
export const getIndicator = (state: RootState) => state.appSlice.indicator
export const getCompareYears = (state: RootState) => state.appSlice.compareYears
