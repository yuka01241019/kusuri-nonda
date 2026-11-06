import { DeleteMedicationScheduleResponse } from "@/app/_types/schedule/schedule";
import { api } from "@/utils/api";

export const deleteMedicationSchedule = async (
  petId: number,
  scheduleId: number,
): Promise<DeleteMedicationScheduleResponse> => {
  return api.delete<DeleteMedicationScheduleResponse>(
    `/api/pets/${petId}/schedules/${scheduleId}`,
  );
};
