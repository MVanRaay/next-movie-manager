'use client';

import {Prisma} from "@prisma/client";
import {useState} from "react";

type Movie = Prisma.movieGetPayload<{
    include: {
        genre: true
    }
}>

type Genre = Prisma.genreGetPayload<{}>

export default function MovieForm({movie, genres}: {movie: Movie, genres: Genre[]}) {
    const [rating, setRating] = useState(movie.rating != null ? movie.rating : 5);

    return (
        <section>
            <div className="form-group col-7">
                <label htmlFor="title">Title</label>
                <input className="form-control" type="text" name="title" defaultValue={movie.title != null ? movie.title : ""} />
            </div>
            <div className="form-group col-7">
                <label htmlFor="description">Description</label>
                <input className="form-control" type="text" name="description" defaultValue={movie.description != null ? movie.description : ""} />
            </div>
            <div className="form-group col-7">
                <label htmlFor="year">Year</label>
                <input className="form-control" type="text" name="year" defaultValue={movie.year != null ? movie.year : ""} />
            </div>
            <div className="form-group col-7">
                <label htmlFor="genre">Genre</label>
                <select className="form-control" defaultValue={movie.genre != null ? movie.genre.genre_id : ""} name="genre">
                    {movie.genre != null ? "" : <option value="" disabled>-- Select One --</option>}
                    {genres.map((genre: Genre) => (
                        <option key={genre.genre_id} value={genre.genre_id}>{genre.name}</option>
                    ))}
                </select>
            </div>
            <div className="form-group col-7">
                <label htmlFor="rating">Rating: <span>{rating}</span></label>
                <input type="range" className="form-control" name="rating" id="rating" defaultValue={movie.rating != null ? movie.rating : 5} max={10} step={0.5} onChange={(e)  => setRating(parseFloat(e.target.value))} />
            </div>
        </section>
    )
}