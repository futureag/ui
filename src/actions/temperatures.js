export const TEMPERATURES_REQUESTED = "TEMPERATURES_REQUESTED";
export const TEMPERATURES_REQUEST_SUCCEEDED = "TEMPERATURES_REQUEST_SUCCEEDED";
export const TEMPERATURES_REQUEST_FAILED = "TEMPERATURES_REQUEST_FAILED";

export const fetchTemperatures = () => dispatch => {
  dispatch(temperaturesRequested);
  fetch("http://OpenagBloom.ddns.net:5985/mvp_test/_find", {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      selector: {
        "start_date.timestamp": {
          $gt: ""
        },
        "status.status_qualifier": {
          $eq: "Success"
        },
        activity_type: {
          $eq: "Environmental_Observation"
        },
        "subject.name": {
          $eq: "Air"
        },
        "subject.location.name": {
          $eq: "Left_Side"
        },
        "subject.attribute.name": {
          $eq: "Temperature"
        }
      },
      fields: ["start_date.timestamp", "subject.attribute.value"],
      sort: [
        {
          "start_date.timestamp": "desc"
        }
      ],
      limit: 72
    })
  })
    .then(res => res.json())
    .then(json => {
      dispatch(temperaturesRequestSucceeded(json.docs, json.bookmark));
    })
    .catch(error => {
      dispatch(temperaturesRequestFailed());
    });
};

export const temperaturesRequested = () => {
  return {
    type: TEMPERATURES_REQUESTED
  };
};

export const temperaturesRequestSucceeded = (items, bookmark) => {
  return {
    type: TEMPERATURES_REQUEST_SUCCEEDED,
    items: items,
    bookmark: bookmark
  };
};

export const temperaturesRequestFailed = () => {
  return {
    type: TEMPERATURES_REQUEST_FAILED
  };
};
