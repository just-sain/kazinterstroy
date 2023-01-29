import { mailOptions, transporter } from '../../config/nodemailer';

const generateEmailContent = data => {
	const stringData = Object.entries(data);

	return {
		text,
		html
	};
};

const handler = async (req, res) => {
	console.log(req.body);

	if (req.method === 'POST') {
		const data = req.body;

		if (!data) {
			return res.status(400).json({ success: false, message: 'bad request' });
		}

		try {
			await transporter.sendMail({
				...mailOptions,
				subject: 'something',
				text: 'this is string text', // string data
				html: '<h1>test title</h1><p>some body text</p>' // html data
			});

			return res.status(200).json({ success: true, message: 'successfully sended' });
		} catch (err) {
			console.log(err);
			return res.status(400).json({ success: false, message: err.message });
		}
	}

	return res.status(400).json({ success: false, message: 'bad request' });
};

export default handler;
