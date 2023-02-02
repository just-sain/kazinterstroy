// num: number;
// titles: [string, string, string]
export const declOfNum = (num, titles) => {
	const cases = [2, 0, 1, 1, 1, 2];
	return titles[num % 100 > 4 && num % 100 < 20 ? 2 : cases[num % 10 < 5 ? num % 10 : 5]];
};

// quantity: number
export const declOfQuantity = quantity => {
	if (typeof quantity === 'number') {
		return quantity === 0 ? 'нет в наличии' : quantity;
	}
	if (!quantity.includes('<') && !quantity.includes('>')) return quantity;

	if (quantity.includes('<')) {
		return `Меньше ${quantity.substr(0, 1)}`;
	}

	return `Больше ${quantity.substr(1, quantity.length - 1)}`;
};
