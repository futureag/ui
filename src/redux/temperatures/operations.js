import * as actions from "./actions.js";
import { temperaturesQuery } from "./query.js";

const fetchTemperatures = () => {
  return async dispatch => {
    dispatch(actions.temperaturesRequested());
    const response = await temperatures();
    const json = await response.json();

    if (response.ok) {
      dispatch(actions.temperaturesRequestSucceeded(json.docs, json.bookmark));
    } else {
      dispatch(actions.temperaturesRequestFailed());
    }
  };
};

const temperatures = () => {
  return fetch("https://OpenagBloom.ddns.net:6984/mvp_test/_find", {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(temperaturesQuery)
  });
};

export { fetchTemperatures };
