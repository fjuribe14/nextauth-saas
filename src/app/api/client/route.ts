import prisma from "@/lib/db";

export async function GET() {
  const clients = await prisma.client.findMany();
  return Response.json(clients);
}

export async function POST(req: Request) {
  const { name, description } = await req.json();
  return prisma.client
    .create({ data: { name, description } })
    .then(() => Response.json({ message: "Client created" }))
    .catch((error) => Response.json(error, { status: 500 }));
}
