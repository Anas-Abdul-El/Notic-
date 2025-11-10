"use server";
import { prisma } from "@/../lib/prisma"
import { revalidatePath } from "next/cache";



export async function createNote({ content, color }: { content: string, color: string }) {
    try {
        await prisma.note.create({
            data: {
                content,
                color
            }
        })
    } catch (error) {
        console.log(error);
        return error
    }
}

export async function editNote(formData: FormData) {

    const content = formData.get("edit") as string;
    const id = formData.get("id") as string;

    await prisma.note.update({
        where: {
            id,
        },
        data: {
            content,
        }
    })
    revalidatePath("/")
}


export async function deleteNote(id: string) {


    try {
        await prisma.note.delete({
            where: {
                id,
            }
        })
        revalidatePath("/")
    } catch (error) {
        console.log(error);
        return error
    }
}