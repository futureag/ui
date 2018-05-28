import * as types from "./types.js";

/* State Shape
{
  couchdbAuthentication: String
}
*/

const reducer = (state = { couchdbAuthentication: "notAsked" }, action) => {
  switch (action.type) {
    case types.COUCHDB_AUTHENTICATION_REQUESTED:
      return {
        couchdbAuthentication: "requested"
      };
    case types.COUCHDB_AUTHENTICATION_SUCCEEDED:
      return {
        couchdbAuthentication: "succeeded"
      };
    case types.COUCHDB_AUTHENTICATION_FAILED:
      return {
        couchdbAuthentication: "failed"
      };
    default:
      return state;
  }
};

export default reducer;
