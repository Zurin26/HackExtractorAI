const { Container, Resource } = require("@azure/cosmos");
const DocumentBaseModel = require("../Models/Document");
const { QueryBuilder, getQueryString, getPageCount } = require("./Query");

/**
 * 
 * @param {Container} container Some Brrring DB Container
 * @param {QueryBuilder} builder Query builder
 * @param {boolean} sanitize Remove sensitive infos like, _self, _ts, _rid etc
 * 
 * 
 * @typedef {Object} QueryModel
 * @property {boolean} valid
 * @property {DocumentBaseModel | Array<DocumentBaseModel> | null} items
 * @property {boolean} hasMore
 * @property {null | number} pageCount
 * 
 * @return {QueryModel}
 * 
 */
const ContainerQuery = async (container, builder, sanitize = true) => {
  const queryObject = getQueryString(container, builder);
  if(!queryObject.valid) return queryObject;

  let result = builder?.firstOnly ? null : [];
  let hasMore = false;
  let pageCount = builder.pagination ? await getPageCount(container, builder.pagination, queryObject.str) : null;

  const queryIterator = container.items.query(queryObject.str, queryObject.options);
  if(queryIterator) {
    const itemList = await queryIterator.fetchAll();
    result = itemList.resources;
    hasMore = itemList.hasMoreResults;
    if(builder?.firstOnly && itemList.resources.length > 0) {
      result = itemList.resources[0];
      if(sanitize) result = _sanitizeRecord(result);
    } else if(sanitize) {
      result = sanitizeRecords(result);
    }
  }

  return {
    valid: true,
    items: result,
    query: queryObject.str,
    pageCount,
    hasMore,
  }
}

/**
 * 
 * @param {Resource} record Cosmos DB Document Item
 * 
 */
const _sanitizeRecord = (record) => Object.keys(record).filter(key => !key.startsWith('_')).reduce((sanitized, key) => ({ ...sanitized, [key]: record[key] }), {});

/**
 * 
 * @param {Array<Resource>} records Array of Cosmos DB Document Item
 * 
 */
const sanitizeRecords = (records = []) => {
  if(!Array.isArray(records)) {
    records = [records];
  }

  return records.map((record) => _sanitizeRecord(record));
}


module.exports = {
  ContainerQuery,
  sanitizeRecords
};