const { COSMOS_CONFIG } = require("../Setup");
const { HEAIDB } = require("./Config");
const { ContainerQuery } = require("./Document");
const { Pagination } = require("./Query");


const ExtractedDataContainer = HEAIDB.container(COSMOS_CONFIG.databases.container.containers.ai.extractedData);


module.exports = {
  ExtractedDataContainer
}