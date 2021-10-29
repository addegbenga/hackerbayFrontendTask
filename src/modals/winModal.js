import React, { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { Dialog } from "@headlessui/react";

export default function FormModal({
  isOpen,
  closeModal,
  steps,
  maxStep,
  openModal,
}) {

  const handleCloseModal = () => {
    if (isOpen) return;
    closeModal();
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        // style={{left:"6rem"}}
        className="fixed top-0 z-30  w-screen flex justify-center  overflow-y-auto"
        onClose={handleCloseModal}
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-10" />
        <div
          className=" px-4 text-center  w-full md:w-5/12  rounded-3xl shadow-2xl "
          style={{ background: "#0f0f0f" }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block " aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="text-left py-8 px-3 w-full  transition-all transform  ">
              <h1 className="text-4xl mb-4 text-white">
                {steps < maxStep ? (
                  <span className="text-green-400">You Won😍️😍️</span>
                ) : (
                  <span className="text-red-400">You Lost😥️😥️</span>
                )}
              </h1>
              <p className="mb-2 text-sm text-white">
                You took {steps} number of steps to eat all maze out of{" "}
                {maxStep}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-500 p-3 px-4 text-white"
              >
                Let Play Again
              </button>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
