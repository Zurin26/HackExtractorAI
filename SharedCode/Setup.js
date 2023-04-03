const COSMOS_CONFIG = {
  endpoint: process.env.COSMOS_URL,
  key: process.env.COSMOS_KEY,
  databases: {
    container: {
      name: process.env.COSMOS_DB,
      mainPartition: 'id',
      containers: {
        ai: {
          extractedData: 'ExtractedData'
        },
      },
    },
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