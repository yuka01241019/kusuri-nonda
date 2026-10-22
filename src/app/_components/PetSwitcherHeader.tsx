"use client";

import Link from "next/link";
import { useFetch } from "../_hooks/useFetch";
import { GetPetsResponse } from "../_types/pet/pet";
import { PetSwitcherIcon } from "./PetSwitcherIcon";

export const PetSwitcherHeader: React.FC = () => {
  const { data } = useFetch<GetPetsResponse>("/api/pets");
  const pets = data?.pets ?? [];
  return (
    <header className="sticky top-0 z-50 flex h-[80px] items-center justify-start bg-darkPink">
      <div className="flex px-4 gap-3">
        {pets.map((pet) => {
          return (
            <PetSwitcherIcon
              key={pet.id}
              id={pet.id}
              name={pet.name}
              imagePath={pet.imagePath}
            />
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
