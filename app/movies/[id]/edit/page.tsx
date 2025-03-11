import Link from "next/link";
import {redirect} from "next/navigation";
import Navtabs from "@/components/navtabs";
import {Prisma, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

type MovieWithGenre = Prisma.movieGetPayload<{
    include: {
        genre: true
    }
}>

type Genre = Prisma.genreGetPayload<{}>

export default async function EditMoviePage({params}: {params: {id: string}}) {
    const movie: MovieWithGenre = await prisma.movie.findUniqueOrThrow({where: {movie_id: parseInt(params.id)}, include: {genre: true}});
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
                rating: parseInt(formData.get('rating') as string),
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
                <div className="form-group col-7">
                    <label htmlFor="title">Title</label>
                    <input className="form-control" type="text" name="title" defaultValue={movie.title!} />
                </div>
                <div className="form-group col-7">
                    <label htmlFor="description">Description</label>
                    <input className="form-control" type="text" name="description" defaultValue={movie.description!} />
                </div>
                <div className="form-group col-7">
                    <label htmlFor="year">Year</label>
                    <input className="form-control" type="text" name="year" defaultValue={movie.year!} />
                </div>
                <div className="form-group col-7">
                    <label htmlFor="genre">Genre</label>
                    <select className="form-control" defaultValue={movie.genre!.genre_id!} name="genre">
                        {genres.map((genre: Genre) => (
                            <option key={genre.genre_id} value={genre.genre_id}>{genre.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group col-7">
                    <label htmlFor="rating">Rating</label>
                    <select className="form-control" defaultValue={movie.rating!} name="rating">
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

                <button className="btn btn-primary" type="submit">Save Changes</button>
                &nbsp;&nbsp;
                <Link className="btn btn-outline-danger" href="/movies">Cancel</Link>
            </form>
        </section>
    )
}