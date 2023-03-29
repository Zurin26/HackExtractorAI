var storage = require("@azure/storage-blob")
const { validateInput, generateValidator } = require("../SharedCode/Helpers/Input");

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
    const request = await validateInput({req, validate: generateValidator(schema) });
    if(!request.valid) {
        context.res = {
            body: request
        };
        return null;
    }

    const accountname =process.env.BLOB_ACCOUNT_NAME;
    const key = process.env.BLOB_ACCOUNT_KEY;
    const cerds = new storage.StorageSharedKeyCredential(accountname,key);
    const blobServiceClient = new storage.BlobServiceClient(`https://${accountname}.blob.core.windows.net`,cerds);
    const containerName=request.input.container;
    const client =blobServiceClient.getContainerClient(containerName)
    const blobName=request.input.filename;
    const blobClient = client.getBlobClient(blobName);

    const blobSAS = storage.generateBlobSASQueryParameters({
        containerName, 
        blobName, 
        permissions: storage.BlobSASPermissions.parse("racwd"), 
        startsOn: new Date(),
        expiresOn: new Date(new Date().valueOf() + 86400)
        },
        cerds 
    ).toString();

    const sasUrl= blobClient.url+"?"+blobSAS;
    context.res = {
        body: sasUrl
    };
}