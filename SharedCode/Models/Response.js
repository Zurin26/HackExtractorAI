const DocumentBaseModel = require("./Document");

/**
 * 
 * @param {boolean} valid
 * @param {string} errorCode
 * @param {string} errorMsg
 * @param {Array<DocumentBaseModel> | DocumentBaseModel} data
 * 
 */
function BaseResponseModel(valid, errorCode, errorMsg, data) {
  this.valid = valid;
  this.errorCode = errorCode;
  this.errorMsg = errorMsg;
  this.data = data
}

module.exports = BaseResponseModel;