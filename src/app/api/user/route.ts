import prisma from "@/lib/db";

export async function GET(req: Request) {
  const users = await prisma.user.findMany();
  return Response.json(users);
}

export async function POST(req: Request) {
  const { email, username, password, client } = await req.json();
  const res = await prisma.user.create({
    data: { email, username, password, client: { connect: { id: client } } },
  });
  return Response.json(res);
}
