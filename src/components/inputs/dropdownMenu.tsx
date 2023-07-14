import { useState } from "react"

type Props = {
    head_title: string;
    options: string[];
    setState: (value: string[]) => void;
    state: string[];
}
export default function DropdownMenu({ head_title, options, setState, state }: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
        <div className="flex flex-col">
            <p className="font-bold">{head_title}</p>
            <div>
                <button onClick={() => setIsOpen(!isOpen)} className="w-full text-white bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-700 dark:focus:ring-blue-800" type="button">
                    {state.length > 0 ? state.join(', ').length > 40 ? state.join(', ').slice(0, 40) + '...' : state.join(', ') : 'Choose'}
                    <svg className="w-2.5 h-2.5 ml-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>
                <div className="relative">
                    <div className={`absolute left-0 right-0 top-0 z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 mt-1 ${isOpen ? 'block' : 'hidden'}`}>
                        <ul className="max-h-96 overflow-y-scroll p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200">
                            {options.map(value => <li key={value}>
                                <div className="flex items-center">
                                    <input type="checkbox" value={value} checked={state.includes(value)} onChange={e => setState(state.includes(e.currentTarget.value) ? state.filter(value => value !== e.currentTarget.value) : [...state, e.currentTarget.value])} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 w-full">{value}</label>
                                </div>
                            </li>)}
                            <button onClick={() => setState([])} className="absolute -bottom-5 bg-purple-500 rounded left-0 w-full">Reset</button>
                        </ul>
                    </div>
                </div>

            </div>
        </div >
    )
} 