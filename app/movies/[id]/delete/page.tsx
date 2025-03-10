import Navtabs from "@/app/navtabs";
import {Prisma, PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

type Movie = Prisma.movieGetPayload<{
    include: {
        genre: true
    }
}>

export default async function DeleteMoviePage({params}: {params: {id: string}}) {
    const movie: Movie = await prisma.movie.findUniqueOrThrow({where: {movie_id: parseInt(params.id)}, include: {genre: true}});

    async function deleteMovie() {
        //TODO
    }

    return (
        <section>
            <Navtabs activePage="delete" activeCategoryName="Movie" activeCategory="movies" id={movie.movie_id} />
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

            <form action={deleteMovie}>

            </form>
        </section>
    )
}