const { COSMOS_CONFIG } = require("../Setup");
const { BrrringSetupDB } = require("./Config");
const { ContainerQuery } = require("./Document");
const { Pagination } = require("./Query");
const { EventsContainer } = require("./Containers");
const { connectors } = require("googleapis/build/src/apis/connectors");
const { getAllUser } = require("./User");
const { getEventParticipant } = require("./EventParticipants");

const getSpecificUserEvents = async (id) => {
  var getData = await ContainerQuery(EventsContainer, {
    conditionGroups: [
      {
        conditions: [
          {
            field: "CreatorID",
            expectedValue: id,
            comparisonType: "EQUALS",
          },
        ],
        ender: "AND",
      },
      {
        conditions: [
          {
            field: "Status",
            expectedValue: "I",
            comparisonType: "IS-NOT",
          },
        ],
      },
    ],
  });

  return getData;
};

const getSpecificEvent = async (id) => {
  var getData = await ContainerQuery(EventsContainer, {
    conditionGroups: [
      {
        conditions: [
          {
            field: "id",
            expectedValue: id,
            comparisonType: "EQUALS",
          },
          {
            field: "Status",
            expectedValue: "I",
            comparisonType: "IS-NOT",
          },
        ],
        connectors: "AND",
      },
    ],
  });

  const users = await getAllUser();
  const event = await getAllEvents();
  const eventParticipants = await getEventParticipant();
  const objData = [];

  getData.items.map((item) => {
    const objCommentorData = [];

    const userInfo = users.items.filter((user) => (item.CreatorID === user.id));


    if (item.Status == "A") {
      const eventParticipant = eventParticipants.items.filter(
        (adata) => adata.EventID === item.id
      );

      eventParticipant[0].Participants.map((bdata) => {
        if (bdata.Status === "A") {
          const userInfo = users.items.filter((user) => (bdata.UserID === user.id));

          
          bdata["participantInfo"] = userInfo[0];
          
          objCommentorData.push(bdata);
        }
      });
    }

    item["eventCreator"] = userInfo
    item["eventParticipants"] = objCommentorData;
    objData.push(item);
  });

  return objData;
};

const getAllEvents = async (id) => {
  var getData = await ContainerQuery(EventsContainer, {
    conditionGroups: [
      {
        conditions: [
          {
            field: "Status",
            expectedValue: "I",
            comparisonType: "IS-NOT",
          },
        ],
      },
    ],
    sorting: {
      sortBy: "CreatedTS",
      sortOrder: "DESC",
    },
  });

  return getData;
};

const checkEvent = async (id) => {
  var getData = await ContainerQuery(EventsContainer, {
    conditionGroups: [
      {
        conditions: [
          {
            field: "CreatorID",
            expectedValue: id,
            comparisonType: "EQUALS",
          },
        ],
        ender: "AND",
      },
      {
        conditions: [
          {
            field: "Status",
            expectedValue: "I",
            comparisonType: "IS-NOT",
          },
        ],
      },
    ],
    sorting: {
      sortBy: "CreatedTS",
      sortOrder: "DESC",
    },
  });

  return getData;
};

module.exports = {
  getSpecificUserEvents,
  getAllEvents,
  getSpecificEvent,
  checkEvent,
};
