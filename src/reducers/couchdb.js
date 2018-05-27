import {
  COUCHDB_AUTHENTICATION_REQUESTED,
  COUCHDB_AUTHENTICATION_SUCCEEDED,
  COUCHDB_AUTHENTICATION_FAILED
} from "../actions/couchdb.js";

const couchdb = (state = { couchdbAuthentication: "notAsked" }, action) => {
  switch (action.type) {
    case COUCHDB_AUTHENTICATION_REQUESTED:
      return {
        couchdbAuthentication: "requested"
      };
    case COUCHDB_AUTHENTICATION_SUCCEEDED:
      return {
        couchdbAuthentication: "succeeded"
      };
    case COUCHDB_AUTHENTICATION_FAILED:
      return {
        couchdbAuthentication: "failed"
      };
    default:
      return state;
  }
};

export default couchdb;
