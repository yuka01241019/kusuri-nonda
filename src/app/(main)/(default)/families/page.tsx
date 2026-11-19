"use client";

import { useRouteGuard } from "@/app/_hooks/useRouteGuard";
import { FamilyMemberList } from "./_components/FamilyMemberList";

const FamilyPage: React.FC = () => {
  useRouteGuard();
  return (
    <div>
      <FamilyMemberList />
    </div>
  );
};

export default FamilyPage;
