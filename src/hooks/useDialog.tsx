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

  const Dialog: React.FC<ModalProps> = ({ title, children }) => {
    return (
      <>
       {showModal && <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={closeModal}></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto" onClick={closeModal}>
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all p-6 sm:my-8 sm:w-full sm:max-w-lg" onClick={(e) => e.stopPropagation()}>
                <div className="text-lg fw-500">
                  {title}
                </div>
                <div>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>}
      </>
    );
  };

  return { Dialog, showModal, setShowModal };
};

export default useDialog;
