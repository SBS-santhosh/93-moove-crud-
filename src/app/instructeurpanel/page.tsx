import { PrismaClient } from "../../../generated/prisma";
import Link from "next/link";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export default async function InstructeurPanelPage() {
    const sessions = await prisma.session.findMany({
        orderBy: { date: 'asc' }
    });

    const invitations = sessions.filter(s => s.pendingInstructor && s.invitationStatus === "PENDING");

    async function acceptInvitation(formData: FormData) {
        "use server";
        const sessionId = Number(formData.get("sessionId"));
        const session = await prisma.session.findUnique({ where: { id: sessionId } });
        if (!session) return;

        await prisma.session.update({
            where: { id: sessionId },
            data: {
                instructor: session.pendingInstructor,
                pendingInstructor: null,
                invitationStatus: "ACCEPTED"
            }
        });
        revalidatePath("/instructeurpanel");
        revalidatePath("/sessions");
        revalidatePath("/modifsession");
    }

    async function refuseInvitation(formData: FormData) {
        "use server";
        const sessionId = Number(formData.get("sessionId"));
        await prisma.session.update({
            where: { id: sessionId },
            data: {
                invitationStatus: "REJECTED"
            }
        });
        revalidatePath("/instructeurpanel");
        revalidatePath("/modifsession");
    }

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Barre latérale simple */}
            <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
                <div className="p-6 font-bold text-blue-600 text-2xl">Espace Instructeur</div>
                <nav className="mt-8">
                    <a href="#" className="block py-3 px-6 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900">
                        Sessions Disponibles
                    </a>
                </nav>
            </aside>

            <main className="flex-1 p-8">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Gestion des Missions</h1>
                    <div className="text-sm text-gray-500 bg-blue-100 px-3 py-1 rounded-full">
                        Rôle : Instructeur
                    </div>
                </header>

                {invitations.length > 0 && (
                    <section className="mb-10 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl overflow-hidden shadow-sm">
                        <div className="p-4 bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-200 font-bold flex items-center">
                            <span className="mr-2">📨</span> Invitations reçues de l'Admin
                        </div>
                        <div className="p-4 grid gap-4">
                            {invitations.map(inv => (
                                <div key={inv.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-orange-200 flex justify-between items-center">
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white">{inv.title}</h3>
                                        <p className="text-sm text-gray-500">{new Date(inv.date).toLocaleDateString()} à {inv.time}</p>
                                        <p className="text-xs mt-1 text-blue-600 font-medium italic">Assignation proposée à : {inv.pendingInstructor}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <form action={acceptInvitation}>
                                            <input type="hidden" name="sessionId" value={inv.id} />
                                            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition">
                                                Accepter
                                            </button>
                                        </form>
                                        <form action={refuseInvitation}>
                                            <input type="hidden" name="sessionId" value={inv.id} />
                                            <button type="submit" className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-bold transition">
                                                Refuser
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="p-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                        <span className="font-bold text-blue-700 dark:text-blue-400">Toutes les sessions</span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-xs">
                                <tr>
                                    <th className="p-4">Titre</th>
                                    <th className="p-4">Statut / Instructeur</th>
                                    <th className="p-4">Date & Heure</th>
                                    <th className="p-4 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {sessions.map((session) => (
                                    <tr key={session.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                                        <td className="p-4 font-medium text-gray-900 dark:text-white">{session.title}</td>
                                        <td className="p-4">
                                            {session.instructor ? (
                                                <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700 font-bold">
                                                    ✅ {session.instructor}
                                                </span>
                                            ) : session.invitationStatus === "REJECTED" ? (
                                                <span className="px-2 py-1 rounded text-xs bg-red-100 text-red-700 font-bold">
                                                    ❌ Refusée
                                                </span>
                                            ) : (
                                                <span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-700 font-bold italic">
                                                    {session.pendingInstructor ? `📨 Invité : ${session.pendingInstructor}` : "Disponible"}
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                                            {new Date(session.date).toLocaleDateString()} à {session.time}
                                        </td>
                                        <td className="p-4 text-center">
                                            <Link
                                                href={`/instructeurpanel/commit/${session.id}`}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition shadow-sm"
                                            >
                                                S'engager / Modifier
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-sm">
                    <strong>Nouveauté :</strong> Vous pouvez désormais recevoir des invitations directes de l'administrateur. Acceptez-les pour confirmer votre présence sur une session.
                </div>
            </main>
        </div>
    );
}
