"use client";

import { useRouteGuard } from "@/app/_hooks/useRouteGuard";
import MedicationList from "./_components/MedicationList";

const MedicationPage: React.FC = () => {
  useRouteGuard();
  return (
    <div>
      <MedicationList />
    </div>
  );
};

export default MedicationPage;
