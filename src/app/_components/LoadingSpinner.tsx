"use client";

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="relative flex h-28 w-28 items-center justify-center">
        {/* 外側の回転する丸 */}
        <div className="absolute inset-0 animate-spin rounded-full border-8 border-lightPink border-t-submitBtn" />
        {/* 真ん中の文字 */}
        <span className="text-sm text-textMain">Loading...</span>
      </div>
    </div>
  );
};
