import { Header } from "@/app/_components/Header";

export default function DefaultLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
}
