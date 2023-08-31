import { PropsWithChildren } from "react";
type Props = {
    title: string;
    text_color:string
}
export default function ChartCard({ children, title,text_color }: PropsWithChildren<Props>) {
    return (
        <div className="bg-lightChartHead dark:bg-chartCardHeader  rounded-lg flex flex-col shadow-sm shadow-slate-500 h-[200px] w-full ">
            <p className={`ml-3 my-1 text-md font-bold ${text_color}`}>{title}</p>
            <div className="bg-white dark:bg-chartCardInner h-full w-full rounded-b-lg px-4">
                <div className="pt-2">
                    {children}
                </div>
            </div>
        </div>)
}