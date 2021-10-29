/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
// import Form from "../src/components/form";
import { useSelector, useDispatch } from "react-redux";
import RandomSprite from "../Sprite";
import WinModal from "../../modals/winModal";
import FormModal from "../../modals/formModal";
export default function Board() {
  const dispatch = useDispatch();
  const height = useSelector((state) => state.game.boardHeight);
  const position = useSelector((state) => state.game.position);
  const width = useSelector((state) => state.game.boardWidth);
  const sprites = useSelector((state) => state.game.sprites);
  const boxWidthArray = useSelector((state) => state.game.boxWidthArray);
  const boxHeightArray = useSelector((state) => state.game.boxHeightArray);
  const [isModal, setIsModal] = useState(true);
  const [resultModal, setResultModal] = useState(false);
  const [maxStep, setMaxStep] = useState(50);
  const [movement, setMovement] = useState({
    horizontal: 0,
    vertical: 0,
    numSteps: 0,
  });

  const [innerBoxDimension, setInnerBoxDimension] = useState({
    width: 30,
    height: 30,
  });

  const handleCloseModal = () => {
    setIsModal(false);
  };

  const handleOpenModal= ()=>{
    setIsModal(true)
  }
  const handleCloseResultModal = () => {
    setResultModal(false);
  };

  //check for number od steps

  useEffect(() => {
    const sprite = document.querySelector(".sprites");
    if (sprites.length > 0 && !sprite) {
      setResultModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  //center the maze on page load
  useEffect(() => {
    setMovement({
      ...movement,
      horizontal: Math.round(width / 2),
      vertical: Math.round(height / 2),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  const moveMazeLeft = () => {
    setMovement({
      ...movement,
      numSteps:
        movement.horizontal === 0
          ? movement.numSteps
          : (movement.numSteps += 1),
      horizontal:
        movement.horizontal === 0
          ? movement.horizontal
          : (movement.horizontal -= 1),
    });
    const maze = document.querySelector(".maze");
    maze.style.left = movement.horizontal * 30 + "px";

    dispatch({
      type: "POSITION",
      payload: { top: maze.offsetTop, left: maze.offsetLeft },
    });
  };
  const moveMazeRight = () => {
    setMovement({
      ...movement,
      numSteps:
        movement.horizontal < width - 1
          ? (movement.numSteps += 1)
          : movement.numSteps,
      horizontal:
        movement.horizontal < width - 1
          ? (movement.horizontal += 1)
          : movement.horizontal,
    });
    const maze = document.querySelector(".maze");
    maze.style.left = movement.horizontal * 30 + "px";
    dispatch({
      type: "POSITION",
      payload: { top: maze.offsetTop, left: maze.offsetLeft },
    });
  };
  const moveMazeTop = () => {
    setMovement({
      ...movement,
      numSteps:
        movement.vertical === 0 ? movement.numSteps : (movement.numSteps += 1),
      vertical:
        movement.vertical === 0 ? movement.vertical : (movement.vertical -= 1),
    });
    const maze = document.querySelector(".maze");
    maze.style.top = movement.vertical * 30 + "px";
    dispatch({
      type: "POSITION",
      payload: { top: maze.offsetTop, left: maze.offsetLeft },
    });
  };
  const moveMazeBottom = () => {
    setMovement({
      ...movement,
      numSteps:
        movement.vertical < height - 1
          ? (movement.numSteps += 1)
          : movement.numSteps,
      vertical:
        movement.vertical < height - 1
          ? (movement.vertical += 1)
          : movement.vertical,
    });
    const maze = document.querySelector(".maze");
    maze.style.top = movement.vertical * 30 + "px";

    dispatch({
      type: "POSITION",
      payload: { top: maze.offsetTop, left: maze.offsetLeft },
    });
  };

  return (
    <>
      <WinModal
        isOpen={resultModal}
        steps={movement.numSteps}
        maxStep={maxStep}
        closeModal={handleCloseResultModal}
        openModal= {handleOpenModal}
      />
      <FormModal isOpen={isModal} closeModal={handleCloseModal} />
      <div style={{ minHeight: "100vh", position: "relative" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div>
            <h1 className="text-3xl ">Start playing Now</h1>
            <div className="flex justify-between">
              <button
                className="bg-white text-black p-3 "
                onClick={moveMazeRight}
              >
                Right
              </button>
              <button
                className="bg-white text-black p-3"
                onClick={moveMazeLeft}
              >
                Left
              </button>
              <button className="bg-white text-black p-3" onClick={moveMazeTop}>
                Top
              </button>
              <button
                className="bg-white text-black p-3"
                onClick={moveMazeBottom}
              >
                Bottom
              </button>
            </div>
            <div
              style={{
                marginTop: "2rem",
                width: innerBoxDimension.width * width + "px",
                height: innerBoxDimension.height * height + "px",
                border: "0.1px solid white",
                position: "relative",
                background: "#151515",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                }}
                className="maze"
              >
                <img
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                  src="/mario.png"
                  alt="mario"
                />
              </div>
              <RandomSprite />

              <>
                {boxWidthArray?.map((item, index) => (
                  <div
                    key={index}
                    className="box"
                    style={{
                      width: innerBoxDimension.width + "px",
                      height: innerBoxDimension.height + "px",
                      border: "0.1px solid blue",
                      position: "absolute",
                      left: index * innerBoxDimension.width + "px",
                    }}
                  ></div>
                ))}
                {boxWidthArray?.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      position: "absolute",
                      left: index * innerBoxDimension.width + "px",
                    }}
                  >
                    {boxHeightArray?.map((item, index) => (
                      <div
                        key={index}
                        className="box"
                        style={{
                          width: innerBoxDimension.width + "px",
                          height: innerBoxDimension.height + "px",
                          border: "0.1px solid pink",
                          position: "absolute",
                          top: index * innerBoxDimension.width + "px",
                        }}
                      ></div>
                    ))}
                  </div>
                ))}
              </>
            </div>
          </div>
          {/* <div
          style={{
            background: "white",
            padding: "2rem",
            // minHeight: "100vh",
            // textAlign: "center",
          }}
        >
          <Form />
         
        </div> */}
        </div>
      </div>
    </>
  );
}
