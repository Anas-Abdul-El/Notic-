import { createNote } from "@/server/server-action";
import CardDisplay from "../components/cardDisplay";
import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";
import Body from "@/components/Body";

export type Note = {
  id: string,
  edit: number,
  color: string,
  content: string,
  createdAt: Date,
  updatedAt: Date,
}

export default async function Home() {

  const buttons = [
    {
      id: 0,
      color: "bg-gray-500",
      col: "gray",
      translate: "transform-[translateY(-60px)]"
    },
    {
      id: 1,
      color: "bg-blue-500",
      col: "blue",
      translate: "transform-[translateY(-120px)]"
    },
    {
      id: 2,
      color: "bg-green-500",
      col: "green",
      translate: "transform-[translateY(-180px)]"
    },
    {
      id: 3,
      color: "bg-yellow-500",
      col: "yellow",
      translate: "transform-[translateY(-240px)]"

    },
    {
      id: 4,
      color: "bg-violet-500",
      col: "violet",
      translate: "transform-[translateY(-300px)]"
    },
  ]

  const getFirstNote = async () => {
    "use server";
    const res = await prisma.note.findFirst({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return res
  }

  const firstRespone = await getFirstNote()

  const handleNote = async (data: { color: string, content: string }) => {
    "use server"

    const res = await getFirstNote()

    if (res?.content != "" || !res) {
      createNote(data)
      revalidatePath("/")
    }
  }

  return (
    <div className="flex">

      <div className="w-[20%] md:w-[8%] min-h-svh p-5 md:h-dvh h-vh border-r-2 border-[#ebdfdf] flex flex-col gap-16 items-center sidebar transform-[translateX(-150px)] ">

        <div className="w-full h-24 flex justify-center items-center">
          <p className="font-bold text-2xl">Notic</p>
        </div>
        <CardDisplay buttons={buttons} handleNote={handleNote} />
      </div >

      <Body />

    </div>
  );
}







