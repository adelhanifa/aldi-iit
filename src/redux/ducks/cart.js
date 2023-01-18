export const Types = {
  ADD_PRODUCT: "cart/ADD_PRODUCT",
  UPDATE_PRODUCT: "cart/UPDATE_PRODUCT",
  DELETE_PRODUCT: "cart/DELETE_PRODUCT",
};

const INITIAL_STATE = {
  list: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_PRODUCT:
      return {
        ...state,
        list: [...state.list, action.payload],
      };

    case Types.UPDATE_PRODUCT:
      const updatedList = [...state.list];
      const index = updatedList.findIndex((item) => item.id === action.payload.id);
      updatedList[index].quantity = action.payload.quantity;
      return {
        ...state,
        list: [...updatedList],
      };

    case Types.DELETE_PRODUCT:
      const deletedList = state.list.filter((item) => item.id !== action.payload);
      return {
        ...state,
        list: [...deletedList],
      };
    default:
      return state;
  }
}

export const Creators = {
  addProduct: (item) => {
    return (dispatch) => {
      dispatch({ type: Types.ADD_PRODUCT, payload: item });
    };
  },

  updateProduct: (item) => {
    return (dispatch) => {
      dispatch({ type: Types.UPDATE_PRODUCT, payload: item });
    };
  },

  deleteProduct: (item) => {
    return (dispatch) => {
      dispatch({ type: Types.DELETE_PRODUCT, payload: item });
    };
  },
};
