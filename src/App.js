import React, { useState, useEffect } from "react";
import Form from "../src/components/form";
import { useSelector, useDispatch } from "react-redux";
import RandomSprite from "./components/Sprite";
import store from "./store";
export default function App() {
  const dispatch = useDispatch();
  const height = useSelector((state) => state.game.boardHeight);
  const width = useSelector((state) => state.game.boardWidth);
  const boxWidthArray = useSelector((state) => state.game.boxWidthArray);
  const boxHeightArray = useSelector((state) => state.game.boxHeightArray);
  const horizontal = useSelector((state) => state.game.horizontal);
  const [movement, setMovement] = useState({
    horizontal: 0,
    vertical: 0,
  });

  const [innerBoxDimension, setInnerBoxDimension] = useState({
    width: 30,
    height: 30,
  });

  // useEffect(()=>{

  // })
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
      horizontal:
        movement.horizontal === 0
          ? movement.horizontal
          : (movement.horizontal -= 1),
    });
    document.querySelector(".maze").style.left =
      movement.horizontal * 30 + "px";
  };
  const moveMazeRight = () => {
    setMovement({
      ...movement,
      horizontal:
        movement.horizontal < width - 1
          ? (movement.horizontal += 1)
          : movement.horizontal,
    });

    document.querySelector(".maze").style.left =
      movement.horizontal * 30 + "px";
  };
  const moveMazeTop = () => {
    setMovement({
      ...movement,
      vertical:
        movement.vertical === 0 ? movement.vertical : (movement.vertical -= 1),
    });
    document.querySelector(".maze").style.top = movement.vertical * 30 + "px";
  };
  const moveMazeBottom = () => {
    setMovement({
      ...movement,
      vertical:
        movement.vertical < height - 1
          ? (movement.vertical += 1)
          : movement.vertical,
    });
    document.querySelector(".maze").style.top = movement.vertical * 30 + "px";
  };

  // useEffect(() => {
  //   const maze = document.querySelector(".maze");
  //   console.log(maze.getBoundingClientRect());
  // });

  return (
    <div style={{ background: "gray", minHeight: "100vh" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "70%",
          margin: "auto",
        }}
      >
        <div>
          <h1>Board section</h1>
          <div>
            <button onClick={moveMazeRight}>Right</button>
            <button onClick={moveMazeLeft}>Left</button>
            <button onClick={moveMazeTop}>Top</button>
            <button onClick={moveMazeBottom}>Bottom</button>
          </div>
          <div
            style={{
              marginTop: "2rem",
              width: innerBoxDimension.width * width + "px",
              height: innerBoxDimension.height * height + "px",
              border: "0.1px solid red",
              position: "relative",
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
        <div
          style={{
            background: "white",
            padding: "2rem",
            minHeight: "100vh",
            // textAlign: "center",
          }}
        >
          <Form />
        </div>
      </div>
    </div>
  );
}
