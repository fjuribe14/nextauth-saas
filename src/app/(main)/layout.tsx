import TopMenu from "@/components/top-menu/top-menu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopMenu />
      {children}
    </>
  );
}
