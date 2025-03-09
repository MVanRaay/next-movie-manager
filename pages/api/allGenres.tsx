import type {NextApiRequest, NextApiResponse} from "next";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

type responseData = {
    message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const db = await open({
        filename: "data/database.db",
        driver: sqlite3.Database,
    });
    const genres = await db.all("SELECT g.genre_id, name, amount FROM genres g JOIN vw_genre_count c ON g.genre_id = c.genre_id");
    res.status(200).json(genres);
}