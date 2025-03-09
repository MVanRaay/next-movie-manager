'use client';

import Navtabs from "@/app/navtabs";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import Link from "next/link";
import { useState } from "react";

const db = await open({
    filename: "data/database.db",
    driver: sqlite3.Database,
});

type Movie = {
    title: string;
    description: string;
    year: number;
    rating: number;
    genre_id: number;
};

type Genre = {
    genre_id: number;
    name: string;
};

export default async function AddMoviePage() {
    const [rating, setRating] = useState(5);
    const genres: Genre[] = await db.all("SELECT genre_id, name FROM genres");

    async function addMovie(formData: FormData) {
        //"use server";
    }

    return (
        <section>
            <Navtabs activePage="add" activeCategoryName="Movie" activeCategory="movies" id={-1} />
            <h1>Add a New Movie</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input className="form-control" type="text" name="title" />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input className="form-control" type="text" name="description" />
                </div>
                <div className="form-group">
                    <label htmlFor="year">Year</label>
                    <input className="form-control" type="text" name="year" />
                </div>
                <div className="form-group">
                    <label htmlFor="rating">Rating: {rating}</label>
                    <input
                        className="form-control"
                        type="range"
                        name="rating"
                        min="1"
                        max="10"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="genre">Genre</label>
                    <select className="form-control" name="genre">
                        <option value="">-- Please Select --</option>
                        {genres.map((genre: Genre) => (
                            <option key={genre.genre_id} value={genre.genre_id}>
                                {genre.name}
                            </option>
                        ))}
                    </select>
                </div>
                <input className="btn btn-primary" type="submit" value="Add Movie" />
                <Link className="btn btn-outline-danger" href="/movies">
                    Cancel
                </Link>
            </form>
        </section>
    );
}
