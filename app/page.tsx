import Link from "next/link";

export default async function Home() {
    return (
        <section>
            <h1>Hello, world!</h1>
            <Link href={'/movies'}>All Movies</Link>
            <Link href={'/genres'}>All Genres</Link>
        </section>
    )
}