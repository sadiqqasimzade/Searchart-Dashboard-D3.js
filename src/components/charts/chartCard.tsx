import { PropsWithChildren } from "react";
type Props = {
    title: string;
}
export default function ChartCard({ children, title }: PropsWithChildren<Props>) {
    return (
        <div className="bg-gray-200 min-h-[200px] rounded-lg flex flex-col shadow-lg ">
            <p className="text-red-600 ml-3 my-1 text-lg font-bold h-14">{title}</p>
            <div className="bg-white h-full rounded-b-lg px-4 py-2 max-h-[250px] overflow-auto">
                <div className="pt-2">
                    {children}
                </div>
            </div>
        </div>)
}