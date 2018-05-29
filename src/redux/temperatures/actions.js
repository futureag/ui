import * as types from "./types.js";

const temperaturesRequested = () => {
  return {
    type: types.TEMPERATURES_REQUESTED
  };
};

const temperaturesRequestSucceeded = (items, bookmark) => {
  return {
    type: types.TEMPERATURES_REQUEST_SUCCEEDED,
    items: items,
    bookmark: bookmark
  };
};

const temperaturesRequestFailed = () => {
  return {
    type: types.TEMPERATURES_REQUEST_FAILED
  };
};

export {
  temperaturesRequested,
  temperaturesRequestSucceeded,
  temperaturesRequestFailed
};
