"use client";

import { useRouteGuard } from "@/app/_hooks/useRouteGuard";
import { PetEdit } from "./_components/PetEdit";

type PetEditPageProps = {
  params: { id: string };
};

const PetEditPage = ({ params }: PetEditPageProps) => {
  useRouteGuard();
  return <PetEdit id={params.id} />;
};

export default PetEditPage;
