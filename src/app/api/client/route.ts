import prisma from "@/lib/db";

export async function GET() {
  const clients = await prisma.client.findMany();
  return Response.json(clients);
}

export async function POST(req: Request) {
  const { name, description } = await req.json();
  const result = await prisma.client.create({ data: { name, description } });
  return Response.json(result);
}
