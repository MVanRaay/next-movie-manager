import Link from "next/link";
import {redirect} from "next/navigation";
import Navtabs from "@/components/navtabs";
import {Prisma, PrismaClient} from "@prisma/client";
import MovieForm from "@/app/movies/movieForm";

const prisma = new PrismaClient();

type MovieWithGenre = Prisma.movieGetPayload<{
    include: {
        genre: true
    }
}>

type Genre = Prisma.genreGetPayload<{}>

export default async function EditMoviePage({params}: {params: {id: string}}) {
    const {id} = await params;
    const movie: MovieWithGenre = await prisma.movie.findUniqueOrThrow({where: {movie_id: parseInt(id)}, include: {genre: true}});
    const genres: Genre[] = await prisma.genre.findMany();

    async function updateMovie(formData: FormData) {
        'use server';

        await prisma.movie.update({
            where: {
                movie_id: movie.movie_id
            },
            data: {
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                year: parseInt(formData.get('year') as string),
                rating: parseFloat(formData.get('rating') as string),
                genre_id: parseInt(formData.get('genre') as string),
            }
        })

        redirect('/movies');
    }

    return (
        <section>
            <Navtabs activePage="edit" activeCategory="Movie" id={movie.movie_id}></Navtabs>
            <h1>Edit Movie</h1>
            <form action={updateMovie}>
                <MovieForm movie={movie} genres={genres} />
                <button className="btn btn-primary" type="submit">Save Changes</button>
                &nbsp;&nbsp;
                <Link className="btn btn-outline-danger" href="/movies">Cancel</Link>
            </form>
        </section>
    )
}