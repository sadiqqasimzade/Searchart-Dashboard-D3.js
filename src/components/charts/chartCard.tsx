import { PropsWithChildren } from "react";
type Props = {
    title: string;
    text_color:string
}
export default function ChartCard({ children, title,text_color }: PropsWithChildren<Props>) {
    return (
        <div className="bg-lightChartHead dark:bg-chartCardHeader h-[200px] rounded-lg flex flex-col shadow-sm shadow-slate-500 max-w-[450px] ">
            <p className={`ml-3 my-1 text-md font-bold  ${text_color}`}>{title}</p>
            <div className="bg-white dark:bg-chartCardInner h-full rounded-b-lg px-4 overflow-auto">
                <div className="pt-2">
                    {children}
                </div>
            </div>
        </div>)
}