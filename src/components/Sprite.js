import React from "react";
import { useSelector } from "react-redux";

export default function Sprite() {
  const sprites = useSelector((state) => state.game.sprites);
  const innerBoxHeight = useSelector((state) => state.game.innerBoxHeight);

  return (
    <>
      {sprites?.map((item, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: item + "px",
            top: index * innerBoxHeight + "px",
          }}
        >
          <img
            style={{
              width: "20px",
              height: "20px",
            }}
            src="/sprite.png"
            alt="sprite"
          />
        </div>
      ))}
    </>
  );
}
