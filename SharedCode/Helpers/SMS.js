const { default: axios } = require("axios");
const { SMS_CONFIG } = require("../Setup")


/**
 * 
 * @typedef {Object} SMSMessage
 * @property {string} message
 * @property {string} number
 * 
 * @param {SMSMessage} param0
 *  
 */
const sendSMS = async ({ message, number, prio = false }) => {
  const smsResponse = await axios.post(`${prio ? SMS_CONFIG.API_URL_PRIO : SMS_CONFIG.API_URL}${new URLSearchParams({ apikey: SMS_CONFIG.API_KEY, message, number })}`);
  // eto sa baba yung may sendername na config
  // const smsResponse = await axios.get(SMS_CONFIG.API_URL, { params: { apikey: SMS_CONFIG.API_KEY, sendername: 'BRRRING', message, number } });

  return {
    data: smsResponse.data,
    status: smsResponse.status,
    statusText: smsResponse.statusText,
    url: smsResponse.config.url,
  };
}

module.exports = { sendSMS };