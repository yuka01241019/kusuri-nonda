import { CreateMedicationRequest } from "@/app/api/medications/route";
import { PostMedicationResponse } from "@/app/_types/medication/medication";
import { api } from "@/utils/api";

export const createMedication = async (
  data: CreateMedicationRequest,
): Promise<PostMedicationResponse> => {
  return api.post<PostMedicationResponse, CreateMedicationRequest>(
    "/api/medications",
    data,
  );
};
