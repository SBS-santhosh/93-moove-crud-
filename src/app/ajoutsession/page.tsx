import { PrismaClient } from "../../../generated/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function Page() {


    async function ajouterSession(formData: FormData) {
        "use server";

        const title = formData.get("title") as string;
        const instructor = formData.get("instructor") as string;
        const date = formData.get("date") as string;
        const time = formData.get("time") as string;
        const description = formData.get("description") as string;
        const participantCount = Number(formData.get("participantCount")) || 0;

        await prisma.session.create({
            data: {
                title,
                instructor,
                date: new Date(date),
                time,
                description,
                participantCount,
            },
        });

        revalidatePath("/sessions");
        redirect("/sessions");
    }
    return (
        <form action={ajouterSession} className="space-y-4 p-6 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Créer une nouvelle session</h2>

            <div>
                <label htmlFor="title" className="block font-medium">Titre</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    className="border p-2 rounded w-full"
                />
            </div>

            <div>
                <label htmlFor="instructor" className="block font-medium">Instructeur</label>
                <input
                    type="text"
                    id="instructor"
                    name="instructor"
                    required
                    className="border p-2 rounded w-full"
                />
            </div>

            <div>
                <label htmlFor="date" className="block font-medium">Date</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    className="border p-2 rounded w-full"
                />
            </div>

            <div>
                <label htmlFor="time" className="block font-medium">Heure</label>
                <input
                    type="time"
                    id="time"
                    name="time"
                    required
                    className="border p-2 rounded w-full"
                />
            </div>

            <div>
                <label htmlFor="description" className="block font-medium">Description</label>
                <textarea
                    id="description"
                    name="description"
                    className="border p-2 rounded w-full"
                />
            </div>

            <div>
                <label htmlFor="participantCount" className="block font-medium">Nombre de participants</label>
                <input
                    type="number"
                    id="participantCount"
                    name="participantCount"
                    min="0"
                    defaultValue="0"
                    className="border p-2 rounded w-full"
                />
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Enregistrer la session
            </button>
        </form>
    );
}
