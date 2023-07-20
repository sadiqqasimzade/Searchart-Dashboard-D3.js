import { PayloadAction, createSlice } from "@reduxjs/toolkit"
type AppState = {
    country: string | null
    year: string | null
    sector: string | null
    subsector: string | null
    indicator: string | null
    compareYears: [string | null, string | null]
}
const initialState: AppState = {
    compareYears: [null, null],
    country: null,
    indicator: null,
    sector: null,
    subsector: null,
    year: null
}


const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        changeYear(state, action: PayloadAction<string>) {
            state.year = action.payload
        },
        changeCountry(state, action: PayloadAction<string>) {
            state.country = action.payload
        },
        changeSector(state, action: PayloadAction<string>) {
            state.sector = action.payload
        },
        changeSubsector(state, action: PayloadAction<string>) {
            state.subsector = action.payload
        },
        changeIndicator(state, action: PayloadAction<string>) {
            state.indicator = action.payload
        },
        changeComapreYears1(state, action: PayloadAction<string>) {
            state.compareYears[0] = action.payload
        },
        changeComapreYears2(state, action: PayloadAction<string>) {
            state.compareYears[1] = action.payload
        },
    }
})

export const { changeComapreYears1,changeComapreYears2, changeCountry, changeIndicator, changeSector, changeSubsector, changeYear } = appSlice.actions
export default appSlice.reducer