import { useFetchUniqueYearsQuery } from "../../store/reducers/apiSlice";

type Props = {
    x_title: string;
    y_title: string;
    data: any[][];
    x_key: string;
    y_key: string;
    indexes?: string[] | undefined;
};

export default function AnotherTable({ data, x_key, x_title, y_key, y_title, indexes }: Props) {
    const { data: years } = useFetchUniqueYearsQuery();
    return (
        <>
            <h2 className="text-lg text-center">{x_title}</h2>
            <p className="absolute -rotate-90 -left-3 top-20 text-sm">{y_title}</p>
            <div className="w-full h-full px-6">
                <div className="py-1 overflow-x-scroll h-32 mb-3">
                    <div className="text-sm">
                        <div className="flex flex-col">
                            {data && data.length > 0 && years && (
                                <>
                                    <div className="uppercase flex flex-row table-container">
                                        <div className="text-left tracking-wider flex flex-row">
                                            <div className="text-center p-2 w-40 left-border"></div>
                                        </div>
                                        {years.map((year, i) => i % 5 === 0 &&
                                            <div className="text-left tracking-wider flex flex-row" key={i}>
                                                <p className={`text-center dark:bg-chartCardHeader bg-lightChartHead p-2 w-14 ${i === 0 && 'left-border'}`}>{year}</p>
                                            </div>
                                        )}
                                    </div>
                                    {data.map((rows, i) =>
                                        <div className="uppercase flex flex-row table-container " key={i}>
                                            <div className={`text-left tracking-wider flex flex-row ${i % 2 !== 0 && 'dark:bg-chartCardHeader'} `}>
                                                <p className="p-1 w-40 text-xs truncate ...  text-left" title={indexes![i]} >{indexes![i]}</p>

                                                {years.map((year, i) => i % 5 === 0 && (
                                                    rows.find(r => r[x_key] === year) ?
                                                        <p className="text-center p-1 w-14" key={i}>{rows.find(r=>r[x_key]=== year)[y_key]}</p> :
                                                        <p className="text-center p-1 w-14" >-</p>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
