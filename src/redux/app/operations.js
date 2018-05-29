import * as types from "./types.js";

const navigate = path => dispatch => {
  // Extract the page name from path.
  const page = path === "/" ? "view1" : path.slice(1);

  // Any other info you might want to extract from the path (like page type),
  // you can do here
  dispatch(loadPage(page));

  // Close the drawer - in case the *path* change came from a link in the drawer.
  dispatch(updateDrawerState(false));
};

const loadPage = page => async dispatch => {
  switch (page) {
    case "view1":
      await import("../../components/marsfarm-view1.js");
      // Put code here that you want it to run every time when
      // navigate to view1 page and my-view1.js is loaded
      break;
    default:
      page = "view404";
      await import("../../components/marsfarm-view404.js");
  }

  dispatch(updatePage(page));
};

const updatePage = page => {
  return {
    type: types.UPDATE_PAGE,
    page
  };
};

let snackbarTimer;

const showSnackbar = () => dispatch => {
  dispatch({
    type: types.OPEN_SNACKBAR
  });
  clearTimeout(snackbarTimer);
  snackbarTimer = setTimeout(
    () => dispatch({ type: types.CLOSE_SNACKBAR }),
    3000
  );
};

const updateOffline = offline => (dispatch, getState) => {
  // Show the snackbar, unless this is the first load of the page.
  if (getState().app.offline !== undefined) {
    dispatch(showSnackbar());
  }
  dispatch({
    type: types.UPDATE_OFFLINE,
    offline
  });
};

const updateLayout = wide => (dispatch, getState) => {
  if (getState().app.drawerOpened) {
    dispatch(updateDrawerState(false));
  }
};

const updateDrawerState = opened => (dispatch, getState) => {
  if (getState().app.drawerOpened !== opened) {
    dispatch({
      type: types.UPDATE_DRAWER_STATE,
      opened
    });
  }
};

export {
  navigate,
  updatePage,
  showSnackbar,
  updateOffline,
  updateLayout,
  updateDrawerState
};
