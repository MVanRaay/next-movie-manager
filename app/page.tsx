import Navbar from "@/components/navbar";

export default async function Home() {
    return (
        <section>
            <Navbar activeCategory="none" />
            <h1>Movie Manager</h1>
        </section>
    )
}