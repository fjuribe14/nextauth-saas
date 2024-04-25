import { Search } from "./search";
import { MainNav } from "./main-nav";
import { UserNav } from "./user-nav";
import { ModeToggle } from "../mode-toggle";
import Link from "next/link";
import Image from "next/image";

export default function TopMenu() {
  return (
    <div className="sticky top-0 z-40 hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center gap-4 px-4">
          <Link
            href="/"
            className="flex flex-shrink-0 items-center gap-2 text-lg font-bold whitespace-nowrap">
            <Image className="h-8 w-8" src="/logo-sm.png" alt="logo" width={50} height={50} />
            NextAuth SaaS
          </Link>
          <MainNav />
          <div className="w-full flex items-center gap-4">
            <div className="ms-auto"></div>
            <Search />
            <div className="me-auto"></div>
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </div>
    </div>
  );
}
