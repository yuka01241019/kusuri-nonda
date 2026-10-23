"use client";

import Image from "next/image";
import NoImageIcon from "@assets/icons/no-image.svg";
import { useStorageImage } from "../_hooks/useStorageImage";

type PetSwitcherIconProps = {
  id: number;
  name: string;
  imagePath: string | null;
};

export const PetSwitcherIcon: React.FC<PetSwitcherIconProps> = ({
  id,
  name,
  imagePath,
}) => {
  const imageUrl = useStorageImage("pet-imageurl", imagePath);
  return (
    <div>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={`${name}の写真`}
          width={70}
          height={70}
          unoptimized
          className="w-[70px] h-[70px] object-cover rounded-full"
        />
      ) : (
        <NoImageIcon className="w-[70px] h-[70px]" />
      )}
    </div>
  );
};
