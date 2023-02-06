import { mailOptions, transporter } from '../../config/nodemailer';
// utils
import { getCurrentDate, getCurrentTime } from '../../utils/date';
import { declOfQuantity } from '../../utils/declaration';
import { priceRule } from '../../utils/price';

const generateEmailContent = data => {
	const subject = `Заявка о покупке от ${data.contacts.surname} ${data.contacts.name}`;
	const text = JSON.stringify(data);
	const html = `
			<div style="width: 100%">
				<div style='font-size: 18px; font-weight: 600;'>
					<p>Дата: <span style='color: rgb(34, 138, 218)'>${`${getCurrentDate()}, ${getCurrentTime()}`}</span></p>
					<p>Имя: <span style='color: rgb(34, 138, 218)'>${`${data.contacts.name}`}</span></p>
					<p>Фамилия: <span style='color: rgb(34, 138, 218)'>${data.contacts.surname}</span></p>
					<p>Почта: <span style='color: rgb(34, 138, 218)'>${data.contacts.email}</span></p>
					<p>Телефон: <span style='color: rgb(34, 138, 218)'>${data.contacts.phone}</span></p>
					<p>Примечание: <span style='color: rgb(34, 138, 218)'>${data.contacts.note}</span></p>
					<p>Общая сумма: <span style='color: rgb(34, 138, 218)'>${priceRule(data.cart.totalPrice)}</span></p>
				</div>
				<br />
				<div>
					${data.cart.cartItems.map(
						(el, i) =>
							`<br />
							<hr />
							<br />
							<div>
							<div>
								<h1>${String(i + 1)}. ${el.name}</h1>
								<p style='font-size: 18px'>
									Цена: 
									<span style='color: rgb(34, 138, 218)'>
										${!(declOfQuantity(el.quantity) === 'нет в наличии' && el.price1 < 5) 
											? priceRule(el.price1)
											: 'По запросу'
										}
									</span>
								</p>
								<p style='font-size: 18px'>
									В наличи:
									<span
										style='color: rgb(235, 75, 75)'>
										${!(declOfQuantity(el.quantity) === 'нет в наличии' && el.price1 < 5) ? declOfQuantity(el.quantity) : 'По запросу'}
									</span>
								</p>
								<p style='font-size: 18px'>
									Брэнд:
									<span
										style='color: rgb(34, 138, 218)'>
										${el.brand}
									</span>
								</p>
								<p style='font-size: 18px'>
									id:
									<span
										style='color: rgb(34, 138, 218)'>
										${el.article}
									</span>
								</p>
								<p style='font-size: 18px'>
									Артикул-PartNumber:
									<span
										style='color: rgb(34, 138, 218)'>
										${el.article_pn}
									</span>
								</p>
								<a href='${el.href}' style='font-size: 18px; color: rgb(34, 138, 218)'>
									Просмотреть на сайте
								</a>
							</div>
							<br />
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
			return res.status(400).json({ success: false, message: err.message });
		}
	}

	return res.status(400).json({ success: false, message: 'bad request' });
};

export default handler;
