import * as actions from "./actions.js";

const fetchTemperatures = () => dispatch => {
  dispatch(actions.temperaturesRequested());
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
      dispatch(actions.temperaturesRequestSucceeded(json.docs, json.bookmark));
    })
    .catch(error => {
      dispatch(actions.temperaturesRequestFailed());
    });
};

export { fetchTemperatures };
