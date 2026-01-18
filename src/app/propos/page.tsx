import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import { PrismaClient } from "../../../generated/prisma";
const prisma = new PrismaClient();
import Link from "next/link";

export default async function Page() {

    return (
        <h1>Propos</h1>
    );
}