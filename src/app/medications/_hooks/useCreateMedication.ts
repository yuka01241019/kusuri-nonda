import { CreateMedicationRequest } from "@/app/api/medications/route";
import { Medication } from "@/app/_types/medication/CreateMedication";
import { api } from "@/utils/api";

export const useCreateMedication = () => {
  const createMedication = async (data: CreateMedicationRequest) => {
    return api.post<Medication, CreateMedicationRequest>(
      "/api/medications",
      data
    );
  };
  return { createMedication };
};
