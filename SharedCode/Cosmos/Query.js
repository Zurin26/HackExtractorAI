const { Container, FeedOptions } = require("@azure/cosmos");

/**
 * 
 * @param {number} start Start of Range
 * @param {number} end End of Range
 * 
 */
function BetweenRange(start, end) {
  this.start = start;
  this.end = end;
}

/** Jason Cruz
 *  Check if value is a valid BetweenRange Object
 * 
 * @param {BetweenRange} value A valid BetweenRange Object
 * 
 */
const isValidBetweenRange = (value) => typeof value?.start === 'number' && typeof value?.end === 'number';

/** Jason Cruz
 * 
 * @param {string} field Field Name to compare
 * @param {BetweenRange | string | boolean | number | Date | undefined | null} expectedValue Value that will be compare to Field Value
 * @param {'EQUALS' | 'CONTAINS' | 'ONE-OF' | 'INCLUDES' | 'IS-NOT' | 'IS-DEFINED' | 'IS-NOT-DEFINED' | 'LESSER' | 'GREATER' | 'LESSER-EQUAL' | 'GREATER-EQUAL' | 'BETWEEN' |'BETWEEN-START' |'BETWEEN-END' |'BETWEEN-BOTH'} comparisonType Type of comparison
  Comparison Type Definitions
  EQUALS: State that item field value is equal to the expected value
  CONTAINS: State that the expected value is a substring of the item field value: (STRING ONLY)
  ONE-OF: State that the expected value must contain the item field value
  INCLUDES: State that the item field value must contain the expected value
  IS-NOT: State that the item field value is not equal to the expected value 
  IS-DEFINED: State that the item field value is defined
  IS-NOT-DEFINED: State that the item field value is not defined
  LESSER: State that the item field value is less than the expected value: (NUMBER ONLY)
  GREATER: State that the item field value is greater than the expected value: (NUMBER ONLY)
  LESSER-EQUAL: State that the item field value is less than or equal to the expected value: (NUMBER ONLY)
  GREATER-EQUAL: State that the item field value is greater than or equal to the expected value: (NUMBER ONLY)
  BETWEEN: State that the item field value is between the expected values, ie. (EXPECTED_START < FIELD_VALUE < EXPECTED_END): (NUMBER ONLY)
  BETWEEN-START: State that the item field value is between the expected values including the start value, ie. (EXPECTED_START <= FIELD_VALUE < EXPECTED_END): (NUMBER ONLY)
  BETWEEN-END: State that the item field value is between the expected values including the end value, ie. (EXPECTED_START < FIELD_VALUE <= EXPECTED_END): (NUMBER ONLY)
  BETWEEN-BOTH: State that the item field value is between the expected values including both the start and end value, ie. (EXPECTED_START <= FIELD_VALUE <= EXPECTED_END): (NUMBER ONLY)
 * @param {boolean} caseSensitive Case insensitive for string fields
 * @param {boolean} forceString Force string for expected value
 * 
 */
function QueryCondition(field, expectedValue, comparisonType, caseSensitive = false, forceString = false) {
  this.field = field; 
  this.expectedValue = expectedValue;
  this.comparisonType = comparisonType;
  this.caseSensitive = caseSensitive;
  this.forceString = forceString;
}

/**
 * 
 * @param {Array<QueryCondition>} conditions Array of Query Conditions
 * @param {'AND' | 'OR'} connectors Type of connector for each condition
 * @param {'AND' | 'OR' =} ender Type of connector if this Condition Group has next Condition Group
 * 
 */
function QueryConditionGroup(conditions, connectors, ender) {
  this.conditions = conditions;
  this.connectors = connectors;
  this.ender = ender;
}

/**
 * 
 * @param {number} pageNumber Page Number
 * @param {number} pageSize Page Size
 * 
 */
function Pagination(pageNumber, pageSize) {
  this.pageNumber = pageNumber;
  this.pageSize = pageSize;
}

/**
 * 
 * @param {Pagination} pagination A valid pagination object
 * 
 */
const cleansePagination = (pagination) => {
  if(pagination?.pageNumber && pagination?.pageSize) {
    if(typeof pagination?.pageNumber === 'number' && typeof pagination?.pageSize === 'number') {
      const pageNumber = Math.floor(pagination.pageNumber);
      const pageSize = Math.floor(pagination.pageSize);
      if(pageNumber > 0) {
        if(pageSize > 0) {
          return {
            valid: true,
            pageNumber,
            pageSize,
          }
        }
        return {
          valid: false,
          errorCode: 'INVALID_PAGINATION',
          errorMsg: 'Page size must be atleast 1'
        }
      }
      return {
        valid: false,
        errorCode: 'INVALID_PAGINATION',
        errorMsg: 'Page number must be atleast 1'
      }
    }
    return {
      valid: false, 
      errorCode: 'INVALID_PAGINATION',
      errorMsg: 'Page number and page size must be a number'
    }
  }
  return {
    valid: false, 
    errorCode: 'INVALID_PAGINATION',
    errorMsg: 'Specify page number and page size'
  }
};


/**
 * 
 * @param {string} sortBy Sort items by field this field name
 * @param {'ASC' | 'DESC'} sortOrder Sorting order
 * 
 */
function Sorting(sortBy, sortOrder = 'ASC') {
  this.sortBy = sortBy;
  this.sortOrder = sortOrder;
}

/**
 * 
 * @param {Sorting} sorting A valid sorting object
 * 
 */
const isValidSorting = (sorting) => {
  if(sorting?.sortBy && sorting?.sortOrder) {
    if(typeof sorting.sortBy === 'string') {
      if(['ASC', 'DESC'].includes(sorting.sortOrder)) {
        return { valid: true }
      }
      return {
        valid: false, 
        errorCode: 'INVALID_SORTING',
        errorMsg: "Sort order must be 'ASC' or 'DESC'"
      }
    }
    return {
      valid: false, 
      errorCode: 'INVALID_SORTING',
      errorMsg: 'Sort by must be a string'
    }
  }
  return {
    valid: false, 
    errorCode: 'INVALID_SORTING',
    errorMsg: 'Specify sort by and sort order'
  }
};

/**
 * 
 * @param {Array<QueryConditionGroup> | QueryConditionGroup} conditionGroups
 * @param {Pagination} pagination
 * @param {Sorting} sorting
 * @param {FeedOptions} options
 * @param {boolean} firstOnly
 * 
 */
function QueryBuilder(conditionGroups = [], pagination = null, sorting = null, options = null, firstOnly = false) {
  this.conditionGroups = conditionGroups;
  this.pagination = pagination;
  this.sorting = sorting;
  this.options = options;
  this.firstOnly = firstOnly;
}

/**
 * 
 * @param {string} fieldWithSymbol
 * @param {BetweenRange | string | boolean | number | Date | undefined | null} expectedValue Value that will be compare to Field Value
 * @param {'EQUALS' | 'CONTAINS' | 'ONE-OF' | 'INCLUDES' | 'IS-NOT' | 'IS-DEFINED' | 'IS-NOT-DEFINED' | 'LESSER' | 'GREATER' | 'LESSER-EQUAL' | 'GREATER-EQUAL' | 'BETWEEN' |'BETWEEN-START' | 'BETWEEN-END' |'BETWEEN-BOTH'} comparisonType Type of comparison
  Comparison Type Definitions
  EQUALS: State that item field value is equal to the expected value
  CONTAINS: State that the expected value is a substring of the item field value: (STRING ONLY)
  ONE-OF: State that the expected value must contain the item field value
  INCLUDES: State that the item field value must contain the expected value
  IS-NOT: State that the item field value is not equal to the expected value 
  IS-DEFINED: State that the item field value is defined
  IS-NOT-DEFINED: State that the item field value is not defined
  LESSER: State that the item field value is less than the expected value: (NUMBER ONLY)
  GREATER: State that the item field value is greater than the expected value: (NUMBER ONLY)
  LESSER-EQUAL: State that the item field value is less than or equal to the expected value: (NUMBER ONLY)
  GREATER-EQUAL: State that the item field value is greater than or equal to the expected value: (NUMBER ONLY)
  BETWEEN: State that the item field value is between the expected values, ie. (EXPECTED_START < FIELD_VALUE < EXPECTED_END): (NUMBER ONLY)
  BETWEEN-START: State that the item field value is between the expected values including the start value, ie. (EXPECTED_START <= FIELD_VALUE < EXPECTED_END): (NUMBER ONLY)
  BETWEEN-END: State that the item field value is between the expected values including the end value, ie. (EXPECTED_START < FIELD_VALUE <= EXPECTED_END): (NUMBER ONLY)
  BETWEEN-BOTH: State that the item field value is between the expected values including both the start and end value, ie. (EXPECTED_START <= FIELD_VALUE <= EXPECTED_END): (NUMBER ONLY)
 * @param {boolean} caseSensitive Case insensitive for string fields
 * 
 */
function getConditionClause(fieldWithSymbol, expectedValue, comparisonType, caseSensitive = false, forceString = false) {
  let result = '';
  let isExpectedValueString = typeof expectedValue === 'string';
  let isExpectedValueNumber = typeof expectedValue === 'number';
  let isExpectedValueArray = Array.isArray(expectedValue);
  let stringifiedExpectedValue = `'${expectedValue}'`;
  switch(comparisonType) {
    case "EQUALS":
      if(isExpectedValueString) {
        if(caseSensitive) {
          result = `${fieldWithSymbol} = ${stringifiedExpectedValue}`;
        } else {
          result = `LOWER(${fieldWithSymbol}) = ${stringifiedExpectedValue.toLowerCase()}`;
        }
      } else {
        result = `${fieldWithSymbol} = ${expectedValue}`;
      }
      break;
    case "CONTAINS":
      if(isExpectedValueString) {
        result = `CONTAINS(${fieldWithSymbol}, ${stringifiedExpectedValue}, ${caseSensitive ? 'false' : 'true'})`;
        break;
      }
      return {
        valid: false,
        errorCode: 'INVALID_CONTAINS_COMPARISON',
        errorMsg: 'Use of "CONTAINS" comparison to a not string value'
      }
    case "ONE-OF":
      if(isExpectedValueArray) {
        let arrayedExpectedValue = `[${expectedValue.join(', ')}]`;
        if(forceString) {
          arrayedExpectedValue = `['${expectedValue.join("', '")}']`
        }
        result = `ARRAY_CONTAINS(${arrayedExpectedValue}, ${fieldWithSymbol}, true)`;
        break;
      }
      return {
        valid: false,
        errorCode: 'INVALID_ONE-OF_COMPARISON',
        errorMsg: 'Use of "ONE-OF" comparison to a not array value'
      }
    case "INCLUDES":
      if(isExpectedValueString) {
        result = `ARRAY_CONTAINS(${fieldWithSymbol}, ${stringifiedExpectedValue}, true)`;
        break;
      } else {
        result = `ARRAY_CONTAINS(${fieldWithSymbol}, ${expectedValue}, true)`;
        break;
      }
    case "IS-NOT":
      if(isExpectedValueString) {
        result = `${fieldWithSymbol} != ${stringifiedExpectedValue}`;
      } else {
        result = `${fieldWithSymbol} != ${expectedValue}`;
      }
      break;
    case "IS-DEFINED":
      result = `IS_DEFINED(${fieldWithSymbol})`;
      break;
    case "IS-NOT-DEFINED":
      result = `NOT IS_DEFINED(${fieldWithSymbol})`;
      break;
    case "LESSER":
      if(isExpectedValueNumber) {
        result = `${fieldWithSymbol} < ${expectedValue}`;
        break;
      }
    case "GREATER":
      if(isExpectedValueNumber) {
        result = `${fieldWithSymbol} > ${expectedValue}`;
        break;
      }
    case "LESSER-EQUAL":
      if(isExpectedValueNumber) {
        result = `${fieldWithSymbol} <= ${expectedValue}`;
        break;
      }
    case "GREATER-EQUAL":
      if(isExpectedValueNumber) {
        result = `${fieldWithSymbol} >= ${expectedValue}`;
        break;
      }
      return {
        valid: false,
        errorCode: `INVALID_${comparisonType}_COMPARISON`,
        errorMsg: `Use of "${comparisonType}" comparison to an invalid number value`
      }
    case "BETWEEN":
      if(isValidBetweenRange(expectedValue)) {
        result = `${fieldWithSymbol} > ${expectedValue.start} AND ${fieldWithSymbol} < ${expectedValue.end}`;
        break;
      }
    case "BETWEEN-START":
      if(isValidBetweenRange(expectedValue)) {
        result = `${fieldWithSymbol} >= ${expectedValue.start} AND ${fieldWithSymbol} < ${expectedValue.end}`;
        break;
      }
    case "BETWEEN-END":
      if(isValidBetweenRange(expectedValue)) {
        result = `${fieldWithSymbol} > ${expectedValue.start} AND ${fieldWithSymbol} <= ${expectedValue.end}`;
        break;
      }
    case "BETWEEN-BOTH":
      if(isValidBetweenRange(expectedValue)) {
        result = `${fieldWithSymbol} >= ${expectedValue.start} AND ${fieldWithSymbol} <= ${expectedValue.end}`;
        break;
      }
      return {
        valid: false,
        errorCode: `INVALID_${comparisonType}_COMPARISON`,
        errorMsg: `Use of "${comparisonType}" comparison to an invalid BetweenRange value`
      }
    default:
      return {
        valid: false,
        errorCode: 'UNKNOWN_CONDITION',
        errorMsg: `Use of unknown comparison: "${comparisonType}"`
      }
  }
  return {
    valid: true,
    str: result,
  };
}

/**
 * 
 * @param {Array<QueryConditionGroup> | QueryConditionGroup} groupConditions
 * @param {string} containerSymbol
 * @param {string} partitionKey
 * 
 */
const getWhereClause = (groupConditions, containerSymbol, partitionKey) => {
  let result = '';
  let partitionFound = false;
  let isValid = true;
  let conditionClauseError = null;
  if(!Array.isArray(groupConditions)) {
    if(groupConditions) {
      groupConditions = [groupConditions];
    } else {
      groupConditions = [];
    }
  }
  if(groupConditions.length > 0) {
    result = groupConditions.reduce((whereStr, groupCondition, groupIdx) => {
      // const { conditions} = groupCondition;
      if(!isValid) return '';
      const enderConnector = groupCondition.ender || 'AND';
      return whereStr += groupCondition.conditions.reduce((conditonStr, condition, conditionIdx) => {
        if(!isValid) return '';
        if(!partitionFound && partitionKey) {
          partitionFound = partitionKey === condition.field;
        }
        const fieldWithSymbol = `${containerSymbol}.${condition.field}`;
        const conditionClause = getConditionClause(fieldWithSymbol, condition.expectedValue, condition.comparisonType, condition.caseSensitive, condition.forceString);
        if(!conditionClause.valid) {
          conditionClauseError = conditionClause;
          isValid = false;
          return;
        }
        return `${conditonStr} ${conditionClause.str} ${conditionIdx + 1 === groupCondition.conditions.length ? ')' + (groupIdx < groupConditions.length - 1 ? ' ' + enderConnector : '') : (groupCondition.connectors || 'AND') } `;

      }, '(');
    }, 'WHERE ');
  }
  if(!isValid) return conditionClauseError;

  return {
    str: result,
    valid: true,
    partitionFound,
  };
}

/**
 * 
 * @param {Pagination} pagination A pagination object 
 * @param {boolean} firstOnly Determines if the record will return 1 record only 
 * 
 */
const getPaginationClause = (pagination, firstOnly = false) => {
  let result = '';
  if(firstOnly) {
    result = 'OFFSET 0 limit 1';
  } else if(pagination) {
    const paginationCleansed = cleansePagination(pagination);
    if(!paginationCleansed.valid) return paginationCleansed;

    result = `OFFSET ${(pagination.pageNumber - 1) * paginationCleansed.pageSize} LIMIT ${paginationCleansed.pageSize} `;
  }

  return {
    str: result,
    valid: true,
  }
}

/**
 * 
 * @param {Sorting} sorting A sorting object 
 * @param {string} containerSymbol Prefix of the container 
 * 
 */
const getSortingClause = (sorting, containerSymbol) => {
  let result = '';
  if(sorting) {
    const isSortingValid = isValidSorting(sorting);
    if(!isSortingValid.valid) return isSortingValid;
  
    result = `ORDER BY ${containerSymbol}.${sorting.sortBy} ${sorting.sortOrder} `;
  }

  return {
    str: result,
    valid: true,
  }
}

/**
 * 
 * @param {Container} container
 * @param {QueryBuilder} builder
 * @param {string} partitionKey
 * 
 */
const getQueryString = (container, builder, partitionKey = 'region') => {
  let result = '';
  const containerName = container.id;
  const containerSymbol = containerName.charAt(0).toLowerCase();
  // let partitionFound = false;
  let feedOptions = builder.options;
  result = `SELECT * FROM ${containerName} ${containerSymbol} `;
  if(builder) {
    let whereClause = null;
    let sortingClause = null;
    let paginationClause = null;
    whereClause = getWhereClause(builder.conditionGroups, containerSymbol, partitionKey);
    if(!whereClause.valid) return whereClause; 
    result += whereClause.str;
    // partitionFound = whereClause.partitionFound;

    sortingClause = getSortingClause(builder.sorting, containerSymbol);
    if(!sortingClause.valid) return sortingClause;
    result += sortingClause.str;

    paginationClause = getPaginationClause(builder.pagination, builder.firstOnly);
    if(!paginationClause.valid) return paginationClause;
    result += paginationClause.str;
  }
  return {
    str: result,
    options: builder.options || {},
    valid: true,
    // partitionFound,
  };
};


/**
 * 
 * @param {Container} container
 * @param {Pagination} pagination
 * 
 */
const getPageCount = async (container, pagination, queryStr = "") => {
  let selectQueryStr = "SELECT COUNT(1) FROM c";
  if(queryStr) {
    selectQueryStr = queryStr.replace("*", "COUNT(1)");
    const idxOfPagination = selectQueryStr.indexOf("OFFSET");
    if(idxOfPagination >= 0) {
      selectQueryStr =  selectQueryStr.slice(0, idxOfPagination - 1);
    }
  }
  console.log(selectQueryStr);
  const retrievedPageNumber = (await container.items.query(selectQueryStr).fetchAll()).resources;
  if(retrievedPageNumber < 0) return 0;
  return Math.ceil((retrievedPageNumber[0]['$1'] || 0) / pagination.pageSize);
}

module.exports = { 
  getQueryString,
  getPageCount,
  getWhereClause,
  QueryBuilder,
  Pagination,
};

