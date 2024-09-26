import React from "react"

const navbar = () => {
    return (
        <nav className='flex justify-between bg-violet-100 py-2 px-5'>
            <div className="logo">
                <span className="font-bold text-xl mx-9">
                    iTask
                </span>
            </div>
            <div className="flex items-center gap-2">
                <p className="mb-0">Light</p>
                <div className="flex rounded bg-gray-200 w-[30px] h-[15px]">
                    <button className="bg-primary w-[15px] h-[15px] rounded-full"></button>
                </div>
                <p className="mb-0">Dark</p>
            </div>
        </nav>
    )
}

export default navbar