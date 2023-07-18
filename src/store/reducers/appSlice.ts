import { PayloadAction, createSlice } from "@reduxjs/toolkit"
type AppState = {
    country: string | undefined
    year: string | undefined
    sector: string | undefined
    subsector: string | undefined
    indicator: string | undefined
    compareYears: [string | undefined, string | undefined]
}
const initialState: AppState = {
    compareYears: [undefined, undefined],
    country: undefined,
    indicator: undefined,
    sector: undefined,
    subsector: undefined,
    year: undefined
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
        changeComapreYears(state, action: PayloadAction<[string, string]>) {
            state.compareYears = action.payload
        }
    }
})

export const { changeComapreYears, changeCountry, changeIndicator, changeSector, changeSubsector, changeYear } = appSlice.actions
export default appSlice.reducer