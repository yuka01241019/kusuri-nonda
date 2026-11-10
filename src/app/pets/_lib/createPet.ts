import { CreatePetRequest } from "@/app/api/pets/route";
import { PostPetResponse } from "@/app/_types/pet/pet";
import { api } from "@/utils/api";

export const createPet = async (
  data: CreatePetRequest,
): Promise<PostPetResponse> => {
  return api.post<PostPetResponse, CreatePetRequest>("/api/pets", data);
};
