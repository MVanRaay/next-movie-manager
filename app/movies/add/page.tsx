import Navtabs from "@/components/navtabs";
import Link from "next/link";
import {Prisma, PrismaClient} from "@prisma/client";
import {redirect} from "next/navigation";
import MovieForm from "../movieForm";

const prisma = new PrismaClient();

type Movie = Prisma.movieGetPayload<{
    include: {
        genre: true
    }
}>

type Genre = Prisma.genreGetPayload<{
    include: {
        movies: false,
    }
}>

export default async function AddMoviePage() {
    const genres: Genre[] = await prisma.genre.findMany({include: {movies: false}});
    const defaultMovie: Movie = {movie_id: -1, title: "", description: "", year: null, rating: null, genre_id: null, genre: null}

    async function addMovie(formData: FormData) {
        'use server';
        let movie: Prisma.movieCreateInput;

        movie = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            year: parseInt(formData.get('year') as string),
            rating: parseInt(formData.get('rating') as string),
            genre: {connect: {genre_id: parseInt(formData.get('genre') as string)}},
        };

        await prisma.movie.create({data: movie});
        redirect("/movies");
    }

    return (
        <section>
            <Navtabs activePage="add" activeCategory="Movie" id={-1}/>
            <h1>Add a New Movie</h1>
            <form className="col-7" action={addMovie}>
                <MovieForm movie={defaultMovie} genres={genres} />
                <input className="btn btn-primary" type="submit" value="Add Movie"/>
                <Link className="btn btn-outline-danger" href="/movies">
                    Cancel
                </Link>
            </form>
        </section>
    );
}
