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
                    <Image src={urlApi + projet.preview.url} width={800} height={400} alt={projet.title} priority={true} />
                </div>
            ))}
        </div>
    );
}
