"use client";

function Switch() {
    return (
        <ul className="flex">
            <li>
                <input type="radio" id="centigrade" name="temperature" value="centigrade" className="hidden peer" required />
                <label htmlFor="centigrade" className="rounded-l-lg inline-flex items-center justify-between w-full p-2 bg-white border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div className="w-full">C</div>
                </label>
            </li>
            <li>
                <input type="radio" id="farenheit" name="temperature" value="farenheit" className="hidden peer" />
                <label htmlFor="farenheit" className="rounded-r-lg inline-flex items-center justify-between w-full p-2 bg-white border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div className="w-full">F</div>
                </label>
            </li>
        </ul>
    );
}

export default Switch;