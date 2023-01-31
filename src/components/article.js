import { priceRule } from '../utils/price';
import { declOfQuantity } from '../utils/declaration';
// components
import Link from 'next/link';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { BsCartPlusFill, BsCartXFill } from 'react-icons/bs';

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
	background: rgba(var(--real-gray), 0.2);

	color: rgb(var(--${({ color }) => color}));
	font-size: 2rem;

	position: absolute;
	bottom: 1.5rem;
	right: 1.5rem;

	&:disabled {
		display: none;
	}
`;

export const Article = ({ href, articleData, dispatch, isInCart, ...props }) => {
	const cartHandle = () => {
		const payload = {
			article: articleData.article,
			name: articleData.name,
			brand: articleData.brand,
			article_pn: articleData.article_pn,
			href: `${process.env.NEXT_PUBLIC_SELF_DOMAIN}${href}`,
			price1: articleData.price1,
			quantity: articleData.quantity,
			images: articleData.images
		};

		// interface of payload
		// article: 0,     // id
		// name: '',       // name
		// brand: '',      // brand
		// article_pn: '', // article part number
		// href: '',       // link
		// price1: 0,      // price
		// quantity: 0,    // count in base
		// images: [''],   // images

		if (!isInCart) {
			dispatch({ type: 'CART_ADD_ITEM', payload });
		} else {
			dispatch({ type: 'CART_REMOVE_ITEM', payload });
		}
	};

	return (
		<StyledArticle {...props}>
			<Link href={href} passHref>
				<Poster src={articleData.images[0]} alt={articleData.name} />
				<Name>{articleData.name}</Name>
			</Link>
			<div>
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
			</div>
			<ToCart
				disabled={declOfQuantity(articleData.quantity) === 'Нет в наличи'}
				title={!isInCart ? 'Добавить в корзину' : 'Удалить из корзины'}
				onClick={cartHandle}
				color={!isInCart ? 'cash' : 'error'}>
				{!isInCart ? <BsCartPlusFill /> : <BsCartXFill />}
			</ToCart>
		</StyledArticle>
	);
};
