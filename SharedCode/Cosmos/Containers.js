const { COSMOS_CONFIG } = require("../Setup");
const { HCUserDB, HCSetupDB, HCTransDB } = require("./Config");
const { ContainerQuery } = require("./Document");
const { Pagination } = require("./Query");


// UserDB
const CustomerContainer = HCUserDB.container(COSMOS_CONFIG.databases.userDB.containers.users.customer);
const JobSavedContainer = HCUserDB.container(COSMOS_CONFIG.databases.userDB.containers.users.jobsaved);

// SetUpDB
const BadgeContainer = HCSetupDB.container(COSMOS_CONFIG.databases.setupDB.containers.badges);
const EventsContainer = HCSetupDB.container(COSMOS_CONFIG.databases.setupDB.containers.events);
const RafflesContainer = HCSetupDB.container(COSMOS_CONFIG.databases.setupDB.containers.raffles);
const TemplatesContainer = HCSetupDB.container(COSMOS_CONFIG.databases.setupDB.containers.templates);

// TransactionDB
const JobPostContainer = HCTransDB.container(COSMOS_CONFIG.databases.transactionDB.containers.jobpost);
const FeedContainer = HCTransDB.container(COSMOS_CONFIG.databases.transactionDB.containers.feed);
const MessageContainer = HCTransDB.container(COSMOS_CONFIG.databases.transactionDB.containers.messages);
const CommentContainer = HCTransDB.container(COSMOS_CONFIG.databases.transactionDB.containers.comment);
const EventParticipantsContainer = HCTransDB.container(COSMOS_CONFIG.databases.transactionDB.containers.eventparticipants); 
const LikesContainer = HCTransDB.container(COSMOS_CONFIG.databases.transactionDB.containers.likes); 
const SharedFeedsContainer = HCTransDB.container(COSMOS_CONFIG.databases.transactionDB.containers.sharedfeeds);
const SharedFeedsLikeContainer = HCTransDB.container(COSMOS_CONFIG.databases.transactionDB.containers.sharedfeedslike); 
const SharedFeedsCommentContainer = HCTransDB.container(COSMOS_CONFIG.databases.transactionDB.containers.sharedfeedscomment); 
const NetworkContainer = HCTransDB.container(COSMOS_CONFIG.databases.transactionDB.containers.network); 
const RepostFeedContainer = HCTransDB.container(COSMOS_CONFIG.databases.transactionDB.containers.repostfeed);
const RepostFeedLikeContainer = HCTransDB.container(COSMOS_CONFIG.databases.transactionDB.containers.repostfeedlike); 
const RepostFeedCommentContainer = HCTransDB.container(COSMOS_CONFIG.databases.transactionDB.containers.repostfeedcomment); 
const EventSharedFeedContainer = HCTransDB.container(COSMOS_CONFIG.databases.transactionDB.containers.eventsharedfeed);
const EventSharedFeedLikeContainer = HCTransDB.container(COSMOS_CONFIG.databases.transactionDB.containers.eventsharedfeedlike); 
const EventSharedFeedCommentContainer = HCTransDB.container(COSMOS_CONFIG.databases.transactionDB.containers.eventsharedfeedcomment); 


module.exports = {
  TemplatesContainer,
  NetworkContainer,
  CustomerContainer,
  JobSavedContainer,
  BadgeContainer,
  EventsContainer,
  RafflesContainer,
  JobPostContainer,
  FeedContainer,
  MessageContainer,
  CommentContainer,
  EventParticipantsContainer,
  LikesContainer,
  SharedFeedsContainer,
  SharedFeedsLikeContainer,
  SharedFeedsCommentContainer,
  RepostFeedContainer,
  RepostFeedLikeContainer,
  RepostFeedCommentContainer,
  EventSharedFeedContainer,
  EventSharedFeedLikeContainer,
  EventSharedFeedCommentContainer
}