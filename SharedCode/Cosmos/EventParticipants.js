const { COSMOS_CONFIG } = require("../Setup");
const { BrrringSetupDB } = require("./Config");
const { ContainerQuery } = require("./Document");
const { EventParticipantsContainer } = require("./Containers");

const getSpecificEventParticipant = async (id) => {
  var getData = await ContainerQuery(EventParticipantsContainer, {
    conditionGroups: [
      {
        conditions: [
          {
            field: "EventID",
            expectedValue: id,
            comparisonType: "EQUALS",
          },
        ],
      }
  ],
});

  return getData;
};

const getEventParticipant = async () => {
  var getData = await ContainerQuery(EventParticipantsContainer, {
    
});

  return getData;
};



const checkEventParticipant = async (id) => {
  var getData = await ContainerQuery(EventParticipantsContainer, {
    conditionGroups: [
      {
        conditions: [
          {
            field: "EventID",
            expectedValue: id,
            comparisonType: "EQUALS",
          },
        ],
      }
  ],
});

  return getData;
};

const checkEventActiveParticipant = async (id) => {
  var getData = await ContainerQuery(EventParticipantsContainer, {
    conditionGroups: [
      {
        conditions: [
          {
            field: "EventID",
            expectedValue: eventId,
            comparisonType: "EQUALS",
          },
          {
            field: 'UserID',
            expectedValue: userId,
            comparisonType: 'IS-NOT'
        },
        {
          field: 'Status',
          expectedValue: 'I',
          comparisonType: 'IS-NOT'
      },
        ],
        connectors: 'AND'
      }
  ],
});

  return getData;
};




module.exports = {
  getSpecificEventParticipant,
  checkEventParticipant,
  checkEventActiveParticipant,
  getEventParticipant
};
