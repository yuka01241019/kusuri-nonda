import { CreateMedicationScheduleRequest } from "@/app/api/schedules/route";
import { PostMedicationScheduleResponse } from "@/app/_types/schedule/schedule";
import { api } from "@/utils/api";

export const createMedicationSchedule = async (
  data: CreateMedicationScheduleRequest,
): Promise<PostMedicationScheduleResponse> => {
  return api.post<
    PostMedicationScheduleResponse,
    CreateMedicationScheduleRequest
  >("/api/schedules", data);
};
