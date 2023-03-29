const BaseResponseModel = require("./Response");
const { UserModel } = require("./User");

class InputModel extends BaseResponseModel {
  constructor(props) {
    /**  @type {Object | null} */
    this.input = props.input;
    /**  @type {UserModel | null} */
    this.user = props.user;
    /**  @type {string | null} */
    this.token = props.token;
    /**  @type {'A' | 'M' | 'C' | 'R' | 'SM' | 'CK'} */
    this.userType = props.userType;
  }
}

module.exports = InputModel