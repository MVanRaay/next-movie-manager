import Link from "next/link";
import sqlite3 from "sqlite3";
import {open} from "sqlite";
import Navtabs from "@/app/navtabs";

const db = await open({
    filename: 'data/database.db',
    driver: sqlite3.Database,
});

type Movie = {
    movie_id: number;
    title: string;
    description: string;
    year: number;
    rating: number;
    genre: string;
}

export default async function MoviesPage() {
    const movies: Movie[] = await db.all('SELECT movie_id, title, description, year, rating, name AS genre FROM movies m JOIN genres g ON m.genre_id = g.genre_id');

    return (
        <section>
            <Navtabs activePage="all" activeCategoryName="Movie" activeCategory="movies" id={-1}></Navtabs>
            <h1>All Movies</h1>
            <table className="table table-bordered">
                <thead className="thead-light">
                <tr key="thead">
                    <th>Title</th>
                    <th>Description</th>
                    <th>Year</th>
                    <th>Genre</th>
                    <th>Rating</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {movies.map((movie: Movie) => (
                    <tr key={movie.movie_id}>
                        <td>{movie.title}</td>
                        <td>{movie.description}</td>
                        <td>{movie.year}</td>
                        <td>{movie.genre}</td>
                        <td>{movie.rating}</td>
                        <td>
                            <Link className="btn btn-outline-primary" href={`/movies/${movie.movie_id}`}>Details</Link>
                            &nbsp;&nbsp;
                            <Link className="btn btn-outline-info" href={`/movies/${movie.movie_id}/edit`}>Edit</Link>
                            &nbsp;&nbsp;
                            <Link className="btn btn-outline-danger" href={`/movies/${movie.movie_id}/delete`}>Delete</Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    )
}