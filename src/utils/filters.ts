import * as d3 from "d3";
import { CsvType } from "src/types/csvType";


export class CsvArray extends Array<CsvType> {
    filterByIndicator(this: CsvArray, indicator: string): CsvArray {
        return d3.filter(this, item => item.Indicator === indicator)
    }

    filterBySector(this: CsvArray, sector: string): CsvArray {
        return d3.filter(this, item => item.Sector === sector)
    }

    filterBySubsector(this: CsvArray, subsector: string): CsvArray {
        return d3.filter(this, item => item.Subsector === subsector)
    }

    filterByYear(this: CsvArray, year: string): CsvArray {
        return d3.filter(this, item => item.Year === year)
    }

    filterByCountry(this: CsvArray, country: string | string[]): CsvArray {
        return d3.filter(this, item => item.Country === country)
    }
}



  //&& (
                //     typeof country === "object" ?
                //         ((country as string[]).length > 0 ? (country as string[]).includes(data.Country) : isReturnedAllCountriesForDefault) :
                //         (country.length > 0 ? data.Country === country : isReturnedAllCountriesForDefault)
                // )