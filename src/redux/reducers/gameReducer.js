const initialState = {
  boardWidth: 0,
  boardHeight: 0,
  innerBoxHeight: 30,
  innerBoxWidth: 30,
  vertical: 0,
  horizontal: 0,
  boxWidthArray: [],
  boxHeightArray: [],
  random: [],
  sprites: [],
  check: true,
};

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FORM_SUBMIT":
      return {
        ...state,
        boardWidth: action.payload.width,
        boardHeight: action.payload.height,
        boxWidthArray: Array(Number(action.payload.width)).fill("box"),
        boxHeightArray: Array(Number(action.payload.height)).fill("box"),
        sprites: Array(Number(action.payload.width))
          .fill(null)
          .map((name) => Math.floor(Math.random() * action.payload.width) * 30),
      };

    case "MOVE_RIGHT":
      return {
        ...state,
        horizontal: (state.horizontal += 1),
      };
    case "RANDOM":
      return {
        ...state,
        random: Math.floor(Math.random() * action.payload) * 30,
        check: false,
      };

    default:
      return state;
  }
};
