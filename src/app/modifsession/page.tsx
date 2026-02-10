import { PrismaClient } from "../../../generated/prisma";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function Page() {
    const users = await prisma.user.findMany();
    const sessions = await prisma.session.findMany({
        orderBy: { date: 'asc' }
    });

    async function deleteUser(formData: FormData) {
        "use server";
        const userId = Number(formData.get("userId"));
        await prisma.user.delete({
            where: { id: userId }
        });
        revalidatePath("/modifsession");
    }

    async function deleteSession(formData: FormData) {
        "use server";
        const sessionId = Number(formData.get("sessionId"));
        await prisma.session.delete({
            where: { id: sessionId }
        });
        revalidatePath("/modifsession");
        revalidatePath("/sessions");
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className="w-64 bg-white shadow-md">
                <div className="p-6 font-bold text-purple-700 text-2xl">AdminPanel</div>
                <nav className="mt-8">
                    <a href="#" className="block py-3 px-6 text-gray-700 hover:bg-purple-100">Liste utilisateurs</a>
                    <a href="#sessions" className="block py-3 px-6 text-gray-700 hover:bg-purple-100">Liste sessions</a>
                    <Link href="/ajoutsession" className="block py-3 px-6 text-gray-700 hover:bg-purple-100">Ajouter session</Link>
                </nav>
            </aside>

            <div className="flex-1 flex flex-col overflow-y-auto h-screen">
                <main className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className="text-sm text-gray-500">Nombre utilisateurs</p>
                            <h2 className="text-3xl font-bold text-purple-700 mt-2">{users.length}</h2>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className="text-sm text-gray-500">Nombre sessions</p>
                            <h2 className="text-3xl font-bold text-green-600 mt-2">{sessions.length}</h2>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md">
                        <div className="p-4 border-b font-bold text-purple-700">Liste utilisateurs</div>
                        <table className="w-full text-left">
                            <thead className="bg-purple-50">
                                <tr>
                                    <th className="p-4">Nom</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Rôle</th>
                                    <th className="p-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="border-t">
                                        <td className="p-4">{user.Nom} {user.Prenom}</td>
                                        <td className="p-4">{user.Email}</td>
                                        <td className="p-4">{user.TypeProfil}</td>
                                        <td className="p-4">
                                            <form action={deleteUser}>
                                                <input type="hidden" name="userId" value={user.id} />
                                                <button type="submit" className="text-red-500 hover:text-red-700 font-bold">
                                                    Supprimer
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div id="sessions" className="bg-white rounded-lg shadow-md mt-6">
                        <div className="p-4 border-b font-bold text-green-700">Liste sessions</div>
                        <table className="w-full text-left">
                            <thead className="bg-green-50">
                                <tr>
                                    <th className="p-4">Titre</th>
                                    <th className="p-4">Instructeur</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Heure</th>
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sessions.map((session) => (
                                    <tr key={session.id} className="border-t">
                                        <td className="p-4">{session.title}</td>
                                        <td className="p-4">{session.instructor}</td>
                                        <td className="p-4">{new Date(session.date).toLocaleDateString()}</td>
                                        <td className="p-4">{session.time}</td>
                                        <td className="p-4 flex space-x-2">
                                            <Link href={`/modifsession/${session.id}`} className="text-blue-500 hover:text-blue-700 font-bold">
                                                Modifier
                                            </Link>
                                            <form action={deleteSession}>
                                                <input type="hidden" name="sessionId" value={session.id} />
                                                <button type="submit" className="text-red-500 hover:text-red-700 font-bold">
                                                    Supprimer
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
}