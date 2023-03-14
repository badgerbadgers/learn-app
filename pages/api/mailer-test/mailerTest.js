// this route is here only temporarily for manual testing purposes 
import mailer from '../../../lib/mailer/mailer';

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case 'GET':
      return sendMail(req, res);
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
// 
const sendMail = async (req, res) => {

    // mailer function takes the following parameters:  subject, content, sendTo, copyTo (optional), text (optional, set to undefined by default in the function expression, text cannot be set to an empty string) 
  try {
    await mailer(
      'test email',
      '<div>some content</div>',
      '********@codethedream.org',
    ); // use the email you want to receive the email at 

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(error.status).json({ success: false });
  }
  return res;
};
