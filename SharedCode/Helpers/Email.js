const nodemailer = require('nodemailer');
const { EMAIL_CONFIG } = require('../Setup');

  var transporter = nodemailer.createTransport({
      host: EMAIL_CONFIG.HOST, // hostname
      secureConnection: false, // TLS requires secureConnection to be false
      port: 587, // port for secure SMTP
      tls: {
         ciphers:'SSLv3'
      },
      auth: {
          user: EMAIL_CONFIG.EMAIL,
          pass: EMAIL_CONFIG.PASSWORD
      }
  });

  const sendEmail = async(to,subject,text) => {
    try{
      
      transporter.sendMail({from: `${EMAIL_CONFIG.SENDER} <${EMAIL_CONFIG.EMAIL}>`, to, subject, text}, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
    
  }
  catch(err) {
    context.res = {
      body: err,
    }
    return;
  }
} 
module.exports = {
  sendEmail,
}