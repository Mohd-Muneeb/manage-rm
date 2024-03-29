"use client";

import { useState } from "react";

export function useDisclosure(initialState?: boolean) {
  const [isOpen, setIsOpen] = useState<boolean>(initialState ?? false);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const toggle = () => (isOpen ? close() : open());

  return { isOpen, open, close, toggle };
}
