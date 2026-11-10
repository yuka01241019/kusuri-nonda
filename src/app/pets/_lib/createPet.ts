import { CreatePetRequest } from "@/app/api/pets/route";
import { Pet } from "@/app/_types/pet/pet";
import { api } from "@/utils/api";

export const createPet = async (data: CreatePetRequest): Promise<Pet> => {
  return api.post<Pet, CreatePetRequest>("/api/pets", data);
};
