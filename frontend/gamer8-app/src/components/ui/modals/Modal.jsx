import React, { useEffect, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

function Modal({
  modalTitle,
  modalContent,
  showModel,
  setShowModal,
}) {
  const modalRef = useRef(null);
  useEffect(() => {
    if (!modalRef.current) {
      return;
    }

    const elements = document.querySelectorAll('body *');
    const modalElement = modalRef.current;

    elements.forEach((element) => {
      if (showModel) {
        // Blur elements that are not the modal or its children
        if (
          !modalElement.contains(element) &&
          element !== modalElement
        ) {
          element.classList.add('blur-sm');
        }
      } else {
        // Remove blur from all elements
        element.classList.remove('blur-sm');
      }
    });
  }, [showModel]);

  return (
    <div
      ref={modalRef}
      className="absolute left-1/4 top-1/4 z-10 h-[75vh] w-[50vw] flex-col border-8 border-secondary-color bg-primary-color"
    >
      <div className="flex">
        <h2 className="text-lg text-primary-text-color">
          {modalTitle}
        </h2>
      </div>
    </div>
  );
}

export default Modal;
