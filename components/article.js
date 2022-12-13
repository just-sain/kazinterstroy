import { priceRule } from '../helpers/price';
import { declOfNum, declOfQuantity } from '../helpers/declaration';
// components
import Link from 'next/link';
import styled from '@emotion/styled';

const StyledArticle = styled.div`
	padding: 2rem 1.5rem;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: stretch;
	gap: 1rem;

	box-shadow: 0.4rem 0.4rem 1rem rgba(var(--black), 0.15);
	border-radius: 1.5rem;
`;

const Poster = styled.img`
	width: 100%;
	height: 20rem;

	object-fit: contain;
	object-position: center;
`;

const Name = styled(Link)`
	color: rgb(var(--primary));
	font-weight: 500;
	font-size: 1.6rem;
`;

const Price = styled.p`
	font-weight: 500;
	font-size: 1.4rem;

	color: rgb(var(--gray));

	span {
		color: rgb(var(--cash));
	}
`;

const Quantity = styled.p`
	font-weight: 500;
	font-size: 1.4rem;

	color: rgb(var(--${({ notavailable }) => (!notavailable ? `gray` : `error`)}));

	span {
		color: rgb(var(--primary));
	}
`;

export const Article = ({ href, articleData }) => {
	return (
		<StyledArticle>
			<div>
				<Poster src={articleData.images[0]} alt={articleData.name} />
				<Name href={href} passHref>
					{articleData.name}
				</Name>
			</div>
			<div>
				<Price>
					Цена: {priceRule(articleData.price1)}₸ / <span>{priceRule(articleData.price2)}₸</span>
				</Price>
				<Quantity notavailable={declOfQuantity(articleData.quantity) === 'Нет в наличи'}>
					{declOfQuantity(articleData.quantity)}
				</Quantity>
			</div>
		</StyledArticle>
	);
};
