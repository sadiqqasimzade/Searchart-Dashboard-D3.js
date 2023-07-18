import * as d3 from 'd3'

export type CsvType = {
  Year: string;
  Sector: string;
  Subsector: string;
  Indicator: string;
  Country: string;
  Rank: string;
  Amount: string;
}

export class CsvArray extends Array<CsvType> {
  filterByIndicator(this: CsvArray, indicator: string): CsvArray {
    const filteredArray = d3.filter(this, item => item.Indicator === indicator);
    return new CsvArray(...filteredArray);
  }

  filterBySector(this: CsvArray, sector: string): CsvArray {
    const filteredArray = d3.filter(this, item => item.Sector === sector);
    return new CsvArray(...filteredArray);
  }

  filterBySubsector(this: CsvArray, subsector: string): CsvArray {
    const filteredArray = d3.filter(this, item => item.Subsector === subsector);
    return new CsvArray(...filteredArray);
  }

  filterByYear(this: CsvArray, year: string): CsvArray {
    const filteredArray = d3.filter(this, item => item.Year === year);
    return new CsvArray(...filteredArray);
  }

  filterByCountry(this: CsvArray, country: string | string[]): CsvArray {
    const filteredArray = d3.filter(this, item => item.Country === country);
    return new CsvArray(...filteredArray);
  }
}