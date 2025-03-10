import {redirect} from "next/navigation";
import {Prisma, PrismaClient} from '@prisma/client';
import Navtabs from "@/app/navtabs";
import Link from "next/link";

const prisma = new PrismaClient();

type Genre = Prisma.genreGetPayload<{}>

export default async function DeleteGenrePage({params}: {params: {id: string}}) {
    const genre: Genre = await prisma.genre.findUniqueOrThrow({where: {genre_id: parseInt(params.id)}});

    async function deleteGenre(formData: FormData) {
        'use server';

        redirect("/genres");
    }

    return (
        <section>
            <Navtabs activePage="delete" activeCategoryName="Genre" activeCategory="genres" id={genre.genre_id}/>
            <h1>Delete Genre</h1>
            <h4>Name</h4>
            <p>{genre.name}</p>
            <form action={deleteGenre}>
                <input type="submit" className="btn btn-danger" value="Delete Genre" />
                &nbsp;&nbsp;
                <Link href={"/genres"} className="btn btn-outline-primary">Cancel</Link>
            </form>
        </section>
    )
}