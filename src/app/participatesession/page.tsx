import { PrismaClient } from "../../../generated/prisma";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import Image from "next/image";
const prisma = new PrismaClient();

export default async function SessionsPage() {
    const sessions = await prisma.session.findMany({
        orderBy: { date: 'asc' }
    });

    async function handleDelete(sessionId: number) {
        "use server";
        await prisma.session.delete({
            where: { id: sessionId }
        });
        revalidatePath("/sessions");
    }
    return (
        <div>
            {sessions.map((session) => (
                <div
                    key={session.id}
                    className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
                >
                    <div className="bg-gray-100">
                        <div className="container mx-auto px-4 py-8">
                            <div className="flex flex-wrap -mx-4">
                                <div className="w-full lg:w-2/3 px-4 mb-8 lg:mb-0">
                                    <img className="w-full rounded-lg shadow-lg"
                                        src="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b"
                                        alt="Concert Image" />
                                </div>
                                <div className="w-full lg:w-1/3 px-4">
                                    <h1 className="text-4xl font-bold mb-4">{session.title}</h1>
                                    <p className="text-lg mb-6">{session.description}</p>
                                    <div className="mb-6">
                                        <p className="text-xl font-bold mb-2">{new Date(session.date).toLocaleDateString()}</p>
                                        <p className="text-lg">{session.time}</p>
                                    </div>
                                    <div className="mb-6">
                                        <p className="text-xl font-bold mb-2">Where:</p>
                                        <p className="text-lg">The Fillmore Auditorium</p>
                                        <p className="text-lg">1805 Geary Blvd, San Francisco, CA</p>
                                    </div>
                                    <div className="mb-6">
                                        <p className="text-xl font-bold mb-2">Tickets:</p>
                                        <p className="text-lg">$35 - General Admission</p>
                                        <p className="text-lg">$75 - VIP</p>
                                    </div>
                                    <button
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="button">
                                        Buy Tickets
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
