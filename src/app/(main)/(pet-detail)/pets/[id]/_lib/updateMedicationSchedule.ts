import { api } from "@/utils/api";
import { PutMedicationScheduleResponse } from "@/app/_types/schedule/schedule";
import { UpdateMedicationScheduleRequest } from "@/app/api/pets/[id]/schedules/[scheduleId]/route";

export const updateMedicationSchedule = async (
  id: string,
  scheduleId: string,
  data: UpdateMedicationScheduleRequest,
): Promise<PutMedicationScheduleResponse> => {
  return api.put<
    PutMedicationScheduleResponse,
    UpdateMedicationScheduleRequest
  >(`/api/pets/${id}/schedules/${scheduleId}`, data);
};
