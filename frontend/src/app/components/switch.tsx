"use client";

function Switch() {
    return (
        <ul className="flex">
            <li>
                <input type="radio" id="hosting-small" name="hosting" value="hosting-small" className="hidden peer" required />
                <label htmlFor="hosting-small" className="inline-flex items-center justify-between w-full p-2 bg-white border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div className="w-full text-lg font-semibold">C</div>
                </label>
            </li>
            <li>
                <input type="radio" id="hosting-big" name="hosting" value="hosting-big" className="hidden peer" />
                <label htmlFor="hosting-big" className="inline-flex items-center justify-between w-full p-2 bg-white border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div className="w-full text-lg font-semibold">F</div>
                </label>
            </li>
        </ul>
    );
}

export default Switch;