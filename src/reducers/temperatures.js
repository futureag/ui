import {
  TEMPERATURES_REQUESTED,
  TEMPERATURES_REQUEST_SUCCEEDED,
  TEMPERATURES_REQUEST_FAILED
} from "../actions/temperatures.js";

const temperatures = (
  state = { items: [], temperaturesRequest: "notAsked" },
  action
) => {
  switch (action.type) {
    case TEMPERATURES_REQUESTED:
      return {
        temperaturesRequest: "requested"
      };
    case TEMPERATURES_REQUEST_SUCCEEDED:
      return {
        temperaturesRequest: "succeeded",
        items: action.items
      };
    case TEMPERATURES_REQUEST_FAILED:
      return {
        temperaturesRequest: "failed"
      };
    default:
      return state;
  }
};

export default temperatures;
