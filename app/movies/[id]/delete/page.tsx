import {open} from "sqlite";
import sqlite3 from "sqlite3";
import Navtabs from "@/app/navtabs";

const db = await open({
    filename: 'data/database.db',
    driver: sqlite3.Database,
});

export default async function DeleteMoviePage({params}: {params: {id: number}}) {
    const movie = await db.get(`SELECT * FROM movies WHERE movie_id = ${params.id}`);

    return (
        <section>
            <Navtabs activePage="delete" activeCategoryName="Movie" activeCategory="movies" id={params.id}></Navtabs>
        </section>
    )
}