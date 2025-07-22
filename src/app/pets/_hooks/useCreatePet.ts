import { CreatePetRequest } from "@/app/_types/pet/CreatePet";
import { Pet } from "@/app/_types/pet/CreatePet";
import { api } from "@/utils/api";

export const useCreatePet = () => {
  const createPet = async (data: CreatePetRequest, token: string) => {
    return api.post<Pet, CreatePetRequest>("/api/pets", data, token);
  };
  return { createPet };
};
