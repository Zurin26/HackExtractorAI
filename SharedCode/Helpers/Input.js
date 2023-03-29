const { default: Ajv} = require("ajv");
const { getUserFromToken } = require("../Cosmos/User");
const InputModel = require("../Models/Input");
const { USER_TYPES } = require("../Models/User");
var getUnixTime = require('date-fns/getUnixTime')

const ajv = new Ajv();

/**
 * 
 * @typedef {'C'} USER_TYPES_BTIWISE
 * 
 * @param {import("ajv").ValidateFunction} validate 
 * @param {import("@azure/functions").HttpRequest} req 
 * @param {boolean | USER_TYPES_BTIWISE | Array<USER_TYPES_BTIWISE> } isSecured 
 * 
 */
function InputValidationRequest(req, validate, isSecured = false) {
  this.req = req;
  this.validate = validate;
  this.isSecured = isSecured;
}

/**
 * 
 * @param {Object} schema 
 * 
 * @return {import("ajv").ValidateFunction}
 * 
 */
function generateValidator(schema) {
  return ajv.compile(schema)
}

/**
 * 
 * @param {InputValidationRequest} input 
 * 
 * @return {InputModel}
 * 
 */
const validateInput = async (input) => {
  const { validate, isSecured, req } = input;
  let token = null;
  let user = null;
  let userType = null;
  if(typeof validate === 'function') {
    const isValid = validate(req.body)
    if(!isValid) return { valid: false, errorCode: 'INVALID_INPUT_401', errorMsg: validate.errors[0]}
  }
  if(isSecured) {
    token = req.headers['hc-authorization'];
    const decodedToken = await getUserFromToken(token);
    if(!decodedToken.valid) return decodedToken;
    user = decodedToken.data;
    userType = decodedToken.userType
    
    if(typeof isSecured !== 'boolean') {
      if(typeof isSecured === 'string') {
        if(!Object.keys(USER_TYPES).includes(isSecured)) return { valid: false, errorCode: 'INVALID_SECURITY_TYPE', errorMsg: 'Use a proper UserType when defining api security' };
        if(userType !== isSecured) return { valid: false, errorCode: 'USER_TYPE_MISMATCH', errorMsg: 'User type not allowed to use the api' };
      } else if(isSecured.length > 0 && isSecured[0]) {
        if(!isSecured.includes(userType)) return { valid: false, errorCode: 'USER_TYPE_MISMATCH', errorMsg: 'User type not allowed to use the api' };
      } else return { valid: false, errorCode: 'INVALID_SECURITY_TYPE', errorMsg: 'Use a proper UserType when defining api security' };
    }
  }

  return {
    valid: true,
    input: req.body,
    token,
    user,
    userType
  };
}

let createdts = getUnixTime(new Date())

// var randomNumber = Math.floor(Math.random() * ( 9999 - 1000 + 1)) + 1000;

function randomNumber(length = 4) {
  var result           = '';
  var characters       = '0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function randomLetter(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function isEmailValid(email) {
  var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  if (!email)
      return false;

  if(email.length>254)
      return false;

  var valid = emailRegex.test(email);
  if(!valid)
      return false;

  // Further checking of some things regex can't handle
  var parts = email.split("@");
  if(parts[0].length>64)
      return false;

  var domainParts = parts[1].split(".");
  if(domainParts.some(function(part) { return part.length>63; }))
      return false;

  return true;
}

function isPhoneNumberValid(input_str) {
  var re = /^(09|\+639)\d{9}$/gm;

  return re.test(input_str);
}

module.exports = {
  validateInput,
  generateValidator,
  createdts,
  isEmailValid,
  isPhoneNumberValid,
  randomLetter,
  randomNumber
}