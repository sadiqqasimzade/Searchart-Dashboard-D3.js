import { PayloadAction, createSlice } from "@reduxjs/toolkit"
type AppState = {
    country: string | null
    year: string | null
    sector: string | null
    subsector: string | null
    indicator: string | null
    compareYears: [string | null, string | null]
    flag: string | null
    tableMode: boolean
}
const initialState: AppState = {
    compareYears: [null, null],
    country: null,
    indicator: null,
    sector: null,
    subsector: null,
    year: null,
    flag: null,
    tableMode: false
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
            state.subsector = null
            state.indicator = null
        },
        changeSubsector(state, action: PayloadAction<string>) {
            state.subsector = action.payload
            state.indicator = null
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
        changeFlag(state, action: PayloadAction<string>) {
            state.flag = action.payload
        },
        changeTableMode(state, action: PayloadAction<boolean>) {
            state.tableMode = action.payload
        }
    }
})

export const { changeTableMode, changeFlag, changeComapreYears1, changeComapreYears2, changeCountry, changeIndicator, changeSector, changeSubsector, changeYear } = appSlice.actions
export default appSlice.reducer