const { getSASURL } = require("../SharedCode/Helpers/StorageAccount");
const { validateInput, generateValidator} = require("../SharedCode/Helpers/Input");
const { readDocumentData } = require("../SharedCode/Helpers/DocumentRecognizer");

const schema = {
  type: "object",
  properties: {
      container: {type: "string"},
      filename: {type: "string"}
  },
  required: ["container", "filename"],
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
    const getsasurl = await getSASURL(container,filename)
    const getDocumentData = await readDocumentData(getsasurl)
    return (context.res = {
          body: {
            valid: true,
            sasurl : getsasurl,
            data : {
              pages : getDocumentData.pages,
              styles : getDocumentData.styles,
              content : getDocumentData.content,
              documents : getDocumentData.documents
            }
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
