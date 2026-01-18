import { PrismaClient } from "../../../generated/prisma";
import Image from "next/image"

const prisma = new PrismaClient();


export default async function Page() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className="w-64 bg-white shadow-md">
                <div className="p-6 font-bold text-purple-700 text-2xl">AdminPanel</div>
                <nav className="mt-8">
                    <a href="#" className="block py-3 px-6 text-gray-700 hover:bg-purple-100">Liste utilisateurs</a>
                    <a href="#" className="block py-3 px-6 text-gray-700 hover:bg-purple-100">Liste salle</a>
                    <a href="#" className="block py-3 px-6 text-gray-700 hover:bg-purple-100">Liste activités</a>
                </nav>
            </aside>

            <div className="flex-1 flex flex-col">
                <main className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className="text-sm text-gray-500">Nombre sessions utilisateurs ouverte</p>
                            <h2 className="text-3xl font-bold text-purple-700 mt-2">1,240</h2>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className="text-sm text-gray-500">Nombre activité ouvert</p>
                            <h2 className="text-3xl font-bold text-green-600 mt-2">$24,500</h2>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className="text-sm text-gray-500">Erreur rencontré</p>
                            <h2 className="text-3xl font-bold text-red-500 mt-2">12</h2>
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
                                <th className="p-4">Statue</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="border-t">
                                <td className="p-4">John Doe</td>
                                <td className="p-4">john@example.com</td>
                                <td className="p-4">Administrateur</td>
                                <td className="p-4 text-green-600 font-bold">En ligne</td>
                            </tr>
                            <tr className="border-t">
                                <td className="p-4">Jane Smith</td>
                                <td className="p-4">jane@example.com</td>
                                <td className="p-4">Instructeur</td>
                                <td className="p-4 text-red-500 font-bold">Déconnecter</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
}