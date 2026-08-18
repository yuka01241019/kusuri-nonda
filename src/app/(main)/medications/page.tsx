"use client";
import { GetMedicationsResponse } from "@/app/_types/medication/CreateMedication";
import { api } from "@/utils/api";
import { useEffect } from "react";

const MedicationList = () => {
  useEffect(() => {
    const fetchMedications = async () => {
      const response = await api.get<GetMedicationsResponse>(
        "/api/medications?page=1",
      );
      console.log(
        response.medications.map((medication) => {
          return medication.name;
        }),
      );
    };
    fetchMedications();
  }, []);
  return <p>薬一覧</p>;
};

export default MedicationList;
