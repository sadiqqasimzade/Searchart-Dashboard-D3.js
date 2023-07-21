/* eslint-disable react/jsx-no-useless-fragment */
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

type Props = {
    head_title: string;
    options: string[] | undefined;
    depends_on?: string | null;
    default_disabled?: boolean;
} & ({
    setState?: (value: ActionCreatorWithPayload<string[]>) => void;
    state?: string[] | null;
    multiple: true;
} | {
    setState?: (value: ActionCreatorWithPayload<string>) => void;
    state?: string | null;
    multiple?: undefined;
});
export default function Filter({ head_title, options, setState, depends_on, default_disabled, state, multiple }: Props) {
    const dispatch = useDispatch()
    function handleChange(e: React.ChangeEvent<HTMLSelectElement>): void {
        if (multiple) {
            dispatch(setState(Array.from(e.target.selectedOptions, (option) => option.value)))
        }
        else { dispatch(setState(e.target.value)) }
    }
    return (
        <div className="flex flex-col ">
            <p className="font-bold">{head_title}</p>
            <select multiple={multiple} value={state ? state : ''} onChange={handleChange} disabled={depends_on?.length === 0 || depends_on === null} className="shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" >
                <option disabled={default_disabled} value=''>Choose</option>
                {options ? options.map(value => <option key={value} value={value}>{value}</option>) : <></>}
            </select>
        </div>
    )
}