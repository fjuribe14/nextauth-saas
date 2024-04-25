import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Home() {
  return (
    <main className="flex min-h-screen">
      <div className="m-auto text-4xl font-semibold">Hello✌️</div>
    </main>
  );
}
