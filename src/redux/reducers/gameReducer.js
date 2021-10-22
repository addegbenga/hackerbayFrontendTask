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
  position: [],
  spritePosition: [],
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
    case "POSITION":
      return {
        ...state,
        position: action.payload,
      };
    case "SPRITE_POSITION":
      return {
        ...state,
        spritePosition: [...state.spritePosition, action.payload],
      };
    default:
      return state;
  }
};
