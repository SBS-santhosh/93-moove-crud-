import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import { PrismaClient } from "../../../generated/prisma";
const prisma = new PrismaClient();
import Link from "next/link";

export default async function Page() {
//Récupère les données du formulaire
    async function ajouteruser(formData: FormData) {
//indique qu'on est dans une Server Function
        "use server";
        const nom = formData.get("nom") as string;
        const prenom = formData.get("prenom") as string;
        const email = formData.get( "email") as string;
        const TypeProfile = formData.get("typeprofil") as string;
        const password = formData.get("password") as string;
        const Age = Number(formData.get("age") as string);
// Création du user
        await prisma.user.create({
            data: {
                Nom: nom,
                Prenom: prenom,
                Email: email,
                TypeProfil: TypeProfile,
                MotdePasse: password,
                Age: Age,
            },
        });

//On redirige vers la page de user en regénérant le cache
        revalidatePath("/user");
        redirect("/user");
    }

    return (
        <>
            <head>
                <title>
                    Connexion
                </title>
            </head>
            <div className="p-10">
                <h1 className="mb-8 font-extrabold text-4xl">Se Connecter</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    <form>
                        <div>
                            <label className="block font-semibold" htmlFor="Nom">Nom</label>
                            <input
                                className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1"
                                id="nom" type="text" name="name" required autoFocus/>
                        </div>

                        <div className="mt-4">
                            <label className="block font-semibold" htmlFor="MotdePass">Mot de Passe</label>
                            <input
                                className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1"
                                id="password" type="password" name="password" required
                                autoComplete="new-password"/>
                        </div>

                        <div className="flex items-center justify-between mt-8">
                            <button type="submit"
                                    className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                                Enregistrer
                            </button>
                            <a className="font-semibold">
                                Pas de compte?
                                <Link className="text-indigo-600 ml-1" href={"/inscription"}>S&apos;identifier</Link>
                            </a>

                        </div>
                    </form>

                    <aside className="">
                        <div className="bg-gray-100 p-8 rounded">
                            <h2 className="font-bold text-2xl">Bienvenue!</h2>
                            <ul className="list-disc mt-4 list-inside">
                                <li>Connectez-vous pour acceder a votre compte.</li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </>
    );
}