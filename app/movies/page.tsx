import Link from "next/link";
import Navtabs from "@/components/navtabs";
import {PrismaClient, Prisma} from "@prisma/client";

const prisma = new PrismaClient();

type MovieWithGenre = Prisma.movieGetPayload<{
    include: {
        genre: true,
    }
}>

export default async function MoviesPage() {
    const moviesWithGenre: MovieWithGenre[] = await prisma.movie.findMany({include: {genre: true}});

    return (
        <section>
            <Navtabs activePage="all" activeCategory="Movie" id={-1}></Navtabs>
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

                {moviesWithGenre.map((movie: MovieWithGenre) => (
                    <tr key={movie.movie_id}>
                        <td>{movie.title}</td>
                        <td>{movie.description}</td>
                        <td>{movie.year}</td>
                        <td>{movie.genre != null ? movie.genre!.name : "No Genre"}</td>
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