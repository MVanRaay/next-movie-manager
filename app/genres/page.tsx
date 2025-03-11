import Link from "next/link";
import {Prisma, PrismaClient} from '@prisma/client';
import Navtabs from "@/components/navtabs";

const prisma = new PrismaClient();

type GenreWithMovieCount = Prisma.genreGetPayload<{
    include: {
        _count: {
            select: {movies: true},
        },
    },
}>

export default async function MoviesPage() {
    const genres: GenreWithMovieCount[] = await prisma.genre.findMany({include: {_count: {select: {movies: true}}}});

    return (
        <section>
            <Navtabs activePage="all" activeCategory="Genre" id={-1}/>
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
                {genres.map((genre: GenreWithMovieCount) => (
                    <tr key={genre.genre_id}>
                        <td>{genre.name}</td>
                        <td>{genre._count.movies}</td>
                        <td>
                            <Link className="btn btn-outline-primary" href={`/genres/${genre.genre_id}`}>Details</Link>
                            &nbsp;&nbsp;
                            <Link className="btn btn-outline-info" href={`/genres/${genre.genre_id}/edit`}>Edit</Link>
                            &nbsp;&nbsp;
                            <Link className="btn btn-outline-danger" href={`/genres/${genre.genre_id}/delete`}>Delete</Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    )
}
