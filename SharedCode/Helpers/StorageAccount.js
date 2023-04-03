var storage = require("@azure/storage-blob")

function getSASURL(containerName,filename){
    const accountname =process.env.BLOB_ACCOUNT_NAME;
    const key = process.env.BLOB_ACCOUNT_KEY;
    const cerds = new storage.StorageSharedKeyCredential(accountname,key);
    const blobServiceClient = new storage.BlobServiceClient(`https://${accountname}.blob.core.windows.net`,cerds);
    // const containerName=container;
    const client =blobServiceClient.getContainerClient(containerName)
    // const blobName=filename;
    const blobClient = client.getBlobClient(filename);

    const blobSAS = storage.generateBlobSASQueryParameters({
        containerName, 
        filename, 
        permissions: storage.BlobSASPermissions.parse("racwd"), 
        startsOn: new Date(),
        expiresOn: new Date(new Date().valueOf() + 86400)
        },
        cerds 
    ).toString();

    const sasUrl= blobClient.url+"?"+blobSAS;
    return sasUrl
}

async function getAllBlobs(containerName){
    const accountname =process.env.BLOB_ACCOUNT_NAME;
    const key = process.env.BLOB_ACCOUNT_KEY;
    const cerds = new storage.StorageSharedKeyCredential(accountname,key);
    const blobServiceClient = new storage.BlobServiceClient(`https://${accountname}.blob.core.windows.net`,cerds);
    // const containerName=container;
    const client =blobServiceClient.getContainerClient(containerName)

    // const getAllBlobs = client.listBlobsFlat()
    const listOfAllBlobs = []
    let i = 1;
    for await (const blob of client.listBlobsFlat()) {
    // console.log(`Blob ${i++}: ${blob.name}`);
    listOfAllBlobs.push(blob.name)
    i++;
    }
    // const blobName=filename;
    // const blobClient = client.getBlobClient(filename);

    // const blobSAS = storage.generateBlobSASQueryParameters({
    //     containerName, 
    //     filename, 
    //     permissions: storage.BlobSASPermissions.parse("racwd"), 
    //     startsOn: new Date(),
    //     expiresOn: new Date(new Date().valueOf() + 86400)
    //     },
    //     cerds 
    // ).toString();

    // const sasUrl= blobClient.url+"?"+blobSAS;
    return listOfAllBlobs
}

module.exports = {
    getSASURL,
    getAllBlobs
}