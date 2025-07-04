"use client";

import { useRouteGuard } from "@/app/_hooks/useRouteGuard";

const ProtectedPage: React.FC = () => {
  useRouteGuard(); 

  return (
    <div className="p-10 text-center">
      <h1 className="text-xl font-bold">🔒 認可が必要なページ</h1>
      <p className="mt-4">ログインしていればこのページが見られます！</p>
    </div>
  );
};

export default ProtectedPage;