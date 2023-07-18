import { PayloadAction, createSlice } from "@reduxjs/toolkit"

type OptionState = {
    countries: string[]
    years: string[]
    secors: string[]
    subsectors: string[]
    indicators: string[]
}
const initialState: OptionState = {
    countries: [],
    years: [],
    secors: [],
    subsectors: [],
    indicators: []
}


const optionSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        changeCountryOptions(state, action: PayloadAction<string[]>) {
            state.countries = action.payload
        },
        changeYearOptions(state, action: PayloadAction<string[]>) {
            state.years = action.payload
        },
        changeSectorOptions(state, action: PayloadAction<string[]>) {
            state.secors = action.payload
        },
        changeSubsectorOptions(state, action: PayloadAction<string[]>) {
            state.subsectors = action.payload
        },
        changeIndicatorOptions(state, action: PayloadAction<string[]>) {
            state.indicators = action.payload
        }
    }
})

export const { changeCountryOptions, changeIndicatorOptions, changeSectorOptions, changeSubsectorOptions, changeYearOptions } = optionSlice.actions
export default optionSlice.reducer