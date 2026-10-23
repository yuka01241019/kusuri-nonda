import { PetSwitcherHeader } from "@/app/_components/PetSwitcherHeader";

export default function PetDetailLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-1 flex-col">
      <PetSwitcherHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
}
