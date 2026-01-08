import { Header } from "../../_components/Header";

export default function MedicationsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main className="pt-[80px]">{children}</main>
    </>
  );
}
