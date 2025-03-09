import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// you would have to import / invoke this in another file
export async function openDb () {
    return open({
        filename: '/tmp/database.db',
        driver: sqlite3.Database
    })
}

export default async function AddGenrePage() {
    async function addGenre() {

    }

    return (
        <section>
            <h1>Add a New Genre</h1>
            <form className='col-7'>
                <div className="form-group">
                    <label htmlFor="name">Genre Name</label>
                    <input className="form-control" type="text" name="name"/>
                </div>
            </form>
        </section>
    )
}