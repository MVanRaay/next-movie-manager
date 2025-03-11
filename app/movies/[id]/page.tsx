import Link from "next/link";
import Navtabs from "@/components/navtabs";
import {Prisma, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

type MovieWithGenre = Prisma.movieGetPayload<{
    include: {
        genre: true
    }
}>

export default async function MovieDetailPage({params}: {params: {id: string}}) {
    const movie: MovieWithGenre = await prisma.movie.findUniqueOrThrow({where: {movie_id: parseInt(params.id)}, include: {genre: true}});

    return (
        <section>
            <Navtabs activePage="details" activeCategory="Movie" id={movie.movie_id}></Navtabs>
            <h1>Movie Details</h1>
            <h4>Title</h4>
            <p>{movie.title}</p>
            <h4>Description</h4>
            <p>{movie.description}</p>
            <h4>Year</h4>
            <p>{movie.year}</p>
            <h4>Rating</h4>
            <p>{movie.rating}</p>
            <h4>Genre</h4>
            <p>{movie.genre != null ? movie.genre.name : 'No Genre'}</p>
            <Link className="btn btn-primary" href="/movies">Go Back</Link>
        </section>
    )
}