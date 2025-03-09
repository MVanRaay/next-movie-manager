import {ReactNode} from "react";
import Navbar from "@/app/navbar";

export default async function GenresLayout({children}: {children: ReactNode}) {

    return (
        <section>
            <Navbar activeCategory="genres" />
            {children}
        </section>
    )
}