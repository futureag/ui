import * as types from "./types.js";

/* State Shape
{
  items: Array,
  temperaturesRequest: String
}
*/

const reducer = (
  state = { items: [], temperaturesRequest: "notAsked" },
  action
) => {
  switch (action.type) {
    case types.TEMPERATURES_REQUESTED:
      return {
        temperaturesRequest: "requested"
      };
    case types.TEMPERATURES_REQUEST_SUCCEEDED:
      return {
        temperaturesRequest: "succeeded",
        items: action.payload.items
      };
    case types.TEMPERATURES_REQUEST_FAILED:
      return {
        ...state,
        temperaturesRequest: "failed"
      };
    default:
      return state;
  }
};

export default reducer;
