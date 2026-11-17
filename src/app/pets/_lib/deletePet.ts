import { api } from "@/utils/api";
import { DeletePetResponse } from "@/app/_types/pet/pet";

export const deletePet = async (id: number): Promise<DeletePetResponse> => {
  return api.delete<DeletePetResponse>(`/api/pets/${id}`);
};
