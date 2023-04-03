const { COSMOS_CONFIG } = require('../Setup');

const CosmosClient = require('@azure/cosmos').CosmosClient;

const HEAICosmosClient = new CosmosClient({ endpoint: COSMOS_CONFIG.endpoint, key: COSMOS_CONFIG.key });

const HEAIDB = HEAICosmosClient.database(COSMOS_CONFIG.databases.container.name);
// const HCSetupDB = HCCosmosClient.database(COSMOS_CONFIG.databases.setupDB.name);
// const HCTransDB = HCCosmosClient.database(COSMOS_CONFIG.databases.transactionDB.name);

module.exports = {
  HEAICosmosClient,
  HEAIDB,
  // HCSetupDB,
  // HCTransDB
};