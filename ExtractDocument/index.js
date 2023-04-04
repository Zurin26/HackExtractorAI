const { getSASURL } = require("../SharedCode/Helpers/StorageAccount");
const { validateInput, generateValidator} = require("../SharedCode/Helpers/Input");
const { readDocumentData } = require("../SharedCode/Helpers/DocumentRecognizer");
const { ExtractedDataContainer } = require("../SharedCode/Cosmos/Containers");
const { getUnixTime } = require("date-fns");

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
  let createdts = getUnixTime(new Date())
  // const listofblobs = ['02172023154219.pdf', '02172023154225.pdf', '6578c46be66851c32c8e41d5e092b536.jpg', 'John Michael Cayabyab Resume.pdf', 'sample1.png', 'sample2.png']
  const {filename, container} = request.input

    const getsasurl = await getSASURL(container,filename)
    const getDocumentData = await readDocumentData(getsasurl)

    if(getDocumentData.valid){
      await ExtractedDataContainer.items.create({
        Filename: filename,
        Pages: getDocumentData?.pages,
        Styles: getDocumentData?.styles,
        CreatedTS:createdts
    })
      return (context.res = {
        body: {
          valid: true,
          sasurl : getsasurl,
          data : {
            filename : filename,
            pages : getDocumentData.pages,
            styles : getDocumentData.styles
            // content : getDocumentData.content,
            // documents : getDocumentData.documents
          }
        },
    });
    }
    else{
      return (context.res = {
        body: {
          valid: false
        },
    });
    }
};
