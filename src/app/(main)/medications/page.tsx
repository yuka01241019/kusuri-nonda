"use client";
import {
  GetMedicationsResponse,
  Medication,
} from "@/app/_types/medication/CreateMedication";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";

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
  return <p>薬一覧</p>;
};

export default MedicationList;
