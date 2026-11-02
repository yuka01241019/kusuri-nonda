"use client";

import { MedicationScheduleWithDetails } from "@/app/_types/schedule/schedule";
import { MedicationIcon } from "@/app/_components/MedicationIcon";
import ChevronRightIcon from "@assets/icons/chevron-right.svg";
import { Weekday } from "@prisma/client";
import { useState } from "react";
import { DropdownMenu, AlertDialog } from "radix-ui";
import { useRouter } from "next/navigation";
import EditIcon from "@assets/icons/edit.svg";
import TrashIcon from "@assets/icons/trash.svg";
import { deleteMedicationSchedule } from "../_lib/deleteMedicationSchedule";
import toast from "react-hot-toast";

type PetMedicationScheduleItemProps = {
  petId: number;
  medication: MedicationScheduleWithDetails;
  isLast: boolean;
  onDelete: () => void;
};

export const PetMedicationScheduleItem: React.FC<
  PetMedicationScheduleItemProps
> = ({ petId, medication, isLast, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    const toastId = toast.loading("削除中です…");
    try {
      await deleteMedicationSchedule(petId, medication.id);
      onDelete();
      toast.success("スケジュールを削除しました！", { id: toastId });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, { id: toastId });
      } else {
        toast.error("予期せぬエラーが発生しました", { id: toastId });
      }
    }
  };
  // 繰り返し使うため変数に格納
  const medicine = medication.medicationScheduleLinks[0].medication;
  const weekdayMap: Record<Weekday, string> = {
    MON: "月曜日",
    TUE: "火曜日",
    WED: "水曜日",
    THU: "木曜日",
    FRI: "金曜日",
    SAT: "土曜日",
    SUN: "日曜日",
  };
  return (
    <div
      className={`pb-5 pt-2 ${isLast ? "" : "border-b-[1.25px] border-gray-300"}`}
    >
      <div className="flex items-center gap-2">
        <MedicationIcon form={medicine.form} color={medicine.color} />
        {medicine.name}
        {medication.dayType === "DAILY"
          ? "毎日"
          : medication.weekdays
              .map((weekday) => {
                return weekdayMap[weekday];
              })
              .join("/")}
        {medication.medicationScheduleTimes
          .map((item) => {
            return item.time;
          })
          .join("/")}
        <DropdownMenu.Root
          modal={false}
          open={isMenuOpen}
          onOpenChange={setIsMenuOpen}
        >
          {isMenuOpen && (
            <div className="fixed inset-0 z-[60] bg-black/20"></div>
          )}
          <DropdownMenu.Trigger asChild>
            <button
              type="button"
              className="ml-auto rounded-full p-2 outline-none hover:bg-lightPink focus-visible:bg-lightPink"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              sideOffset={5}
              align="end"
              className="text-small text-textMain z-[70] w-[180px] space-y-2 rounded-[16px] bg-white p-6 shadow-lg"
            >
              <DropdownMenu.Item className="mx-auto flex w-fit cursor-pointer items-center justify-center gap-1 rounded-lg bg-submitBtn px-6 py-2 text-white opacity-100 outline-none hover:opacity-80 transition-opacity">
                <EditIcon className="w-5 h-5" />
                編集
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onSelect={() => setIsDeleteDialogOpen(true)}
                className="mx-auto flex w-fit cursor-pointer items-center justify-center gap-1 rounded-lg bg-red-400 px-6 py-2 text-white  opacity-100 outline-none hover:opacity-80 transition-opacity"
              >
                <TrashIcon className="w-5 h-5" />
                削除
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

        <AlertDialog.Root
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialog.Portal>
            <AlertDialog.Overlay className="fixed inset-0 z-[80] bg-black/20" />
            <AlertDialog.Content className="text-small fixed left-1/2 top-1/2 z-[90] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-[16px] bg-white p-6 shadow-lg">
              <AlertDialog.Title>
                {medicine.name}のスケジュールを削除しますか？
              </AlertDialog.Title>
              <div className="mt-6 flex justify-center gap-4">
                <AlertDialog.Cancel className="rounded-lg bg-gray-200 px-4 py-2 hover:opacity-80">
                  キャンセル
                </AlertDialog.Cancel>
                <AlertDialog.Action
                  onClick={handleDelete}
                  className="rounded-lg bg-red-400 px-4 py-2 text-white hover:opacity-80"
                >
                  削除する
                </AlertDialog.Action>
              </div>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      </div>
    </div>
  );
};
