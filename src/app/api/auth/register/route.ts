import prisma from "@/lib/db";

export async function POST(req: Request) {
  const { email, username, password, client } = await req.json();

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

  return prisma.user
    .create({
      data: { email, username, password, client: { connect: { id: client } } },
    })
    .then(() => Response.json({ message: "User created" }))
    .catch((error) => Response.json(error, { status: 500 }));
}
