import * as actions from "./actions.js";

let loaded = false;
const fetchCouchdbAuthentication = () => {
  return async dispatch => {
    if (loaded) return;
    loaded = true;
    dispatch(actions.couchdbAuthenticationRequested());
    const response = await couchdbAuth();
    response.ok
      ? dispatch(actions.couchdbAuthenticationSucceeded())
      : dispatch(actions.couchdbAuthenticationFailed());
  };
};

const couchdbAuth = () => {
  return fetch(`https://OpenagBloom.ddns.net:6984/_session`, {
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    credentials: "include",
    method: "POST",
    body: JSON.stringify({ name: "webbhm", password: "admin" })
  });
};

export { fetchCouchdbAuthentication, couchdbAuth };
