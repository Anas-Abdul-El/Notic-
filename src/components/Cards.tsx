
"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { Note } from "../app/page"
import { deleteNote, editNote } from "../server/server-action"
import { useState } from "react"
import { useOptimistic } from "react"

type Props = {
    res: Note[],
}

export default function AnimatedCards({ res }: Props) {

    const [optimistic, setOptimistic] = useOptimistic(res, (state, dataId) => {
        return state.filter(ele => ele.id != dataId)
    })

    const [input, setInput] = useState<string>("")
    const [edit, setEdit] = useState<number | null>()
    const [change, setChange] = useState<string>("")

    function getColorClass(color: string) {
        const colors: Record<string, string> = {
            blue: "bg-blue-500",
            green: "bg-green-500",
            yellow: "bg-yellow-500",
            violet: "bg-violet-500",
            gray: "bg-gray-500",
        }
        return colors[color]
    }

    const handleSubmit = (formData: FormData) => {
        editNote(formData)
        setEdit(null)
        setInput("")
    }

    const handleEdit = (data: Note) => {
        setEdit(data.edit)
        setInput(data.content)
    }

    const handleDelete = (id: string) => {
        setOptimistic(id)
        deleteNote(id)
        setInput("")
    }

    const data = optimistic.filter(e => e.content.includes(change.trim()))

    return (
        <>

            <div className="flex flex-col gap-15">

                <nav className='m-10 flex gap-8 h-fit transform-[translateY(-100px)] '>
                    <div className='bg-black h-12 flex items-center w-60 rounded-3xl  drop-shadow-2xl  drop-shadow-[rgba(0,0,0,0.59)]'>
                        <img
                            className='w-7 h-7 m-3 mr-1'
                            src="/image/search_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg"
                            alt="favorite" />
                        <span className='bg-white m-1 mr-2 h-7 w-[1px] text-transparent'>.</span>
                        <input
                            type="text"
                            name="search"
                            placeholder='search'
                            onChange={e => setChange(e.target.value)}
                            className='flex p-1 text-white focus-within:outline-0'
                        />
                    </div>
                </nav>

                <div className="m-10">
                    {
                        data.length === 0 ? <>
                            <div className="p-1">
                                <h1 className="stroke text-9xl text-black md:text-white md:text-[14rem] font-bold opacity-0 transform-[translateY(-150px)]">Start Now</h1>
                            </div>
                        </> : <motion.div
                            layout
                            className="flex flex-col md:flex-row flex-wrap gap-10 transition-[height] duration-500 ease-in-out opacity-0 cards"
                        >
                            <AnimatePresence initial={false}>
                                {data.map((ele) => (

                                    <motion.div
                                        key={ele.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                        className={`text-white md:w-80  w-70 h-90 rounded-3xl flex flex-col justify-between p-4 border-3 border-black ${getColorClass(ele.color)} shad `}
                                    >
                                        <form action={handleSubmit}>
                                            <div className='m-10 h-full '>
                                                <textarea
                                                    name="edit"
                                                    className='flex resize-none text-xl p-1 text-white focus-within:outline-0 placeholder:text-white w-full h-full overflow-hidden'
                                                    placeholder="Type something"
                                                    value={ele.content == "" || edit == ele.edit ? input : ele.content}
                                                    onChange={e => setInput(e.target.value)}
                                                    readOnly={ele.content != '' && edit != ele.edit}
                                                />
                                                <input type="text" name="id" value={ele.id} hidden readOnly />
                                            </div>

                                            <div className="flex justify-between items-center w-8/10 mx-auto mb-2">

                                                {
                                                    ((ele.content == "") &&
                                                        <>
                                                            <div>
                                                                <p className=" font-bold cursor-pointer w-0 hover:w-12 border-b-2 transition-all" onClick={() => handleDelete(ele.id)}>
                                                                    Cancel
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <button
                                                                    className=' cursor-pointer font-bold flex justify-center items-center p-2 rounded-xl bg-black  transition-all hover:bg-[rgba(0,0,0,0.62)] '
                                                                    type="submit" >Create</button>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                                {
                                                    ((ele.content != "" && edit !== ele.edit) &&
                                                        <>
                                                            <p className="font-bold text-[0.7rem] cursor-pointer" onClick={() => handleDelete(ele.id)}>
                                                                {`${ele.createdAt}`.slice(0, 10)}
                                                            </p>
                                                            <div>
                                                                <button
                                                                    className=' cursor-pointer font-bold flex justify-center items-center p-2 rounded-xl bg-black  transition-all hover:bg-[rgba(0,0,0,0.62)] '
                                                                    onClick={() => handleEdit(ele)}>Edit</button>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                                {
                                                    ((edit == ele.edit) &&
                                                        <>
                                                            <p className="font-bold text-[0.7rem] cursor-pointer" onClick={() => handleDelete(ele.id)}>
                                                                {`${ele.createdAt}`.slice(0, 10)}
                                                            </p>
                                                            <div>
                                                                <button
                                                                    className=' cursor-pointer font-bold flex justify-center items-center p-2 rounded-xl bg-black  transition-all hover:bg-[rgba(0,0,0,0.62)] ' type="submit">Save</button>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                            </div>
                                        </form>
                                    </motion.div>
                                )
                                )

                                }
                            </AnimatePresence>
                        </motion.div>
                    }
                </div>
            </div>
        </>
    )
}
