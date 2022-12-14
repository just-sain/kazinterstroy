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

const Name = styled.h4`
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
	color: rgb(var(--${({ notavailable }) => (!notavailable ? `gray` : `error`)}));
	font-weight: 500;
	font-size: 1.4rem;

	span {
		color: rgb(var(--primary));
	}
`;

const Brand = styled.p`
	color: rgb(var(--gray));
	font-weight: 500;
	font-size: 1.4rem;

	span {
		color: rgb(var(--secondary));
	}
`;

export const Article = ({ href, articleData }) => {
	return (
		<StyledArticle>
			<Link href={href} passHref>
				<Poster src={articleData.images[0]} alt={articleData.name} />
				<Name>{articleData.name}</Name>
			</Link>
			<div>
				<Price>
					Цена: {priceRule(articleData.price1)} / <span>{priceRule(articleData.price2)}</span>
				</Price>
				<Quantity notavailable={declOfQuantity(articleData.quantity) === 'Нет в наличи'}>
					{declOfQuantity(articleData.quantity) === 'Нет в наличи'
						? declOfQuantity(articleData.quantity)
						: `В наличи: ${declOfQuantity(articleData.quantity)}`}
				</Quantity>
				{articleData.brand && (
					<Brand>
						Брэнд: <span>{articleData.brand}</span>
					</Brand>
				)}
			</div>
		</StyledArticle>
	);
};
