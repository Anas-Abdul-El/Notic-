import AnimatedCards from './Cards'
import type { Note } from '@/app/page'

async function Body() {

    const url = process.env.API_URL || "http://localhost:3000"
    const res = await fetch(`${url}/notes`, { cache: "no-store" })
    const data: Note[] = await res.json()

    return (
        <AnimatedCards res={data} />
    )
}

export default Body