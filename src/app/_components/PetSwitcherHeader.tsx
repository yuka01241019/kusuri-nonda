"use client";

import Link from "next/link";
import { useFetch } from "../_hooks/useFetch";
import { GetPetsResponse } from "../_types/pet/pet";
import { PetSwitcherIcon } from "./PetSwitcherIcon";
import { useParams } from "next/navigation";

export const PetSwitcherHeader: React.FC = () => {
  const { id } = useParams();
  const { data } = useFetch<GetPetsResponse>("/api/pets");
  const pets = data?.pets ?? [];
  // URLにペットIDがある場合はそのペットを除外し、ない場合(undefined)は全員表示する
  const otherPets = !id
    ? pets
    : pets.filter((pet) => {
        return pet.id !== Number(id);
      });
  return (
    <header className="sticky top-0 z-50 flex h-[80px] items-center justify-start bg-darkPink">
      <div className="flex px-4 gap-3">
        {otherPets.map((pet) => {
          return (
            <Link href={`/pets/${pet.id}/medications/new`} key={pet.id}>
              <PetSwitcherIcon
                id={pet.id}
                name={pet.name}
                imagePath={pet.imagePath}
              />
            </Link>
          );
        })}
      </div>
      <Link
        href="/"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-small text-white"
      >
        追加
      </Link>
    </header>
  );
};
