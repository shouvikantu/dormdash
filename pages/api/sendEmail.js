// pages/api/sendEmail.js
import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, productName, productPrice, customerEmail, sellerEmail } = req.body;

    const messages = [
      {
        to: customerEmail, // Customer's email
        from: 'wudormdash@gmail.com', // Verified SendGrid email
        subject: 'Order Confirmation',
        text: `Hello ${name}, your order for ${productName} at ${productPrice} has been confirmed.`,
        html: `<strong>Hello ${name},</strong><p>Your order for ${productName} at ${productPrice} has been confirmed.</p>`,
      },
      {
        to: sellerEmail, // Seller's email
        from: 'wudormdash@gmail.com', // Verified SendGrid email
        subject: 'New Order Received',
        text: `You have received a new order for ${productName} at ${productPrice} from ${name}.`,
        html: `<strong>New Order Received,</strong><p>You have received a new order for ${productName} at ${productPrice} from ${name}.</p>`,
      }
    ];

    try {
      await sendgrid.send(messages);
      res.status(200).json({ status: 'Success', message: 'Emails sent successfully' });
    } catch (error) {
      console.error('Error sending emails:', error);
      res.status(500).json({ status: 'Error', message: 'Failed to send emails' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
