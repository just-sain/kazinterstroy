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

// __bold__
export const declOfBoldText = text => {
	const surroundingUnderscores = new RegExp(/__(.*?)__/g);
	return text.replace(surroundingUnderscores, word => {
		return `<strong>${word.replace(/__/g, '')}</strong>`;
	});
};

// *italic*
export const declOfItalicText = text => {
	const surroundingUnderscores = new RegExp(/.*(.*?)*/g);
	return text.replace(surroundingUnderscores, word => {
		return `<i>${word.replace(/.*/g, '')}</i>`;
	});
};
