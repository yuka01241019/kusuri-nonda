import { api } from "@/utils/api";
import { DeleteMedicationResponse } from "@/app/_types/medication/medication";

export const deleteMedication = async (
  id: number,
): Promise<DeleteMedicationResponse> => {
  return api.delete<DeleteMedicationResponse>(`/api/medications/${id}`);
};
