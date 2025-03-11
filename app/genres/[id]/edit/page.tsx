import {Prisma, PrismaClient} from "@prisma/client";
import Navtabs from "@/components/navtabs";
import {redirect} from "next/navigation";
import Link from "next/link";

const prisma = new PrismaClient();

type Genre = Prisma.genreGetPayload<{}>

export default async function EditGenrePage({params}: {params: {id: string}}) {
    const {id} = await params;
    const genre: Genre = await prisma.genre.findUniqueOrThrow({where: {genre_id: parseInt(id)}});

    async function updateGenre(formData: FormData) {
        'use server';

        await prisma.genre.update({
            where: {genre_id: genre.genre_id},
            data: {
                name: formData.get('name') as string,
            }
        })

        redirect("/genres");
    }

    return (
        <section>
            <Navtabs activePage="edit" activeCategory="Genre" id={genre.genre_id}/>
            <h1>Add a New Genre</h1>
            <form className='col-7' action={updateGenre}>
                <div className="form-group">
                    <label htmlFor="name">Genre Name</label>
                    <input className="form-control" type="text" name="name" defaultValue={genre.name != null ? genre.name : ''}/>
                </div>
                <input className="btn btn-primary" type="submit" value="Save Changes" />
                &nbsp;&nbsp;
                <Link href="/genres" className='btn btn-outline-danger'>Cancel</Link>
            </form>
        </section>
    )
}