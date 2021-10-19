import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function Form() {
  const [dimension, setDimension] = useState({
    height: "",
    width: "",
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
    // arrangeBox();
  };
  const dispatch = useDispatch();

  return (
    <>
      <h1>Maze game</h1>
      <p>Create a board by entering the size you want for Each box</p>
      <form onSubmit={handleSubmit} style={{ marginTop: "1.5rem" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="width">Please enter board width</label>
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
          <label htmlFor="height">Please enter board height</label>
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
          <button style={{ padding: "0.4rem" }}>Submit</button>
        </div>
      </form>
    </>
  );
}
