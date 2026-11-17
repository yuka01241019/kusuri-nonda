import { UpdatePetRequest } from "@/app/api/pets/[id]/route";
import { PutPetResponse } from "@/app/_types/pet/pet";
import { api } from "@/utils/api";

export const updatePet = async (
  petId: number,
  data: UpdatePetRequest,
): Promise<PutPetResponse> => {
  return api.put(`/api//pets/${petId}`, data);
};
