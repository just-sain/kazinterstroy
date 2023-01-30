import { mailOptions, transporter } from '../../config/nodemailer';
import { getCurrentDate } from '../../utils/date';

const generateEmailContent = data => {
	const subject = data.subject;
	console.log();

	const text = JSON.stringify(data);

	const html = `
			<div style="width: 100%">
				<h1 style='color: rgb(34, 138, 218);'>Заказ от ${data.contacts.surname} ${data.contacts.name}</h1>
				<div style='font-size: 18px;'>
					<p>дата: <span style='color: rgb(34, 138, 218)'>${getCurrentDate()}</span></p>
					<p>имя: <span style='color: rgb(34, 138, 218)'>${`${data.contacts.name}`}</span></p>
					<p>Фамилия: <span style='color: rgb(34, 138, 218)'>${data.contacts.surname}</span></p>
					<p>email: <span style='color: rgb(34, 138, 218)'>${data.contacts.email}</span></p>
					<p>телефон: <span style='color: rgb(34, 138, 218)'>${data.contacts.phone}</span></p>
					<p>примечание: <span style='color: rgb(34, 138, 218)'>${data.contacts.note}</span></p>
					<p>общая сумма: <span style='color: rgb(34, 138, 218)'>${data.cart.totalPrice}</span></p>
				</div>
				<div style='display: flex; flex-direction: column; align-items: center; gap: 3rem;'>
					${data.cart.cartItems.map(
						(el, i) =>
							`<div>
							<h1>${String(i + 1)}. ${el.name}</h1>
							<div style='display: flex; flex-direction: column; align-items: center; gap: 1rem'>
								${el.images.map(
									image => `
									<img
										style='width: 90%; height: auto; object-fit: contain; object-position: center'
										src='${image}'
										alt='${image}'
									/>
								`
								)}
							</div>
						</div>`
					)}
				</div>
			</div>
	`;

	return {
		subject,
		text,
		html
	};
};

const handler = async (req, res) => {
	if (req.method === 'POST') {
		const data = req.body;

		if (!data) {
			return res.status(400).json({ success: false, message: 'bad request' });
		}

		try {
			await transporter.sendMail({
				...mailOptions,
				...generateEmailContent(data)
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
