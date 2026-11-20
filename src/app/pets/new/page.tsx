"use client";

import { PetForm } from "../_components/PetForm";
import { useRouteGuard } from "@/app/_hooks/useRouteGuard";

const NewPetPage: React.FC = () => {
  useRouteGuard();
  return (
    <div>
      <PetForm mode="create" />
    </div>
  );
};

export default NewPetPage;
