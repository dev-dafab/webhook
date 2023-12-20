import express from 'express';
import nodemailer from 'nodemailer';
require('dotenv').config()

const router = express.Router();
 
const {
SECRET_EMAIL_SERVER_HOST,
SECRET_EMAIL_SERVER_PORT,
SECRET_EMAIL_SERVER_SECURE,
SECRET_EMAIL_SERVER_USERNAME,
SECRET_EMAIL_SERVER_PASSWORD
} = process.env;

type BodyType = {
  from: string;
  to: string | string[];
  subject: string;
  content?: string;
  html?: string;
  attachments?: unknow[];
}

router.post<BodyType, {message: string}>('/', async (req, res) => {
  const {from ,to, subject, content = '', html = '', attachments = []} = req.body as BodyType;

	const transporter = nodemailer.createTransport({
		host: SECRET_EMAIL_SERVER_HOST,
		port: Number(SECRET_EMAIL_SERVER_PORT),
		secure: Boolean(SECRET_EMAIL_SERVER_SECURE),
		auth: {
			user: SECRET_EMAIL_SERVER_USERNAME,
			pass: SECRET_EMAIL_SERVER_PASSWORD
		}
	});

  await transporter.sendMail({
		from,
		to,
		attachments,
		subject,
		html,
    text: content,
	});
  res.json({message: 'OK'});
});

export default router;
