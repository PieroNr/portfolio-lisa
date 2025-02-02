/*
import axios from "axios";
import Image from "next/image";

type Projet = {
    id: number;
    title: string;
    preview: any;

};

export default async function Home() {
    const urlApi = process.env.NEXT_PUBLIC_API_URL;
    const res = await axios.get(`${urlApi}/api/projets?populate=*`);
    const projets: Projet[] = res.data.data;
    return (
        <div>
            <h1 className="text-4xl font-bold">Mon Portfolio</h1>
            {projets.map((projet) => (

                <div key={projet.id}>
                    <h2 className="text-2xl">{projet.title}</h2>
                    <Image src={urlApi + projet.preview.url} alt={projet.title} priority={true} width={projet.preview.width/2} height={projet.preview.height/2} />
                </div>
            ))}
        </div>
    );
}
*/

import Road3D from "@/components/Road3D";

export default function Home() {
    return (
        <div style={{ height: "300vh" }}> {/* Page longue pour scroller */}
            <h1 className="text-4xl text-center">Portfolio en 3D</h1>
            <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh" }}>
                <Road3D />
            </div>
        </div>
    );
}
