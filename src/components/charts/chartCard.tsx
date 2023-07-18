import { title } from "process";
import { PropsWithChildren } from "react";
type Props = {
    title: string;
}
export default function ChartCard({ children,title }: PropsWithChildren<Props>) {
    return (
        <div className="bg-gray-200 min-h-[200px] rounded-lg m-4 shadow-lg">
            <p className="text-red-600 ml-3 my-1 text-lg font-bold">{title}</p>
            <div className="bg-white h-full rounded-b-lg p-4">
                {children}
            </div>
        </div>)
}