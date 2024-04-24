// import Image from "next/image";
import Link from "next/link";

export default function RootNotFound() {
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center">
      {/* <Image src="/404.svg" alt="logo" width={200} height={200} /> */}
      <p>404 - Not Found</p>
      <div>
        <Link href="/"> {"<-"} Go back to Home</Link>
      </div>
    </div>
  );
}
