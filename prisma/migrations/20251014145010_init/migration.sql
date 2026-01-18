-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Nom" TEXT NOT NULL,
    "Prenom" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "TypeProfil" TEXT NOT NULL,
    "MotdePasse" TEXT NOT NULL,
    "Age" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Instructeur" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Nom" TEXT NOT NULL,
    "Prenom" TEXT NOT NULL,
    "Email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "instructor" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "time" TEXT NOT NULL,
    "participantCount" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
