import sqlite3 from "sqlite3";
import {open} from "sqlite";
import Link from "next/link";
import {redirect} from "next/navigation";
import Navtabs from "@/app/navtabs";

const db = await open({
    filename: 'data/database.db',
    driver: sqlite3.Database,
});

export default async function EditMoviePage({params}: {params: {id: number}}) {
    const movie = await db.get(`SELECT * FROM movies WHERE movie_id = ${params.id}`);

    async function editMovie(formData: FormData) {
        'use server';
        let title = formData.get("title") as string;
        let description = formData.get("description") as string;
        let year = formData.get("year") as string;
        let genre = formData.get("genre") as string;
        let rating = formData.get("rating") as string;

        await db.run('UPDATE movies SET title = ?, description = ?, year = ?, genre = ?, rating = ? WHERE movie_id = ?', title, description, year, genre, rating, params.id);
        redirect('/movies');
    }

    return (
        <section>
            <Navtabs activePage="edit" activeCategoryName="Movie" activeCategory="movies" id={params.id}></Navtabs>
            <h1>Edit "{movie.title}" Details</h1>
            <form action={editMovie}>
                <div className="form-group col-7">
                    <label htmlFor="title">Title</label>
                    <input className="form-control" type="text" name="title" defaultValue={movie.title} />
                </div>
                <div className="form-group col-7">
                    <label htmlFor="description">Description</label>
                    <input className="form-control" type="text" name="description" defaultValue={movie.description} />
                </div>
                <div className="form-group col-7">
                    <label htmlFor="year">Year</label>
                    <input className="form-control" type="text" name="year" defaultValue={movie.year} />
                </div>
                <div className="form-group col-7">
                    <label htmlFor="genre">Genre</label>
                    <input className="form-control" type="text" name="genre" defaultValue={movie.genre} />
                </div>
                <div className="form-group col-7">
                    <label htmlFor="rating">Rating</label>
                    <input className="form-control" type="text" name="rating" defaultValue={movie.rating} />
                </div>

                <button className="btn btn-primary" type="submit">Save Changes</button>
                &nbsp;&nbsp;
                <Link className="btn btn-outline-danger" href="/movies">Cancel</Link>
            </form>
        </section>
    )
}