"use client";

import { Medication } from "@/app/_types/medication/medication";
import { MedicationIcon } from "@/app/_components/MedicationIcon";
import ChevronRightIcon from "@assets/icons/chevron-right.svg";
import { useState } from "react";
import { DropdownMenu, AlertDialog } from "radix-ui";
import EditIcon from "@assets/icons/edit.svg";
import TrashIcon from "@assets/icons/trash.svg";
import { deleteMedication } from "../_lib/deleteMedication";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type MedicationItemProps = {
  medication: Medication;
  isLast: boolean;
  onDelete: () => void;
};

export const MedicationItem: React.FC<MedicationItemProps> = ({
  medication,
  isLast,
  onDelete,
}) => {
  // ドロップダウンメニューの開閉状態を管理
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // 削除確認ダイアログの開閉状態を管理
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    const toastId = toast.loading("削除中です…");
    try {
      await deleteMedication(medication.id);
      onDelete();
      toast.success("薬を削除しました！", { id: toastId });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, { id: toastId });
      } else {
        toast.error("予期せぬエラーが発生しました", { id: toastId });
      }
    }
  };
  const handleEdit = () => {
    router.push(`/medications/${medication.id}`);
  };
  return (
    <div
      className={`pb-5 pt-2 ${isLast ? "" : "border-b-[1.25px] border-gray-300 "}`}
    >
      <div className="flex items-center gap-2">
        <MedicationIcon form={medication.form} color={medication.color} />
        {medication.name}
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
              // 読み上げソフトにボタンの役割を伝える
              aria-label={`${medication.name}の編集・削除メニューを開く`}
              className="ml-auto rounded-full p-2 outline-none hover:bg-lightPink focus-visible:bg-lightPink"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            {/* 白い枠 */}
            <DropdownMenu.Content
              sideOffset={5}
              align="end"
              className="text-small text-textMain z-[70] w-[180px] space-y-2 rounded-[16px] bg-white p-6 shadow-lg"
            >
              <DropdownMenu.Item
                onSelect={handleEdit}
                className="mx-auto flex w-fit cursor-pointer items-center justify-center gap-1 rounded-lg bg-submitBtn px-6 py-2 text-white opacity-100 outline-none hover:opacity-80 transition-opacity"
              >
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
                {medication.name}を削除しますか？
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
