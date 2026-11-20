"use client";

import { Dialog } from "radix-ui";
import PawIcon from "@assets/icons/paw.svg";

type FamilyMemberModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const FamilyMemberModal: React.FC<FamilyMemberModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-black/20" />
        {/* 外側クリックで閉じないように制限 */}
        <Dialog.Content
          onPointerDownOutside={(e) => e.preventDefault()}
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[90]
            w-[90%] max-w-[350px]
            bg-white rounded-[16px] p-6 shadow-lg
            text-small text-textMain"
        >
          <Dialog.Close
            aria-label="閉じる"
            className="absolute top-4 right-4 text-xl cursor-pointer"
          >
            ×
          </Dialog.Close>
          <Dialog.Title
            className="text-heading1 text-center font-bold mb-6
            flex flex-row items-center justify-center gap-2"
          >
            <PawIcon
              className="text-darkPink w-[31px] h-[31px]"
              aria-hidden="true"
            />
            メンバーを追加
          </Dialog.Title>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
