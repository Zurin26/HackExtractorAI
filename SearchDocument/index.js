const { getSASURL } = require("../SharedCode/Helpers/StorageAccount");
const { validateInput, generateValidator} = require("../SharedCode/Helpers/Input");
const { readDocumentData } = require("../SharedCode/Helpers/DocumentRecognizer");
const { ExtractedDataContainer } = require("../SharedCode/Cosmos/Containers");
const { getUnixTime } = require("date-fns");
const { searchData } = require("../SharedCode/Cosmos/ExtractData");

const schema = {
  type: "object",
  properties: {
      container: {type: "string"},
      keyword: {type: "string"}
  },
  required: ["container","keyword"],
  additionalProperties: false
}


module.exports = async function (context, req) {
  const request = await validateInput({
    req,
    validate: generateValidator(schema),
  });
  if (!request.valid) {
    context.res = {
      body: request,
    };
    return null;
  }
    const {container, keyword} = request.input
    const searchResult = await searchData(keyword,container)

  //   context.res = {
  //     body: {
  //       valid: true,
  //       data : searchResult
  //     },
  // };
    if(searchResult.length > 0){
        context.res = {
          body: {
            valid: true,
            data : searchResult
          },
      };
    }
    else{
      context.res = {
        body: {
          valid: false
        },
    };
    }
};
