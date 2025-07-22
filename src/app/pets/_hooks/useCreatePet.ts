import { CreatePetRequest } from "@/app/_types/pet/CreatePet";
import { Pet } from "@/app/_types/pet/CreatePet";
import { api } from "@/utils/api";

export const useCreatePet = () => {
  const createPet = async (data: CreatePetRequest) => {
    return api.post<Pet, CreatePetRequest>("api/pets", data);
  };
  return { createPet };
};
