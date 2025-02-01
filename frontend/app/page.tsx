import axios from "axios";

type Projet = {
    id: number;
    title: string;
    preview: any;

};

export default async function Home() {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/projets?populate=*`);
    const projets: Projet[] = res.data.data;
    return (
        <div>
            <h1 className="text-4xl font-bold">Mon Portfolio</h1>
            {projets.map((projet) => (
                <div key={projet.id}>
                    <h2 className="text-2xl">{projet.title}</h2>
                    <img src={`${process.env.NEXT_PUBLIC_API_URL}${projet.preview.url}`} alt={projet.title} />
                </div>
            ))}
        </div>
    );
}
