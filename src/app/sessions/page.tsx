import { PrismaClient } from "../../../generated/prisma";
import Link from "next/link";
import {revalidatePath} from "next/cache";
import Image from "next/image";
const prisma = new PrismaClient();

export default async function SessionsPage() {
    const sessions = await prisma.session.findMany({
        orderBy: { date: 'asc' }
    });

    return (
        <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-6 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold">Sessions disponibles</h1>
                    <Link href={"/ajoutsession"} className="text-xl text-gray-600 dark:text-gray-400">Nouvelles sessions</Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sessions.map((session) => (
                        <div
                            key={session.id}
                            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
                        >
                            <div className="p-6">
                                <h2 className="text-xl font-semibold">{session.title}</h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {session.instructor}
                                </p>
                                <div className="flex flex-col mt-4 space-y-2 text-sm">
                                    <p>
                                        <strong>Date :</strong> {new Date(session.date).toLocaleDateString()}
                                    </p>
                                    <p>
                                        <strong>Heure :</strong> {session.time}
                                    </p>
                                    <p>
                                        <strong>Participants :</strong> {session.participantCount}
                                    </p>
                                </div>
                                <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-xs md:text-sm flex items-center justify-center hover:shadow-xl">
                                    <Link href={"/participatesession"}>
                                        Participer
                                    </Link>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

}