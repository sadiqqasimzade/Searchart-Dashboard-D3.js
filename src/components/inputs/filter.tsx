type Props = {
    head_title: string;
    options: string[];
    depends_on?: string | undefined;
    default_disabled?: boolean | undefined;
} & ({
    setState: (value: string[]) => void;
    multiple: true;
    state: string[];
} | {
    setState: (value: string) => void;
    state: string;
    multiple?: undefined;
});
export default function Filter({ head_title, options, setState, depends_on, default_disabled, state, multiple }: Props) {

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>): void {
        if (multiple) {
            setState(Array.from(e.target.selectedOptions, (option) => option.value))
        }
        else { setState(e.target.value) }
    }

    return (
        <div className="flex flex-col">
            <p className="font-bold">{head_title}</p>
            <select multiple={multiple} value={state} onChange={handleChange} disabled={depends_on?.length === 0} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                <option disabled={default_disabled} value=''>Choose</option>
                {options.map(value => <option key={value} value={value}>{value}</option>)}
            </select>
        </div>
    )
}