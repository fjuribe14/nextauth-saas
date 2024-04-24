import prisma from "@/lib/db";

export async function POST(req: Request) {
  const { client, email, password } = await req.json();

  //   console.log({ client, email, password });

  const clientExist = await prisma.client.findFirstOrThrow({
    where: {
      id: client,
    },
  });

  //   console.log({ clientExist });

  if (!clientExist) {
    return Response.json({ error: "Client not found" });
  }

  const userExist = await prisma.user.findFirstOrThrow({
    where: {
      email,
      password,
      client: {
        id: clientExist.id,
      },
    },
  });

  //   console.log({ userExist });

  if (!userExist) {
    return Response.json({ error: "User not found" });
  }

  return Response.json(userExist);
}
