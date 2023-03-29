const jwt = require("jsonwebtoken");
const BaseResponseModel = require("../Models/Response");
const { UserResponseModel, TokenModel } = require("../Models/User");
const { ContainerQuery } = require("./Document");
var CryptoJS = require("crypto-js");
const { CustomerContainer } = require("./Containers");

const ACCESS_KEY = process.env.HMAC_KEY;

const USER_CONTAINERS = {
  'C': CustomerContainer
}

/**
 * 
 * @param {string} token JWT Token of User
 * 
 * @return {TokenModel}
 * 
 */
const decodeToken = (token, accessKey = null) => {
  try {
    const verified = jwt.verify(token, accessKey || ACCESS_KEY);
    return {
      valid: true,
      data: verified,
    }
  } catch(err) {
    return {
      valid: false,
      token,
      errorCode: 'INVALID_TOKEN',
      errorMsg: err,
    }
  }
}

/**
 * 
 * @param {string} token JWT Token of User
 * 
 * @return {Promise<UserResponseModel>}
 * 
 */
async function getUserFromToken(token) {
  const decodedToken = decodeToken(token);
  if(!decodedToken.valid) return decodedToken;

  const { data } = decodedToken;
  const userContainer = USER_CONTAINERS[data.userType];
  // Sa likha to kaya ibahin pa yung logic dito
  const user = await ContainerQuery(userContainer, {
    conditionGroups: [
      {
          conditions: [
              {
                  field: 'Email',
                  expectedValue: data.Email,
                  comparisonType: 'EQUALS'
              },
          ],
      },
    ],
  });

  if(!user.valid) {
    return {
      valid: false,
      errorCode: 'INVALID_USER',
      errorMsg: 'User not found',
    };
  }

  let password = user.items[0].Password
  const decodedPassword = decodeToken(password);
  const { data: { Password } } = decodedPassword; 
  console.log(data)
  if(Password != data?.Password){
    return {
      valid: false,
      errorCode: 'INVALID_PASSWORD',
      errorMsg: 'Password not matched',
    };
  }

  return {
    valid: true,
    data: user.items[0],
    userType: data.userType
  }
}


const getAllUser = async () => {
      var getData = await ContainerQuery(CustomerContainer, {
          sorting : {
              sortBy: "CreatedTS",
              sortOrder : "DESC"
          }
      })

      return getData
};

const getAllRegisteredUser = async () => {
  var getData = await ContainerQuery(CustomerContainer, {
      sorting : {
          sortBy: "CreatedTS",
          sortOrder : "DESC"
      }
  })

  return getData
};

const getCustomer = async (keyword) => {
  var getData = await ContainerQuery(CustomerContainer, {
          conditionGroups: [
              {
                  conditions: [
                      {
                          field: 'Name',
                          expectedValue: keyword,
                          comparisonType: 'CONTAINS'
                      },
                  ]
              }
          ],
          sorting : {
              sortBy: "CreatedTS",
              sortOrder : "DESC"
          }
      })

      return getData
};


const getSpecificCustomerInformation = async (id) => {
  var getData = await ContainerQuery(CustomerContainer, {
          conditionGroups: [
              {
                  conditions: [
                      {
                          field: 'id',
                          expectedValue: id,
                          comparisonType: 'EQUALS'
                      },
                  ]
              }
          ],
          sorting : {
              sortBy: "CreatedTS",
              sortOrder : "DESC"
          }
      })

      return getData
};

const validateEmail = async (email) => {
  var getData = await ContainerQuery(CustomerContainer, {
          conditionGroups: [
              {
                  conditions: [
                      {
                          field: 'Email',
                          expectedValue: email,
                          comparisonType: 'EQUALS'
                      },
                  ]
              }
          ],
          sorting : {
              sortBy: "CreatedTS",
              sortOrder : "DESC"
          }
      })

      return getData
};




const checkUser = async (CreatorID) => {
  var getData = await ContainerQuery(CustomerContainer, {
    conditionGroups: [
      {
          conditions: [
              {
                  field: 'id',
                  expectedValue: CreatorID,
                  comparisonType: 'EQUALS'
              },
          ],
      },
  ],
  });
  return getData;
};


const checkUserWalletAddress = async (address) => {
  var getData = await ContainerQuery(CustomerContainer, {
    conditionGroups: [
      {
          conditions: [
              {
                  field: 'WalletAddress.Account',
                  expectedValue: address,
                  comparisonType: 'EQUALS'
              },
          ],
      },
  ],
  });
  return getData
  
};



module.exports = {
  CustomerContainer,
  getSpecificCustomerInformation,
  decodeToken,
  getUserFromToken,
  getAllUser,
  getCustomer,
  checkUser,
  checkUserWalletAddress,
  validateEmail
};