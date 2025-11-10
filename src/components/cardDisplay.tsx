'use client';

import { useState } from "react";

type Buttons = {
    id: number,
    color: string,
    col: string,
    translate: string
}

function cardDisplay({ buttons, handleNote }: {
    buttons: Buttons[],
    handleNote: (data: {
        color: string;
        content: string;
    }) => void
}) {

    const [isClicked, setClicked] = useState(false)

    const handleClick = () => {
        setClicked(prev => !prev)
    }

    const handleSubmit = async ({ color }: { color: string }) => {
        handleNote({ content: "", color })
    }

    return (
        <div className="flex flex-col items-center gap-10">

            <div onClick={handleClick} className={`bg-black w-14 h-14 flex justify-center items-center rounded-full cursor-pointer ${isClicked && "animate-spin"} shad`}>
                <img
                    className="w-7 h-7"
                    src="/image/add_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg"
                    alt='image'
                />
            </div>
            <div className="flex flex-col gap-10">
                {
                    buttons.map(ele => {
                        return <div
                            inert={!isClicked}
                            key={ele.color}
                            className={` w-4 h-4 cursor-pointer opacity-0 rounded-full  ${isClicked && `color${ele.id + 1}`} ${ele.translate} ${ele.color} `}
                            onClick={() => handleSubmit({ color: ele.col })}
                        >
                        </div>
                    })
                }
            </div>

        </div>
    )
}

export default cardDisplay



