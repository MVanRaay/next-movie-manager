import Navtabs from "@/components/navtabs";
import {Prisma, PrismaClient} from '@prisma/client';
import {redirect} from "next/navigation";
import Link from "next/link";

const prisma = new PrismaClient();

type Movie = Prisma.movieGetPayload<{
    include: {
        genre: true
    }
}>

export default async function DeleteMoviePage({params}: {params: {id: string}}) {
    const {id} = await params;
    const movie: Movie = await prisma.movie.findUniqueOrThrow({where: {movie_id: parseInt(id)}, include: {genre: true}});

    async function deleteMovie() {
        'use server';

        await prisma.movie.delete({where: {movie_id: movie.movie_id}});

        redirect("/movies");
    }

    return (
        <section>
            <Navtabs activePage="delete" activeCategory="Movie" id={movie.movie_id} />
            <h1>Delete Movie</h1>
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

            <form action={deleteMovie}>
                <input className="btn btn-danger" type="submit" value="Delete" />
                &nbsp;&nbsp;
                <Link className="btn btn-outline-primary" href="/movies">Cancel</Link>
            </form>
        </section>
    )
}