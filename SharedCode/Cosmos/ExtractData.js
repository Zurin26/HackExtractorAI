const { COSMOS_CONFIG } = require("../Setup");
const { BrrringSetupDB } = require("./Config");
const { ContainerQuery } = require("./Document");
const { Pagination } = require("./Query");
const { ExtractedDataContainer } = require("./Containers");
const { getSASURL } = require("../Helpers/StorageAccount");

const searchData = async (keyword,container) => {
    const listofdata = [];
    var getData = await ContainerQuery(ExtractedDataContainer, {
            //   conditionGroups: [
            //       {
            //           conditions: [
            //               {
            //                   field: 'Pages.pagesWord',
            //                   expectedValue: keyword,
            //                   comparisonType: 'INCLUDES'
            //               },
            //           ]
            //       }
            //   ],
            sorting : {
                sortBy: "CreatedTS",
                sortOrder : "DESC"
            }
        })
          getData.items.map((item) => {
            item.Pages.pagesWord.find((data) => {
                if(data.toLowerCase().includes(keyword.toLowerCase()))
                {
                    // const checkFilename = listofdata.find()
                    listofdata.push(item);
                }
            })
          })
        // const newList = [...new Map(listofdata.map(v => [v.Filename, v])).values()]
        listofdata.map(data => {
            data["sasurl"] = getSASURL(container,data?.Filename);
        })
        let newList = [...new Set(listofdata)];
        return newList
};

module.exports = {
    searchData
}