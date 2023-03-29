const DocumentBaseModel = require("./Document");
const BaseResponseModel = require("./Response");

class UserModel extends DocumentBaseModel {
  /**
   * 
   * @typedef {Object} UserDocumentModel
   * @property {string} id
   * @property {string} Email
   * 
   * @param {DocumentBaseModel & UserDocumentModel} props
   * 
   */
  constructor(props) {
    this.id = props.id;
    this.Email = props.Email;
  }
}

class TokenModel extends BaseResponseModel {
  constructor(props) {
    /**
     * 
     * @typedef {Object} TokenData 
     * @property {'A' | 'C' | 'M' | 'R'} userType
     * @property {string} id
     * @property {string} password
     * 
     * @typedef {Object} TokenObject 
     * @property {number} exp
     * @property {TokenData} data
     * 
     */
    /**  @type {TokenObject} */
    this.data = props.data;
  }
}

class UserResponseModel extends BaseResponseModel {
  constructor(props) {
    /** @type {UserModel | Array<UserModel>} */
    this.data = props.data;
  }
  // this.valid = props.valid;
  // this.errorCode = props.errorCode;
  // this.errorMsg = props.errorMsg;
}

const USER_TYPES = {
  A: 'Admin',
  CK: 'CloudKitchen',
  M: 'Merchant',
  SM: 'SubMerchant',
  C: 'Customer',
  R: 'Rider',
}

module.exports = {
  TokenModel,
  UserModel,
  UserResponseModel,
  USER_TYPES,
};

