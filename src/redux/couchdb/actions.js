import * as types from "./types";

const couchdbAuthenticationRequested = () => {
  return {
    type: types.COUCHDB_AUTHENTICATION_REQUESTED
  };
};

const couchdbAuthenticationSucceeded = () => {
  return {
    type: types.COUCHDB_AUTHENTICATION_SUCCEEDED
  };
};

const couchdbAuthenticationFailed = () => {
  return {
    type: types.COUCHDB_AUTHENTICATION_FAILED
  };
};

export {
  couchdbAuthenticationRequested,
  couchdbAuthenticationSucceeded,
  couchdbAuthenticationFailed
};
