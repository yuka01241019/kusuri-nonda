"use client";

import { supabase } from "@/utils/supabase";
import Link from "next/link";
import { useSupabaseSession } from "../_hooks/useSupabaseSession";
import Logo from "@/assets/header/logo.svg";
import HeaderFamily from "@/assets/header/headerFamily.svg";

export const Header: React.FC = () => {
  const { session, isLoading } = useSupabaseSession();
  return (
    <header className="sticky top-0 z-50 flex h-[80px] items-center justify-center bg-darkPink">
      {/* 中央ロゴ */}
      <Link href="/">
        <Logo className=" w-auto fill-white" />
      </Link>
      {/* 右側アイコン */}
      <Link href="/family" className="absolute right-4 top-2 p-2">
        <HeaderFamily className="" />
      </Link>
    </header>
  );
};
