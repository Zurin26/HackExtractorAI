const COSMOS_CONFIG = {
  endpoint: process.env.COSMOS_URL,
  key: process.env.COSMOS_KEY,
  databases: {
    userDB: {
      name: process.env.COSMOS_USER_DB,
      mainPartition: 'id',
      containers: {
        users: {
          customer: 'Customer',
          jobsaved: 'JobSaved'
        },
      },
    },
    setupDB: {
      name: process.env.COSMOS_SETUP_DB,
      mainPartition: 'id',
      containers: {
        badges: 'Badges',
        raffles: 'Raffles',
        events: 'Events',
        templates: 'Templates'
      },
    },
    transactionDB: {
      name: process.env.COSMOS_TRANS_DB,
      mainPartition: 'UserID',
      containers: {
        feed: 'Feed',
        jobpost: 'JobPost',
        comment: 'Comment',
        messages: 'Messages',
        eventparticipants: 'EventParticipants',
        likes: 'Likes',
        sharedfeeds: 'SharedFeeds',
        network: 'Network',
        sharedfeedslike: 'SharedFeedsLike',
        sharedfeedscomment: 'SharedFeedsComment',
        repostfeed: 'RepostFeed',
        repostfeedcomment: 'RepostFeedComment',
        repostfeedlike: 'RepostFeedLike',
        eventsharedfeed: 'EventSharedFeeds',
        eventsharedfeedlike: 'EventSharedFeedsLike',
        eventsharedfeedcomment: 'EventSharedFeedsComment',
      },
    }
  }
};

const SMS_CONFIG = {
  API_URL: process.env.SMSPath,
  API_URL_PRIO: process.env.SMSPathPrio,
  API_KEY: process.env.SMSApikey,
  SENDER: process.env.SMSSendername,
};

const EMAIL_CONFIG = {
  SENDER: process.env.MailSenderName,
  EMAIL: process.env.MailUsername,
  PASSWORD: process.env.MailPassword,
  HOST:process.env.MailHost,
};

module.exports = { 
  COSMOS_CONFIG, 
  SMS_CONFIG, 
  EMAIL_CONFIG
}