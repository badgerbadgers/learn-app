// const sgMail = require('@sendgrid/mail'),

import sgMail from '@sendgrid/mail';
import emailTemplate from './emailTemplate';

const mailer = async (
  subject,
  content,
  sendTo,
  copyTo = '',
  text = undefined
) => {
    
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const SENT_FROM = 'dev@codethedream.org';

  const message = {
    to: sendTo,
    from: SENT_FROM,
    subject,
    cc: copyTo,
    text,
    html: emailTemplate(content),
  };

  try {
    await sgMail.send(message);
    return { success: true };
  } catch (error) {
    console.error(error);
    const err = new Error();
    err.status = error.code;
    err.message = error.message;
    throw err;
  }
};

export default mailer;
