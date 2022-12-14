import { priceRule } from '../utils/price';
import { declOfQuantity } from '../utils/declaration';
// components
import Link from 'next/link';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';

const StyledArticle = styled(motion.article)`
	padding: 2rem 1.5rem;
	overflow: hidden;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: stretch;
	gap: 1rem;

	box-shadow: var(--outer-shadow), var(--inner-shadow-0);
	background: rgba(var(--real-white), 1);
	border-radius: 1.5rem;

	position: relative;

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
	margin-top: 0.5rem;

	color: rgb(var(--primary));
	font-weight: 500;
	font-size: 1.6rem;
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

const Price = styled.h3`
	margin-top: 1rem;

	color: rgb(var(--light-gray));
	font-size: 1.8rem;
	font-weight: 600;

	span {
		color: rgb(var(--cash));
	}
`;

const ToCart = styled.button`
	width: 4rem;
	height: 4rem;

	display: flex;
	justify-content: center;
	align-items: center;

	border-radius: 50%;
	background: rgba(var(--black), 0.1);

	color: rgb(var(--primary));
	font-size: 2rem;

	position: absolute;
	bottom: 1.5rem;
	right: 1.5rem;
`;

export const Article = ({ href, articleData, ...props }) => {
	const [inCart, setInCart] = useState(false);

	useEffect(() => {
		const elementsIdString = localStorage.getItem('cart');

		if (elementsIdString) {
			const elementsId = elementsIdString.split(',');

			if (elementsId.find(e => e === String(articleData.article))) {
				setInCart(true);
			}
		}
	}, []);

	const cartHandle = () => {
		const elementsIdString = localStorage.getItem('cart');

		if (elementsIdString) {
			const elementsId = elementsIdString.split(',');

			if (!elementsId.find(e => e === String(articleData.article))) {
				const filtered = [articleData.article, ...elementsId];

				localStorage.setItem('cart', filtered);
				setInCart(true);
			} else {
				const filtered = elementsId.filter(e => e !== String(articleData.article));

				localStorage.setItem('cart', filtered);
				setInCart(false);
			}
		} else {
			localStorage.setItem('cart', articleData.article);
			setInCart(true);
		}
	};

	return (
		<StyledArticle {...props}>
			<Link href={href} passHref>
				<Poster src={articleData.images[0]} alt={articleData.name} />
				<Name>{articleData.name}</Name>
			</Link>
			<div>
				<Quantity notavailable={declOfQuantity(articleData.quantity) === '?????? ?? ????????????'}>
					{declOfQuantity(articleData.quantity) === '?????? ?? ????????????'
						? declOfQuantity(articleData.quantity)
						: `?? ????????????: ${declOfQuantity(articleData.quantity)}`}
				</Quantity>
				{articleData.brand && (
					<Brand>
						??????????: <span>{articleData.brand}</span>
					</Brand>
				)}
				<Price>
					<span>{priceRule(articleData.price1)}</span> (????)
				</Price>
			</div>
			<ToCart onClick={cartHandle}>{!inCart ? <BsHeart /> : <BsHeartFill />}</ToCart>
		</StyledArticle>
	);
};
