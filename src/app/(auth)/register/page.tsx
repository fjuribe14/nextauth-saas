import RegisterForm from "./components/register-form";

async function getData() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/client`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return data;
}

export default async function page() {
  const clients = await getData();

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 items-center">
      <div className="lg:col-span-6 h-full bg-neutral-950"></div>
      <div className="lg:col-span-6 flex items-center justify-center">
        <RegisterForm clients={clients} />
      </div>
    </div>
  );
}
