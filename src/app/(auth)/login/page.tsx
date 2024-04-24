import LoginForm from "./components/login-form";

async function getData() {
  const res = await fetch(`${process.env.LOCAL_API_URL}/client`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function page() {
  const clients = await getData();

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 items-center">
      <div className="lg:col-span-6 h-full bg-neutral-950"></div>
      <div className="lg:col-span-6 flex items-center justify-center">
        <LoginForm clients={clients} />
      </div>
    </div>
  );
}
