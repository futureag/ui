const temperaturesQuery = {
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
};

export { temperaturesQuery };
