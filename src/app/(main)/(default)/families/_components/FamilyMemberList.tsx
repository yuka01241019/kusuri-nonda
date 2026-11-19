"use client";

import { useFetch } from "@/app/_hooks/useFetch";
import { GetFamiliesResponse } from "@/app/_types/family/family";
import { LoadingSpinner } from "@/app/_components/LoadingSpinner";
import { FamilyMemberItem } from "./FamilyMemberItem";
import { FormButton } from "@/app/_components/FormButton";
import AddFamilyIcon from "@assets/icons/family/addFamily.svg";

export const FamilyMemberList: React.FC = () => {
  const { data, isLoading, mutate } =
    useFetch<GetFamiliesResponse>(`/api/families`);
  // SWRから家族一覧を取り出す。まだ取得できていなければ、ひとまず空の配列にする
  const families = data?.families ?? [];
  console.log(families);
  return (
    <div className="text-small">
      <div className="flex justify-center items-start py-10">
        <div className="w-full flex flex-col items-center text-textMain">
          <div className="w-full max-w-[350px] sm:max-w-[390px] md:max-w-[400px] lg:max-w-[420px] bg-white rounded-[16px] px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-8 lg:py-10">
            <div className="my-[10px]">
              <h1 className="text-heading1 text-center font-bold mb-[44px]">
                家族メンバー
              </h1>
              <div>
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  families.map((family, index) => {
                    return (
                      <FamilyMemberItem
                        key={family.id}
                        family={family}
                        isLast={index === families.length - 1}
                      />
                    );
                  })
                )}
              </div>
            </div>
          </div>
          <div className="mt-[26px] flex justify-center">
            <FormButton
              type="button"
              text="メンバーを追加"
              variant="secondary"
              showIcon={true}
              icon={<AddFamilyIcon />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
