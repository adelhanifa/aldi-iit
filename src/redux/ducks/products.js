export const Types = {
  LOAD_PRODUCTS_REQUEST: "products/LOAD_PRODUCTS_REQUEST",
  LOAD_PRODUCTS_SUCCESS: "products/LOAD_PRODUCTS_SUCCESS",
  LOAD_PRODUCTS_NOT_SUCCESS: "products/LOAD_PRODUCTS_NOT_SUCCESS",
};

// Reducer
const INITIAL_STATE = {
  isLoading: false,
  products: [],
  error: false,
  errorMSG: "",
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.LOAD_PRODUCTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case Types.LOAD_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: action.payload,
        error: false,
        errorMSG: "",
      };

    case Types.LOAD_PRODUCTS_NOT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMSG: action.payload,
      };

    default:
      return state;
  }
}

export const Creators = {
  getproducts: () => {
    return async (dispatch) => {
      dispatch({ type: Types.LOAD_PRODUCTS_REQUEST });
      try {
        const response = await fetch(
          `https://63c10327716562671870f959.mockapi.io/products`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const result = await response.json();
        if (response.ok) {
          let list = [];
          result.map((item) => {
            const newItem = item;
            if (newItem.img) {
              newItem.image = item.img;
              delete newItem.img;
            }
            if (newItem._id) {
              newItem.id = item._id;
              delete newItem._id;
            }
            list.push(newItem);

            return item;
          });

          dispatch({ type: Types.LOAD_PRODUCTS_SUCCESS, payload: list });
        } else {
          dispatch({
            type: Types.LOAD_PRODUCTS_NOT_SUCCESS,
            payload: "response not ok",
          });
        }
        return response.ok;
      } catch (error) {
        dispatch({
          type: Types.LOAD_PRODUCTS_NOT_SUCCESS,
          payload: error,
        });
      }
    };
  },
};
