const { COSMOS_CONFIG } = require('../Setup');

const CosmosClient = require('@azure/cosmos').CosmosClient;

const HCCosmosClient = new CosmosClient({ endpoint: COSMOS_CONFIG.endpoint, key: COSMOS_CONFIG.key });

const HCUserDB = HCCosmosClient.database(COSMOS_CONFIG.databases.userDB.name);
const HCSetupDB = HCCosmosClient.database(COSMOS_CONFIG.databases.setupDB.name);
const HCTransDB = HCCosmosClient.database(COSMOS_CONFIG.databases.transactionDB.name);

module.exports = {
  HCCosmosClient,
  HCUserDB,
  HCSetupDB,
  HCTransDB
};