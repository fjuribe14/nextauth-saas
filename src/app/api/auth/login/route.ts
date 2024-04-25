import prisma from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { client, email, password } = await req.json();

  const clientFound = await prisma.client.findFirst({ where: { id: client } });

  if (!clientFound) {
    return Response.json({ error: "Client not found" }, { status: 404 });
  }

  const userExist = await prisma.user.findFirst({
    where: {
      email,
      client: { id: clientFound.id },
    },
  });

  if (!userExist) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const passwordMatch = bcrypt.compare(passwordHash, userExist.password);

  if (!passwordMatch) {
    return Response.json({ error: "Password incorrect" }, { status: 401 });
  }

  return Response.json({ message: "User logged in" });
}
