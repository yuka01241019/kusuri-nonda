"use client";
import {
  GetMedicationsResponse,
  Medication,
} from "@/app/_types/medication/CreateMedication";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import { MedicationItem } from "./MedicationItem";

const MedicationList = () => {
  //GETした薬一覧の状態を管理
  const [medications, setMedications] = useState<Medication[]>([]);

  useEffect(() => {
    const fetchMedications = async () => {
      const response = await api.get<GetMedicationsResponse>(
        "/api/medications?page=1",
      );
      setMedications(response.medications);
      console.log(
        response.medications.map((medication) => {
          return medication.name;
        }),
      );
    };
    fetchMedications();
  }, []);
  return (
  <div className="text-small">
    <div className="bg-lightPink min-h-screen flex justify-center items-start py-10">
      <div className="w-full flex justify-center text-textMain">
        <div className="w-full max-w-[350px] sm:max-w-[390px] md:max-w-[400px] lg:max-w-[420px] bg-white rounded-[16px] px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-8 lg:py-10">
          <div className="my-[10px]">
            <h1 className="text-heading1 text-center font-bold mb-[44px]">
              薬一覧
            </h1>
            <div>
              {medications.map((medication) => {
                return <MedicationItem key={medication.id} medication={medication} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MedicationList;
