import { api } from "@/utils/api";
import { PutMedicationResponse } from "@/app/_types/medication/medication";
import { UpdateMedicationRequest } from "@/app/api/medications/[id]/route";

export const updateMedication = async (
  id: number,
  data: UpdateMedicationRequest,
): Promise<PutMedicationResponse> => {
  return api.put<PutMedicationResponse, UpdateMedicationRequest>(
    `/api/medications/${id}`,
    data,
  );
};
