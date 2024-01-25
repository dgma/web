import { useState } from "react";

export function useModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return {
    isOpen,
    closeModal: () => setIsOpen(false),
    openModal: () => setIsOpen(true),
  };
}
