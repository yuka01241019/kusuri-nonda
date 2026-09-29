"use client";

import useSWR from "swr";
import { api } from "@/utils/api";
import { GetMedicationResponse } from "@/app/_types/medication/medication";
import { LoadingSpinner } from "@/app/_components/LoadingSpinner";
import { MedicationForm } from "./MedicationForm";

type MedicationEditProps = {
  id: string;
};

const MedicationEdit = ({ id }: MedicationEditProps) => {
  const fetcher = (url: string) => {
    return api.get<GetMedicationResponse>(url);
  };
  const { data, isLoading } = useSWR(`/api/medications/${id}`, fetcher);
  const medication = data?.medication ?? null;
  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-130px)] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  if (!medication) {
    return <div>薬のデータがありません</div>;
  }
  return (
    <div>
      <MedicationForm medication={medication} />
    </div>
  );
};

export default MedicationEdit;
