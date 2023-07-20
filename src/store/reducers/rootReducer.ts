import { Action, ThunkAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import { apiSlice } from "./apiSlice";
const rootReducer = combineReducers({
    appSlice, [apiSlice.reducerPath]: apiSlice.reducer,
})
export type RootState = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(apiSlice.middleware)
})

export default store
