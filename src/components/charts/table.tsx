
type Props = {
    x_title: string,
    y_title: string,
    data: any[][]
    x_key: string,
    y_key: string,
    indexes?: string[] | undefined
}
export default function Table({ data, x_key, x_title, y_key, y_title, indexes }: Props) {
    return (
        <>
            <h2 className="text-lg text-center">{x_title}</h2>
            <p className="absolute -rotate-90 -left-3 top-20 text-sm">{y_title}</p>
            <div className="w-full h-full px-6">
                <div className="py-1 overflow-x-scroll h-32 mb-3">
                    <div className="text-sm ">
                        <div className="flex flex-col">
                            {data.map((col,i) =>
                                <div className="uppercase flex flex-row table-container">
                                    {col.map((d, i) =>
                                        i % 5 === 0 &&
                                        <div className="text-left tracking-wider flex flex-col" key={i}>
                                            <p className="text-center dark:bg-chartCardHeader bg-lightChartHead p-2">{d[x_key]}</p>
                                            <p className="text-center p-1 ">{d[y_key]}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}