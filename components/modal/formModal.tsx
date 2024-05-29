"use client";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const FormModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-20 inset-0 overflow-y-auto m-10">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="relative bg-white rounded-lg w-8/12 h-5/6">
          <button
            className="absolute top-0 right-0 m-3 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            &times;
          </button>
          <div className="p-6 h-full w-full">{children}</div>
        </div>
      </div>
    </div>
  );
};
