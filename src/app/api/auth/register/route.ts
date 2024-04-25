import prisma from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { email, username, password, password_confirmation, client } = await req.json();

    if (password !== password_confirmation) {
      return Response.json({ error: "Passwords do not match" }, { status: 400 });
    }

    const clientFound = await prisma.client.findFirst({ where: { id: client } });

    if (!clientFound) {
      return Response.json({ error: "Client not found" }, { status: 404 });
    }

    const emailFound = await prisma.user.findFirst({ where: { email, client_id: client } });

    if (emailFound) {
      return Response.json({ error: "Email already exists" }, { status: 409 });
    }

    const usernameFound = await prisma.user.findFirst({ where: { username, client_id: client } });

    if (usernameFound) {
      return Response.json({ error: "Username already exists" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    return prisma.user
      .create({
        data: { email, username, password: passwordHash, client: { connect: { id: client } } },
      })
      .then(() => Response.json({ message: "User created" }))
      .catch((error) => Response.json(error, { status: 500 }));
  } catch (error) {
    Response.json(error, { status: 500 });
  }
}
