"use client";
import { GetMedicationsResponse } from "@/app/_types/medication/CreateMedication";
import { api } from "@/utils/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MedicationItem } from "./MedicationItem";
import { FormButton } from "@/app/_components/FormButton";
import AddIcon from "@assets/icons/medication/add/add.svg";
import useSWR from "swr";
import { LoadingSpinner } from "@/app/_components/LoadingSpinner";

const MedicationList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const fetcher = (url: string) => {
    return api.get<GetMedicationsResponse>(url);
  };
  const { data, isLoading } = useSWR(
    `/api/medications?page=${currentPage}`,
    fetcher,
  );
  // SWRから薬一覧を取り出す。まだ取得できていなければ、ひとまず空の配列にする
  const medications = data?.medications ?? [];
  // SWRからページ情報を取り出す。まだ取得できていなければ、ひとまずnullにする
  const pagination = data?.pagination ?? null;
  // totalPagesを配列にしmapで全件表示する
  const pageNumbers = pagination
    ? Array.from({ length: pagination.totalPages }, (_, index) => index + 1)
    : [];
  return (
    <div className="text-small">
      <div className="bg-lightPink min-h-screen flex justify-center items-start py-10">
        <div className="w-full flex flex-col items-center text-textMain">
          <div className="w-full max-w-[350px] sm:max-w-[390px] md:max-w-[400px] lg:max-w-[420px] bg-white rounded-[16px] px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-8 lg:py-10">
            <div className="my-[10px]">
              <h1 className="text-heading1 text-center font-bold mb-[44px]">
                薬一覧
              </h1>
              <div>
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  medications.map((medication, index) => {
                    return (
                      <MedicationItem
                        key={medication.id}
                        medication={medication}
                        // 最後の薬の場合下線はなし
                        isLast={index === medications.length - 1}
                      />
                    );
                  })
                )}
              </div>
            </div>
            {pagination && (
              <div className="flex justify-center gap-2">
                {currentPage > 1 && (
                  <button
                    className="w-8 h-8 border rounded-[8px]"
                    onClick={() => {
                      setCurrentPage(currentPage - 1);
                    }}
                  >
                    {"<"}
                  </button>
                )}
                {pageNumbers.map((pageNumber) => {
                  return (
                    <button
                      key={pageNumber}
                      className={`w-8 h-8 border rounded-[8px] ${currentPage === pageNumber ? "bg-lightPink" : ""}`}
                      onClick={() => setCurrentPage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                {currentPage < pagination.totalPages && (
                  <button
                    className="w-8 h-8 border rounded-[8px]"
                    onClick={() => {
                      setCurrentPage(currentPage + 1);
                    }}
                  >
                    {">"}
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="mt-[26px] flex justify-center">
            <FormButton
              type="button"
              text="薬を追加"
              variant="secondary"
              showIcon={true}
              icon={<AddIcon />}
              onClick={() => router.push("/medications/new")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicationList;
