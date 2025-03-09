import Link from "next/link";
import {useState, useEffect} from "react";

type Genre = {
    genre_id: number;
    name: string;
    amount: number;
}

export default async function MoviesPage() {
    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
        async function fetchGenres() {
            const response = await fetch("/api/genres");
            const data = await response.json();
            setGenres(data);
        }
        fetchGenres();
    }, []);

    return (
        <section>
            <h1>All Genres</h1>
            <table className="table table-bordered">
                <thead className="thead-light">
                <tr key={0}>
                    <th scope="col">Name</th>
                    <th scope="col">Amount of Movies</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {genres.map((genre: Genre) => (
                    <tr key={genre.genre_id}>
                        <td>{genre.name}</td>
                        <td>{genre.amount}</td>
                        <td>
                            <Link className="btn btn-outline-danger" href={`/genres/${genre.genre_id}/delete`}>Delete</Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    )
}
