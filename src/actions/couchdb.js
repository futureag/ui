export const COUCHDB_AUTHENTICATION_REQUESTED =
  "COUCHDB_AUTHENTICATION_REQUESTED";
export const COUCHDB_AUTHENTICATION_SUCCEEDED =
  "COUCHDB_AUTHENTICATION_SUCCEEDED";
export const COUCHDB_AUTHENTICATION_FAILED = "COUCHDB_AUTHENTICATION_FAILED";

let loaded = false;
export function fetchCouchdbAuthentication() {
  return async dispatch => {
    if (loaded) return;
    loaded = true;
    dispatch(couchdbAuthenticationRequested());
    const response = await couchdbAuth();
    response.ok
      ? dispatch(couchdbAuthenticationSucceeded())
      : dispatch(couchdbAuthenticationFailed());
  };
}

export function couchdbAuth() {
  return fetch(`http://OpenagBloom.ddns.net:5985/_session`, {
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    credentials: "include",
    method: "POST",
    body: JSON.stringify({ name: "webbhm", password: "admin" })
  });
}

export const couchdbAuthenticationRequested = () => {
  return {
    type: COUCHDB_AUTHENTICATION_REQUESTED
  };
};

export const couchdbAuthenticationSucceeded = () => {
  return {
    type: COUCHDB_AUTHENTICATION_SUCCEEDED
  };
};

export const couchdbAuthenticationFailed = () => {
  return {
    type: COUCHDB_AUTHENTICATION_FAILED
  };
};
