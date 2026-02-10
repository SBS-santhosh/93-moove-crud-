import { PrismaClient } from "../../../../generated/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const sessionId = Number(id);
    const session = await prisma.session.findUnique({
        where: { id: sessionId },
    });

    if (!session) {
        return <div>Session introuvable</div>;
    }

    async function updateSession(formData: FormData) {
        "use server";

        const title = formData.get("title") as string;
        const instructor = formData.get("instructor") as string;
        const date = formData.get("date") as string;
        const time = formData.get("time") as string;
        const description = formData.get("description") as string;
        const participantCount = Number(formData.get("participantCount")) || 0;

        await prisma.session.update({
            where: { id: sessionId },
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
        revalidatePath("/modifsession");
        redirect("/modifsession");
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
            <form action={updateSession} className="w-full max-w-lg space-y-4 p-6 bg-white rounded shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Modifier la session</h2>

                <div>
                    <label htmlFor="title" className="block font-medium text-gray-700">Titre</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        defaultValue={session.title}
                        required
                        className="border p-2 rounded w-full mt-1"
                    />
                </div>

                <div>
                    <label htmlFor="instructor" className="block font-medium text-gray-700">Instructeur</label>
                    <input
                        type="text"
                        id="instructor"
                        name="instructor"
                        defaultValue={session.instructor}
                        required
                        className="border p-2 rounded w-full mt-1"
                    />
                </div>

                <div>
                    <label htmlFor="date" className="block font-medium text-gray-700">Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        defaultValue={session.date.toISOString().split('T')[0]}
                        required
                        className="border p-2 rounded w-full mt-1"
                    />
                </div>

                <div>
                    <label htmlFor="time" className="block font-medium text-gray-700">Heure</label>
                    <input
                        type="time"
                        id="time"
                        name="time"
                        defaultValue={session.time}
                        required
                        className="border p-2 rounded w-full mt-1"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        defaultValue={session.description}
                        className="border p-2 rounded w-full mt-1"
                    />
                </div>

                <div>
                    <label htmlFor="participantCount" className="block font-medium text-gray-700">Nombre de participants</label>
                    <input
                        type="number"
                        id="participantCount"
                        name="participantCount"
                        min="0"
                        defaultValue={session.participantCount}
                        className="border p-2 rounded w-full mt-1"
                    />
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-bold"
                    >
                        Mettre à jour
                    </button>
                    <a href="/modifsession" className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 font-bold">
                        Annuler
                    </a>
                </div>
            </form>
        </div>
    );
}
