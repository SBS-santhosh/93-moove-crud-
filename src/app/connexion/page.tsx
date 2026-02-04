import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PrismaClient } from "../../../generated/prisma";
const prisma = new PrismaClient();
import Link from "next/link";

export default async function Page() {
    async function handleLogin(formData: FormData) {
        "use server";
        const identifier = formData.get("identifier") as string;
        const password = formData.get("password") as string;

        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { Email: identifier },
                    { Nom: identifier }
                ],
                MotdePasse: password
            }
        });

        if (user) {
            if (user.TypeProfil === "Administrateur") {
                redirect("/modifsession");
            } else {
                redirect("/sessions");
            }
        } else {
            // Simple failure redirection for now
            redirect("/connexion?error=invalid_credentials");
        }
    }

    return (
        <>
            <head>
                <title>Connexion</title>
            </head>
            <div className="p-10">
                <h1 className="mb-8 font-extrabold text-4xl">Se Connecter</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <form action={handleLogin}>
                        <div>
                            <label className="block font-semibold" htmlFor="identifier">Email ou Nom</label>
                            <input
                                className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1"
                                id="identifier" type="text" name="identifier" required autoFocus />
                        </div>

                        <div className="mt-4">
                            <label className="block font-semibold" htmlFor="password">Mot de Passe</label>
                            <input
                                className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1"
                                id="password" type="password" name="password" required
                                autoComplete="current-password" />
                        </div>

                        <div className="flex items-center justify-between mt-8">
                            <button type="submit"
                                className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                                Se connecter
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