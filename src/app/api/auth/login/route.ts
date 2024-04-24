import prisma from "@/lib/db";

export async function POST(req: Request) {
  const { client, email, password } = await req.json();

  const clientExist = await prisma.client.findFirst({ where: { id: client } });

  if (!clientExist) {
    return Response.json({ error: "Client not found" }, { status: 404 });
  }

  const userExist = await prisma.user.findFirst({
    where: {
      email,
      password,
      client: { id: clientExist.id },
    },
  });

  if (!userExist) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  return Response.json(userExist);
}
