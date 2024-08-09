"use client";
import React, { useState } from "react";
interface ModalProps {
  title: string;
  children: JSX.Element;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
}
const useDialog = () => {
  const [showModal, setModal] = useState(false);

  const setShowModal = (state: boolean) => setModal(state);
  const closeModal = () => setModal(false);
  const formatWidth = {
    xl: "w-11/12 lg:w-[700px]",
    lg: "w-11/12 lg:w-[650px]",
    md: "w-11/12 lg:w-[550px]",
    sm: "w-11/12 lg:w-[450px]",
    xs: "w-11/12 lg:w-[350px]",
  };
  const Dialog: React.FC<ModalProps> = ({ title, children, size }) => {
    return (
      <>
        {showModal && (
          <div
            className="relative z-[2000]"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={closeModal}
            ></div>

            <div
              className="fixed inset-0 z-10 w-screen overflow-y-auto"
              onClick={closeModal}
            >
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div
                  className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all p-6 sm:my-8 ${
                    formatWidth[size as keyof typeof formatWidth]
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-lg fw-500">{title}</div>
                  <div>{children}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  return { Dialog, showModal, setShowModal };
};

export default useDialog;
