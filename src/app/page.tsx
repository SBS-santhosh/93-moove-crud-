"use client";

import Link from "next/link";

export default function Home() {
    return (
        <>
            <title>
                Accueil
            </title>
            <header className="bg-gradient-to-r from-gray-700 via-gray-700 to-gray-700">
                <div className="container mx-auto py-20 px-4 sm:px-18 lg:px-8">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
                        Bienvenue au Projet <span className="text-pink-300">9</span><span
                        className="text-purple-300">3</span>
                        <span className="text-blue-300">Moove</span>
                    </h1>
                    <p className="text-lg sm:text-xl lg:text-2xl font-medium text-white leading-tight mb-8">
                        Association d&apos;activités sportives, manuelles et culturelles.
                    </p>
                    <Link
                        className="inline-block bg-white text-pink-500 hover:text-pink-600 font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition duration-200"
                        href={"/inscription"}>
                        S&apos;inscrire
                    </Link>
                </div>
            </header>
            <div
                className="container relative flex flex-col justify-between h-full max-w-6xl px-10 mx-auto xl:px-0 mt-5">
                <h2 className="mb-1 text-3xl font-extrabold leading-tight text-gray-900">Actualités</h2>
                <p className="mb-12 text-lg text-gray-500">Etre à jour sur les nouveautés de l&apos;association 93Moove
                    !</p>
                <div className="w-full">
                    <div className="flex flex-col w-full mb-10 sm:flex-row">
                        <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
                            <div className="relative h-full ml-0 mr-0 sm:mr-10">
                              <span
                                  className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-500 rounded-lg"></span>
                                <div className="relative h-full p-5 bg-white border-2 border-indigo-500 rounded-lg">
                                    <div className="flex items-center -mt-1">
                                        <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">1</h3>
                                    </div>
                                    <p className="mt-3 mb-1 text-xs font-medium text-indigo-500 uppercase">------------</p>
                                    <p className="mb-2 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing
                                        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip
                                        ex ea commodo consequat.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2">
                            <div className="relative h-full ml-0 md:mr-10">
                              <span
                                  className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-purple-500 rounded-lg"></span>
                                <div className="relative h-full p-5 bg-white border-2 border-purple-500 rounded-lg">
                                    <div className="flex items-center -mt-1">
                                        <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">2</h3>
                                    </div>
                                    <p className="mt-3 mb-1 text-xs font-medium text-purple-500 uppercase">------------</p>
                                    <p className="mb-2 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing
                                        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip
                                        ex ea commodo consequat.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full mb-5 sm:flex-row">
                        <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
                            <div className="relative h-full ml-0 mr-0 sm:mr-10">
                              <span
                                  className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-blue-400 rounded-lg"></span>
                                <div className="relative h-full p-5 bg-white border-2 border-blue-400 rounded-lg">
                                    <div className="flex items-center -mt-1">
                                        <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">3</h3>
                                    </div>
                                    <p className="mt-3 mb-1 text-xs font-medium text-blue-400 uppercase">------------</p>
                                    <p className="mb-2 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing
                                        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip
                                        ex ea commodo consequat.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
                            <div className="relative h-full ml-0 mr-0 sm:mr-10">
                              <span
                                  className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-yellow-400 rounded-lg"></span>
                                <div className="relative h-full p-5 bg-white border-2 border-yellow-400 rounded-lg">
                                    <div className="flex items-center -mt-1">
                                        <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">4</h3>
                                    </div>
                                    <p className="mt-3 mb-1 text-xs font-medium text-yellow-400 uppercase">------------</p>
                                    <p className="mb-2 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing
                                        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip
                                        ex ea commodo consequat.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2">
                            <div className="relative h-full ml-0 md:mr-10">
                              <span
                                  className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-green-500 rounded-lg"></span>
                                <div className="relative h-full p-5 bg-white border-2 border-green-500 rounded-lg">
                                    <div className="flex items-center -mt-1">
                                        <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">5</h3>
                                    </div>
                                    <p className="mt-3 mb-1 text-xs font-medium text-green-500 uppercase">------------</p>
                                    <p className="mb-2 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing
                                        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip
                                        ex ea commodo consequat.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}