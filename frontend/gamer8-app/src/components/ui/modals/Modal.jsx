import React, { useEffect, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

const exModalContent = [
  {
    label: 'Username',
    value: 'username',
    type: <textarea></textarea>,
  },
];

function Modal({
  modalTitle,
  modalContent,
  showModel,
  setShowModal,
  outletContainer,
}) {
  // keep reference of the modal so we don't blur this element
  const modalRef = useRef(null);

  // effect to blur/unblur elements when modal is shown/hidden
  useEffect(() => {
    if (!modalRef.current) {
      return;
    }
    console.log('Current State of modal', showModel);
    // get all elements that need to be blurred
    const elements = document.querySelectorAll(
      'body *:not(#root):not(#layout-container)',
    );

    const modalElement = modalRef.current;

    // blur/unblur elements
    elements.forEach((element) => {
      if (showModel) {
        // Blur elements that are not the modal or its children
        if (
          !modalElement.contains(element) &&
          element !== modalElement &&
          element !== outletContainer.current
        ) {
          element.classList.add('blur-sm');
        }
      }
    });
    return () => {
      elements.forEach((element) => {
        element.classList.remove('blur-sm');
      });
    };
  }, [showModel, outletContainer]);

  return (
    <div
      ref={modalRef}
      className="fixed left-1/4 top-auto z-10 h-[75vh] w-[50vw] flex-col rounded-lg border-8 border-secondary-color bg-primary-color"
    >
      <div className="flex flex-row">
        <h2 className="mt-2 flex-[14] text-center font-header text-lg text-primary-text-color">
          {modalTitle}
        </h2>
        <div className="flex flex-1 justify-end">
          <IoMdClose
            onClick={() => setShowModal(false)}
            className="mr-2 mt-2 rounded-md text-2xl text-primary-text-color transition-all duration-500 hover:bg-primary-text-color hover:text-secondary-text-color"
          />
        </div>
      </div>
    </div>
  );
}

export default Modal;
