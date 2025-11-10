import { prisma } from "@/../lib/prisma"

export async function GET() {
    try {
        const data = await prisma.note.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })

        return Response.json(data)
    } catch (error) {

        console.error(error);
        return Response.json(error)
    }
}