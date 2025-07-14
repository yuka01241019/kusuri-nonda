export type CreatePetRequest = {
  name: string;
  species: string;
  gender: "おとこのこ♂" | "おんなのこ♀" | null;
  birthday: string | null;
  adoptedAt: string | null;
  imagePath?: string;
};
