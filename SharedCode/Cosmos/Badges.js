// const { COSMOS_CONFIG } = require("../Setup");
// const { BrrringSetupDB } = require("./Config");
// const { ContainerQuery } = require("./Document");
// const { Pagination } = require("./Query");
// const { BadgeContainer } = require("./Containers");
// const { connectors } = require("googleapis/build/src/apis/connectors");

// const getBadges = async (keyword) => {
//   var getData = await ContainerQuery(BadgeContainer, {
//           conditionGroups: [
//               {
//                   conditions: [
//                       {
//                           field: 'UserID',
//                           expectedValue: keyword,
//                           comparisonType: 'EQUALS'
//                       },
//                   ]
//               }
//           ],
//           sorting : {
//               sortBy: "CreatedTS",
//               sortOrder : "DESC"
//           }
//       })

//       return getData
// };

// const getBadgeByDetails = async (user, name, image) => {
//     var getData = await ContainerQuery(BadgeContainer, {
//             conditionGroups: [
//                 {
//                     conditions: [
//                         {
//                             field: 'UserID',
//                             expectedValue: user,
//                             comparisonType: 'EQUALS'
//                         },
//                         {
//                             field: 'Name',
//                             expectedValue: name,
//                             comparisonType: 'EQUALS'
//                         },
//                         {
//                             field: 'Image',
//                             expectedValue: image,
//                             comparisonType: 'EQUALS'
//                         },
//                     ],
//                     connectors: 'AND'
//                 }
//             ],
//             firstOnly: true
//         })
  
//         return getData
//   };

// const getSpecificBadge = async (keyword) => {
//     var getData = await ContainerQuery(BadgeContainer, {
//             conditionGroups: [
//                 {
//                     conditions: [
//                         {
//                             field: 'id',
//                             expectedValue: keyword,
//                             comparisonType: 'EQUALS'
//                         },
//                     ]
//                 }
//             ],
//             firstOnly: true
//         })
  
//         return getData
//   };
  
// const getSpecificBadgeNotMinted = async (keyword) => {
//     var getData = await ContainerQuery(BadgeContainer, {
//             conditionGroups: [
//                 {
//                     conditions: [
//                         {
//                             field: 'id',
//                             expectedValue: keyword,
//                             comparisonType: 'EQUALS'
//                         }
//                     ]
//                 }
//             ]
//         })
  
//         return getData
//   };

// const getBadgeByTokenID = async (tokenID, id) => {
// var getData = await ContainerQuery(BadgeContainer, {
//         conditionGroups: [
//             {
//                 conditions: [
//                     {
//                         field: 'id',
//                         expectedValue: id,
//                         comparisonType: 'EQUALS'
//                     },
//                     {
//                         field: 'TokenID',
//                         expectedValue: tokenID,
//                         comparisonType: 'EQUALS'
//                     },
//                 ],
//                 connectors : "AND"
//             }
//         ],
//         firstOnly: true
//     })

//     return getData
// };

// module.exports = {
//     getSpecificBadgeNotMinted,
//     getBadges,
//     getSpecificBadge,
//     getBadgeByTokenID,
//     getBadgeByDetails
// }