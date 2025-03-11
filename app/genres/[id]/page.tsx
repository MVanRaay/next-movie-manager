import Navtabs from "@/components/navtabs";
import {Prisma, PrismaClient} from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

type Genre = Prisma.genreGetPayload<{}>

export default async function GenreDetailsPage({params}: {params: {id: string}}) {
    const {id} = await params;
    const genre: Genre = await prisma.genre.findUniqueOrThrow({where: {genre_id: parseInt(id)}});

    return (
        <section>
            <Navtabs activePage="details" activeCategory="Genre" id={genre.genre_id}/>
            <h1>Genre Details</h1>
            <h4>Name</h4>
            <p>{genre.name}</p>
            <Link href={"/genres"} className="btn btn-primary">Go Back</Link>
        </section>
    )
}