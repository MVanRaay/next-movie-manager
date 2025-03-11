import {Prisma, PrismaClient} from "@prisma/client";
import Navtabs from "@/components/navtabs";
import {redirect} from "next/navigation";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function AddGenrePage() {
    async function addGenre(formData: FormData) {
        'use server';
        let genre: Prisma.genreCreateInput;

        genre = {
            name: formData.get('name') as string,
        };

        await prisma.genre.create({data: genre});
        redirect("/genres");
    }

    return (
        <section>
            <Navtabs activePage="add" activeCategory="Genre" id={-1}/>
            <h1>Add a New Genre</h1>
            <form className='col-7' action={addGenre}>
                <div className="form-group">
                    <label htmlFor="name">Genre Name</label>
                    <input className="form-control" type="text" name="name"/>
                </div>
                <input className="btn btn-primary" type="submit" value="Add Genre" />
                &nbsp;&nbsp;
                <Link href={"/genres"} className="btn btn-outline-danger">Cancel</Link>
            </form>
        </section>
    )
}