import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Sprite() {
  const sprites = useSelector((state) => state.game.sprites);
  // const innerBoxHeight = useSelector((state) => state.game.innerBoxHeight);
  const position = useSelector((state) => state.game.position);
  useEffect(() => {
    const spriteArray = Array.from(document.querySelectorAll(".sprites"));
    spriteArray.map((item, index) =>
      item.offsetTop === position.top && item.offsetLeft === position.left
        ? item.remove()
        : ""
    );
  }, [position,sprites]);

  return (
    <>
      {sprites?.map((item, index) => (
        <div
          className="sprites "
          key={index}
          style={{
            overflow:"hidden",
            position: "absolute",
            left: item + "px",
            top: index * 40 + "px",
          }}
        >
          <img
            style={{
              width: "30px",
              height: "30px",
            }}
            src="/sprite.png"
            alt="sprite"
          />
        </div>
      ))}
    </>
  );
}
