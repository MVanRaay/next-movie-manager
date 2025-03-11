import Navbar from '../../components/navbar';

export default async function MovieLayout({children}: { children: React.ReactNode }) {
    return (
        <section>
            <Navbar activeCategory="movies"/>
            {children}
        </section>
    )
}