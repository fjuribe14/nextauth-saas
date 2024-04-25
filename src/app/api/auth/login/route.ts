import prisma from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { client, email, password } = await req.json();

  const clientFound = await prisma.client.findFirst({ where: { id: client } });

  if (!clientFound) {
    return Response.json({ error: "Client not found" }, { status: 404 });
  }

  const userFound = await prisma.user.findFirst({
    where: {
      email,
      client: { id: clientFound.id },
    },
  });

  if (!userFound) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const passwordMatch = bcrypt.compare(password, userFound.password);

  if (!passwordMatch) {
    return Response.json({ error: "Password incorrect" }, { status: 401 });
  }

  return Response.json({ message: "User logged in" });
}
