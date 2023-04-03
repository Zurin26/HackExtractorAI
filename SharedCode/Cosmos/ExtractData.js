const { COSMOS_CONFIG } = require("../Setup");
const { BrrringSetupDB } = require("./Config");
const { ContainerQuery } = require("./Document");
const { Pagination } = require("./Query");
const { ExtractedDataContainer } = require("./Containers");
const { getSASURL } = require("../Helpers/StorageAccount");

const searchData = async (keyword,container) => {
      var getData = await ContainerQuery(ExtractedDataContainer, {
              conditionGroups: [
                  {
                      conditions: [
                          {
                              field: 'Pages.pagesWord',
                              expectedValue: keyword,
                              comparisonType: 'INCLUDES'
                          },
                      ]
                  }
              ],
              sorting : {
                  sortBy: "CreatedTS",
                  sortOrder : "DESC"
              }
          })
          getData.items.map(data => {
            data["sasurl"] = getSASURL(container,data?.Filename);
         })
          return getData
    };

module.exports = {
    searchData
}