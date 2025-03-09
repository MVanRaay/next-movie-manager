import Navbar from '../navbar';

export default async function MovieLayout({children}: {children: React.ReactNode}) {
    return (
        <section>
            <Navbar activeCategory="movies" />
            {children}
        </section>
    )
}