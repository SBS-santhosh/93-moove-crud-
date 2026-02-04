import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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
        const email = formData.get("email") as string;
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
                    Inscription
                </title>
            </head>
            <div className="h-full fondanous">
                <div className="mx-auto">
                    <div className="flex justify-center px-6 py-12">
                        <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                            <div className="w-full lg:w-7/12 bg-white dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
                                <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">
                                    Créez un compte</h3>
                                <form action={ajouteruser} className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded">
                                    <div className="mb-4 md:flex md:justify-between">
                                        <div className="mb-4 md:mr-2 md:mb-0">
                                            <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                                                htmlFor="firstName">
                                                Prénom
                                            </label>
                                            <input
                                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                id="firstName"
                                                name="prenom"
                                                type="text"
                                                placeholder="Prénom"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4 md:mr-2 md:mb-0">
                                            <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="age">
                                                Age
                                            </label>
                                            <input
                                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                id="age"
                                                name="age"
                                                type="number"
                                                placeholder="0"
                                                required
                                            />
                                        </div>
                                        <div className="md:ml-2">
                                            <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                                                htmlFor="lastName">
                                                Nom de Famille
                                            </label>
                                            <input
                                                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                id="lastName"
                                                name="nom"
                                                type="text"
                                                placeholder="Nom de Famille"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                                            htmlFor="email">
                                            Email
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="Email"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4 md:flex md:justify-between">
                                        <div className="mb-4 md:mr-2 md:mb-0">
                                            <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                                                htmlFor="password">
                                                Mot de Passe
                                            </label>
                                            <input
                                                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                id="password"
                                                name="password"
                                                type="password"
                                                placeholder="******************"
                                                required
                                            />
                                        </div>
                                        <div className="md:ml-2">
                                            <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                                                htmlFor="typeprofil">
                                                Type de compte
                                            </label>
                                            <select
                                                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                id="typeprofil"
                                                name="typeprofil"
                                                required
                                            >
                                                <option value="Utilisateur">Utilisateur</option>
                                                <option value="Instructeur">Instructeur</option>
                                                <option value="Administrateur">Administrateur</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-6 text-center">
                                        <button
                                            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                                            type="submit">
                                            S&apos;inscrire
                                        </button>
                                    </div>
                                    <hr className="mb-6 border-t" />
                                    <div className="text-center">
                                        <a className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                                            href="#">
                                            Mot de Passe oublié?
                                        </a>
                                    </div>
                                    <div className="text-center">
                                        <a className="inline-block text-sm">
                                            Compte déja crée?
                                        </a>
                                        <Link className="inline-block text-sm ml-1 text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800" href="connexion">
                                            Connectez-vous!
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}