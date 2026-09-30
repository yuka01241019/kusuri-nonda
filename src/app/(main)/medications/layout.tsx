import { Footer } from "@/app/_components/Footer";
import { Header } from "../../_components/Header";

export default function MedicationsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className=" flex-1">{children}</main>
      <Footer />
    </div>
  );
}
