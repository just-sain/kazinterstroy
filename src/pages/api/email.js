import { mailOptions, transporter } from '../../config/nodemailer';
import { getCurrentDate } from '../../utils/date';

const generateEmailContent = data => {
	const subject = `Заказ от ${data.contacts.surname} ${data.contacts.name}`;
	const text = JSON.stringify(data);
	const html = `
			<div style="width: 100%">
				<div style='font-size: 18px; font-weight: 600;'>
					<p>Дата: <span style='color: rgb(34, 138, 218)'>${getCurrentDate()}</span></p>
					<p>Имя: <span style='color: rgb(34, 138, 218)'>${`${data.contacts.name}`}</span></p>
					<p>Фамилия: <span style='color: rgb(34, 138, 218)'>${data.contacts.surname}</span></p>
					<p>Почта: <span style='color: rgb(34, 138, 218)'>${data.contacts.email}</span></p>
					<p>Телефон: <span style='color: rgb(34, 138, 218)'>${data.contacts.phone}</span></p>
					<p>Примечание: <span style='color: rgb(34, 138, 218)'>${data.contacts.note}</span></p>
					<p>Общая сумма: <span style='color: rgb(34, 138, 218)'>${data.cart.totalPrice}</span></p>
				</div>
				<br />
				<div style='display: flex; flex-direction: column; align-items: center; gap: 3rem;'>
					${data.cart.cartItems.map(
						(el, i) =>
							`<br />
							<hr />
							<br />
							<div>
							<h1>${String(i + 1)}. ${el.name}</h1>
							<div style='display: flex; flex-direction: column; align-items: center; gap: 1rem'>
								${el.images.map(
									image => `
									<img
										style='width: 90%; height: auto; object-fit: contain; object-position: center; border-radius: 10px'
										src='${image}'
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
