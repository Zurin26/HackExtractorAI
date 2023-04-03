const { getSASURL, getAllBlobs } = require("../SharedCode/Helpers/StorageAccount");
const { validateInput, generateValidator} = require("../SharedCode/Helpers/Input");
const { readDocumentData } = require("../SharedCode/Helpers/DocumentRecognizer");

const schema = {
  type: "object",
  properties: {
      container: {type: "string"}
  },
  required: ["container"],
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
  const {filename, container} = request.input

  try {
    const getContainer = await getAllBlobs(container)

    return (context.res = {
          body: {
            valid: true,
            // sasurl : getsasurl,
            data : getContainer
          },
    });
  } catch (error) {
    return (
      context.res = {
      body: {
        valid: false,
        errorMsg : error,
      },
    });
  }
  
};
