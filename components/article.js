import { priceRule } from '../helpers/price';
import { declOfQuantity } from '../helpers/declaration';
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

	box-shadow: var(--outer-shadow), var(--inner-shadow-0);
	background: rgba(var(--real-white), 1);
	border-radius: 1.5rem;

	transition: box-shadow 0.3s ease 0s;

	&:hover {
		box-shadow: var(--outer-shadow-0), var(--inner-shadow);
	}
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

const Info = styled.div``;

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

const Price = styled.h3`
	margin-top: 1rem;

	color: rgb(var(--light-gray));
	font-size: 1.8rem;
	font-weight: 600;

	span {
		color: rgb(var(--cash));
	}
`;

export const Article = ({ href, articleData }) => {
	return (
		<StyledArticle>
			<Link href={href} passHref>
				<Poster src={articleData.images[0]} alt={articleData.name} />
				<Name>{articleData.name}</Name>
			</Link>
			<Info>
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
				<Price>
					<span>{priceRule(articleData.price1)}</span> (шт)
				</Price>
			</Info>
		</StyledArticle>
	);
};
