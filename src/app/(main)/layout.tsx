import { Footer } from "@/app/_components/Footer";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-dvh flex-col">
      {children}
      <Footer />
    </div>
  );
}
