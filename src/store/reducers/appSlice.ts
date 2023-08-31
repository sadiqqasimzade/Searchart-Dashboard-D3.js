import { PayloadAction, createSlice } from "@reduxjs/toolkit"
type AppState = {
    country: string | null
    year: string | null
    sector: string | null
    subsector: string | null
    indicator: string[]
    compareYears: [string | null, string | null]
    flag: string | null
    tableMode: boolean
}
const initialState: AppState = {
    compareYears: ['2010', '2020'],
    country: 'Azerbaijan',
    indicator: ['Population ages 0-14 percent of total'],
    sector: "Economy",
    subsector: '',
    year: '2020',
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
            state.indicator = []
        },
        changeSubsector(state, action: PayloadAction<string>) {
            state.subsector = action.payload
            state.indicator = []
        },
        changeIndicator(state, action: PayloadAction<string[]>) {
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