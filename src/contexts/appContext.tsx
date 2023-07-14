import { PropsWithChildren, createContext } from 'react';
import { CsvType } from 'src/types/csvType';
type OptionType = {
    sectorOptions: string[];
    subsectorOptions: string[];
    indicatorOptions: string[];
    yearOptions: string[];
    countryOptions: string[];
};
type ContextType = {
    options: OptionType;
    sector: string
    country: string[]
    year: string
    indicator: string
    subsector: string
    csvData: CsvType[]
    sortedCsvData: CsvType[]
}
const initialContext: ContextType = {
    options: {
        sectorOptions: [],
        indicatorOptions: [],
        yearOptions: [],
        countryOptions: [],
        subsectorOptions: []
    },
    country: [],
    sector: '',
    year: '',
    indicator: '',
    subsector: '',
    csvData: [],
    sortedCsvData: []
};


export const AppContext = createContext<ContextType>(initialContext);
export const AppContextProvider = ({ children }: PropsWithChildren) => { <AppContext.Provider value={initialContext}>{children}</AppContext.Provider> };