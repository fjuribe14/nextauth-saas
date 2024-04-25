import prisma from "@/lib/db";

export async function GET(request: Request, props: any) {
  // const { searchParams, search } = new URL(request.url);

  // const clients = await prisma.user.findUnique({
  //   where: {

  // } })();
  return Response.json(props);
}

export async function POST(req: Request) {
  const { email, username, password, client } = await req.json();
  const res = await prisma.user.create({
    data: { email, username, password, client: { connect: { id: client } } },
  });
  return Response.json(res);
}
