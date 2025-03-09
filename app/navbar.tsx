import Link from "next/link";

export default function Navbar({activeCategory}: { activeCategory: string }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" href="/">Home</Link>
            <ul className="navbar-nav mr-auto">
                <li className="nav-item" key="movies">
                    <Link className={`nav-link ${activeCategory == 'movies' ? 'active' : ''}`} href="/movies">Movies</Link>
                </li>
                <li className="nav=item" key="genres">
                    <Link className={`nav-link ${activeCategory == 'genres' ? 'active' : ''}`} href="/genres">Genres</Link>
                </li>
            </ul>
        </nav>
    )
}