import React, { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { Dialog } from "@headlessui/react";

export default function FormModal({ isOpen, closeModal }) {
  const [dimension, setDimension] = useState({
    height: "",
    width: "",
    filled: false,
  });
  const handleChange = (e) => {
    setDimension({ ...dimension, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "FORM_SUBMIT",
      payload: dimension,
    });
    setDimension({ ...dimension, height: "", width: "", filled: true });
    // arrangeBox();
    closeModal();
  };
  const handleClose = () => {
    if (!dimension.filled) return;
    closeModal();
  };
  const dispatch = useDispatch();
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        // style={{left:"6rem"}}
        className="fixed top-0 z-30  w-screen flex justify-center  overflow-y-auto"
        onClose={handleClose}
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
              <h1 className="text-4xl mb-4 text-white">Maze game</h1>
              <p className="mb-2 text-white">
                Create a board by entering the width and height e.g 10 by 10
                grid <br />
                <small className="text-xs text-green-400">
                  RECOMMENDED GRID 10 BY 10 FOR EASE✨️{" "}
                </small>
              </p>
              <form onSubmit={handleSubmit}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="width " className="text-white">
                    Please enter board width
                  </label>
                  <input
                    style={{ padding: "0.3rem" }}
                    type="number"
                    onChange={(e) => handleChange(e)}
                    value={dimension.width}
                    name="width"
                    id="width"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: "1rem",
                    flexDirection: "column",
                  }}
                >
                  <label className="text-white" htmlFor="height">
                    Please enter board height
                  </label>
                  <input
                    style={{ padding: "0.3rem" }}
                    type="number"
                    onChange={(e) => handleChange(e)}
                    value={dimension.height}
                    name="height"
                    id="height"
                  />
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <button className="bg-gray-200 py-3 rounded-lg text-black px-10 mt-4">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
