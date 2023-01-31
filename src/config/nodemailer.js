import nodemailer from 'nodemailer';

const email = process.env.EMAIL;
const pwd = process.env.EMAIL_PWD;
const sendTo = process.env.SEND_TO_EMAIL;

export const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: email,
		pass: pwd
	}
});

export const mailOptions = {
	from: email,
	to: sendTo
};
