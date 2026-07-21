"use client";

import Link from "next/link";
import FooterSort from "@/assets/footer/footerSort.svg";
import FooterPow from "@/assets/footer/footerPow.svg";
import FooterMedication from "@/assets/footer/footerMedication.svg";

export const Footer: React.FC = () => {
  return (
    <footer className="sticky bottom-0 z-50 h-[50px] bg-darkPink">
      <nav className="h-full">
        <ul className="flex h-full items-center justify-around">
          <li>
            <Link href="/">
              <FooterSort />
            </Link>
          </li>
          <li>
            <Link href="/">
              <FooterPow />
            </Link>
          </li>
          <li>
            <Link href="/">
              <FooterMedication />
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};
