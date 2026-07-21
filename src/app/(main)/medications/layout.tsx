import { Footer } from "@/app/_components/Footer";
import { Header } from "../../_components/Header";

export default function MedicationsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
