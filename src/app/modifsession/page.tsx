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

    const pendingUsers = users.filter(u => !u.isValidated);
    const validatedInstructors = users.filter(u => u.isValidated && u.TypeProfil === "Instructeur");

    async function approveUser(formData: FormData) {
        "use server";
        const userId = Number(formData.get("userId"));
        await prisma.user.update({
            where: { id: userId },
            data: { isValidated: true }
        });
        revalidatePath("/modifsession");
    }

    async function inviteInstructor(formData: FormData) {
        "use server";
        const sessionId = Number(formData.get("sessionId"));
        const instructorName = formData.get("instructorName") as string;
        await prisma.session.update({
            where: { id: sessionId },
            data: {
                pendingInstructor: instructorName,
                invitationStatus: "PENDING"
            }
        });
        revalidatePath("/modifsession");
    }

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
                        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                            <p className="text-sm text-gray-500">Nombre utilisateurs</p>
                            <h2 className="text-3xl font-bold text-purple-700 mt-2">{users.length}</h2>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                            <p className="text-sm text-gray-500">Nombre sessions</p>
                            <h2 className="text-3xl font-bold text-green-600 mt-2">{sessions.length}</h2>
                        </div>
                        {pendingUsers.length > 0 && (
                            <div className="bg-orange-50 p-6 rounded-lg shadow-md border-l-4 border-orange-500">
                                <p className="text-sm text-orange-600 font-bold uppercase">En attente de validation</p>
                                <h2 className="text-3xl font-bold text-orange-700 mt-2">{pendingUsers.length}</h2>
                            </div>
                        )}
                    </div>

                    {pendingUsers.length > 0 && (
                        <div className="bg-white rounded-lg shadow-md border border-orange-200">
                            <div className="p-4 border-b bg-orange-50 text-orange-800 font-bold">
                                🛡️ Approbation des nouveaux comptes (Instructeurs)
                            </div>
                            <table className="w-full text-left">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="p-4">Nom</th>
                                        <th className="p-4">Email</th>
                                        <th className="p-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingUsers.map((user) => (
                                        <tr key={user.id} className="border-t">
                                            <td className="p-4">{user.Nom} {user.Prenom}</td>
                                            <td className="p-4">{user.Email}</td>
                                            <td className="p-4">
                                                <form action={approveUser}>
                                                    <input type="hidden" name="userId" value={user.id} />
                                                    <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded text-sm font-bold hover:bg-green-700 transition">
                                                        Approuver
                                                    </button>
                                                </form>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <div className="bg-white rounded-lg shadow-md">
                        <div className="p-4 border-b flex justify-between items-center">
                            <span className="font-bold text-purple-700">Liste utilisateurs</span>
                            <Link href="/ajoututilisateur" className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition">
                                + Ajouter Utilisateur
                            </Link>
                        </div>
                        <table className="w-full text-left">
                            <thead className="bg-purple-50">
                                <tr>
                                    <th className="p-4">Nom</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Rôle</th>
                                    <th className="p-4 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.filter(u => u.isValidated).map((user) => (
                                    <tr key={user.id} className="border-t">
                                        <td className="p-4">{user.Nom} {user.Prenom}</td>
                                        <td className="p-4">{user.Email}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${user.TypeProfil === 'Administrateur' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                                                {user.TypeProfil}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center">
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
                        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                            <span className="font-bold text-green-700">Liste sessions & Invitations</span>
                            <Link href="/ajoutsession" className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition">
                                + Ajouter Session
                            </Link>
                        </div>
                        <table className="w-full text-left">
                            <thead className="bg-green-50">
                                <tr>
                                    <th className="p-4">Titre</th>
                                    <th className="p-4">Instructeur Actuel / Invité</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sessions.map((session) => (
                                    <tr key={session.id} className="border-t">
                                        <td className="p-4">
                                            <div className="font-bold">{session.title}</div>
                                            <div className="text-xs text-gray-400">{session.time}</div>
                                        </td>
                                        <td className="p-4">
                                            {session.instructor ? (
                                                <span className="text-green-600 font-medium">✅ {session.instructor}</span>
                                            ) : session.pendingInstructor ? (
                                                <div className="flex flex-col">
                                                    <span className="text-orange-600 text-sm italic font-medium">📨 Invité: {session.pendingInstructor}</span>
                                                    <span className="text-[10px] uppercase font-bold text-orange-400 tracking-tighter">Attente réponse</span>
                                                </div>
                                            ) : (
                                                <form action={inviteInstructor} className="flex space-x-2">
                                                    <input type="hidden" name="sessionId" value={session.id} />
                                                    <select name="instructorName" required className="text-xs border rounded p-1">
                                                        <option value="">Inviter un prof...</option>
                                                        {validatedInstructors.map(inst => (
                                                            <option key={inst.id} value={`${inst.Nom} ${inst.Prenom}`}>{inst.Nom} {inst.Prenom}</option>
                                                        ))}
                                                    </select>
                                                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                                                        Inviter
                                                    </button>
                                                </form>
                                            )}
                                        </td>
                                        <td className="p-4 text-sm">{new Date(session.date).toLocaleDateString()}</td>
                                        <td className="p-4 text-center flex items-center justify-center space-x-4">
                                            <Link href={`/modifsession/${session.id}`} className="text-blue-500 hover:text-blue-700 font-bold text-sm">
                                                Modifier
                                            </Link>
                                            <form action={deleteSession}>
                                                <input type="hidden" name="sessionId" value={session.id} />
                                                <button type="submit" className="text-red-500 hover:text-red-700 font-bold text-sm">
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