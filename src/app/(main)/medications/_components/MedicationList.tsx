"use client";
import {
  GetMedicationsResponse,
  Medication,
  Pagination,
} from "@/app/_types/medication/CreateMedication";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MedicationItem } from "./MedicationItem";
import { FormButton } from "@/app/_components/FormButton";
import AddIcon from "@assets/icons/medication/add/add.svg";

const MedicationList = () => {
  //GETした薬一覧の状態を管理
  const [medications, setMedications] = useState<Medication[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  useEffect(() => {
    const fetchMedications = async () => {
      const response = await api.get<GetMedicationsResponse>(
        `/api/medications?page=${currentPage}`,
      );
      setMedications(response.medications);
      setPagination(response.pagination);
    };
    fetchMedications();
  }, [currentPage]);
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
                {medications.map((medication, index) => {
                  return (
                    <MedicationItem
                      key={medication.id}
                      medication={medication}
                      // 最後の薬の場合下線はなし
                      isLast={index === medications.length - 1}
                    />
                  );
                })}
              </div>
            </div>
            {pagination && (
              <div>
                <p className="flex justify-center gap-2">
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
                </p>
                <button
                  onClick={() => {
                    currentPage > 1 && setCurrentPage(currentPage - 1);
                  }}
                  disabled={currentPage === 1}
                >
                  戻
                </button>
                <button
                  onClick={() => {
                    currentPage < pagination.totalPages &&
                      setCurrentPage(currentPage + 1);
                  }}
                  // 最後のページではボタン自体を無効にする
                  disabled={currentPage === pagination.totalPages}
                >
                  次
                </button>
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
