import sqlite3 from "sqlite3";
import {open} from "sqlite";
import Link from "next/link";
import Navtabs from "@/app/navtabs";

const db = await open({
    filename: 'data/database.db',
    driver: sqlite3.Database,
});

export default async function MovieDetailPage({params}: {params: {id: number}}) {

    const movie = await db.get(`SELECT * FROM movies WHERE movie_id=${params.id}`);


    return (
        <section>
            <Navtabs activePage="details" activeCategoryName="Movie" activeCategory="movies" id={params.id}></Navtabs>
            <h1>{movie.title}</h1>
            <h3>{movie.year}</h3>
            <h6>{movie.genre}</h6>
            <h6>⭐{movie.rating}</h6>
            <p>{movie.description}</p>


        </section>
    )
}