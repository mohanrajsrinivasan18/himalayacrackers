
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  const { to, subject, html } = req.body;
  await sgMail.send({
    to,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject,
    html
  });
  res.status(200).json({ success: true });
}
