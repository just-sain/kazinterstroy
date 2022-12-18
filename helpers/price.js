// price: number;

export const priceRule = price => {
	return Math.round(price) //  + price * 0.15
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
		.concat(' ₸');
};
