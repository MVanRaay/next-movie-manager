import Navtabs from "@/app/navtabs";
import Link from "next/link";
import {Prisma, PrismaClient} from "@prisma/client";
import {redirect} from "next/navigation";

const prisma = new PrismaClient();

type Genre = Prisma.genreGetPayload<{
    include: {
        movies: false,
    }
}>

export default async function AddMoviePage() {
    const genres: Genre[] = await prisma.genre.findMany({include: {movies: false}});

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
            <Navtabs activePage="add" activeCategoryName="Movie" activeCategory="movies" id={-1}/>
            <h1>Add a New Movie</h1>
            <form className="col-7" action={addMovie}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input className="form-control" type="text" name="title"/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input className="form-control" type="text" name="description"/>
                </div>
                <div className="form-group">
                    <label htmlFor="year">Year</label>
                    <input className="form-control" type="text" name="year"/>
                </div>
                <div className="form-group">
                    <label htmlFor="rating">Rating</label>
                    <select className="form-control" name="rating">
                        <option key={1} value="1">1</option>
                        <option key={2} value="2">2</option>
                        <option key={3} value="3">3</option>
                        <option key={4} value="4">4</option>
                        <option key={5} value="5">5</option>
                        <option key={6} value="6">6</option>
                        <option key={7} value="7">7</option>
                        <option key={8} value="8">8</option>
                        <option key={9} value="9">9</option>
                        <option key={10} value="10">10</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="genre">Genre</label>
                    <select className="form-control" name="genre">
                        <option key={-1} value="">-- Please Select --</option>
                        {genres.map((genre: Genre) => (
                            <option key={genre.genre_id} value={genre.genre_id}>
                                {genre.name}
                            </option>
                        ))}
                    </select>
                </div>
                <input className="btn btn-primary" type="submit" value="Add Movie"/>
                <Link className="btn btn-outline-danger" href="/movies">
                    Cancel
                </Link>
            </form>
        </section>
    );
}
