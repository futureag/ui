export const COUCHDB_AUTHENTICATION_REQUESTED =
  "COUCHDB_AUTHENTICATION_REQUESTED";
export const COUCHDB_AUTHENTICATION_SUCCEEDED =
  "COUCHDB_AUTHENTICATION_SUCCEEDED";
export const COUCHDB_AUTHENTICATION_FAILED = "COUCHDB_AUTHENTICATION_FAILED";

let loaded = false;

export const fetchCouchdbAuthentication = () => dispatch => {
  if (loaded) return;
  loaded = true;
  dispatch(couchdbAuthenticationRequested());
  fetch("http://OpenagBloom.ddns.net:5985/_session", {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ name: "webbhm", password: "admin" })
  })
    .then(response => {
      response.ok
        ? dispatch(couchdbAuthenticationSucceeded())
        : dispatch(couchdbAuthenticationFailed());
    })
    .catch(error => {
      dispatch(couchdbAuthenticationFailed());
    });
};

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
