import { useContext, useState } from 'react';
import { Store } from '../utils/store';
import { declOfNum } from '../utils/declaration';
import { priceRule } from '../utils/price';
// components
import Head from 'next/head';
import { CartItem } from '../components/cartItem';
import { BsCartX, BsCashStack } from 'react-icons/bs';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const Heading = styled.h1`
	margin-bottom: 3rem;

	color: rgb(var(--black));
	text-align: center;
	font-size: 3.2rem;
	font-weight: 400;

	span {
		color: rgb(var(--light-gray));
		font-weight: 100;
	}
`;

const Grid = styled.div`
	width: 100%;

	display: grid;
	justify-items: stretch;
	align-content: start;
	gap: 5rem;
`;

const NotFound = styled.div`
	margin-bottom: 20rem;

	color: rgb(var(--error));
	text-align: center;
	font-size: 6.4rem;
	font-weight: 400;

	p {
		margin-bottom: 3rem;

		color: rgb(var(--light-gray));
		font-size: 3.2rem;
	}
`;

const Section = styled.section`
	width: 100%;
`;

const TotalPrice = styled.p`
	margin-top: 5rem;

	text-align: center;
	color: rgb(var(--gray));
	font-size: 2.2rem;
	font-weight: 400;

	span {
		font-weight: 600;
	}
`;

const StyledButton = styled.a`
	max-width: 45rem;
	width: 100%;
	margin: 1.5rem auto 0;
	padding: 1.75rem 3rem;
	${({ disabled }) =>
		disabled &&
		css`
			pointer-events: none;
			opacity: 0.5;
		`}

	display: flex;
	text-align: center;
	justify-content: center;

	border-radius: 1rem;
	background: rgb(var(--cash));

	color: rgb(var(--white));
	font-size: 2rem;
	font-weight: 400;
	text-decoration: none;

	transition: background 0.4s ease 0s;

	&:hover,
	&:focus {
		background: rgba(var(--cash), 0.85);
	}

	svg {
		margin-left: 1rem;
		font-size: 2.8rem;
	}
`;

const CartPage = () => {
	const { state } = useContext(Store);
	const {
		contact,
		cart: { cartItems }
	} = state;

	let totalPrice = 0;
	if (cartItems.length) {
		for (let i in cartItems) {
			totalPrice += cartItems[i].price1;
		}
	}

	return (
		<>
			<Head>
				<title>Корзина / KazInterStroy</title>
			</Head>
			<Heading>
				Корзина
				{!!cartItems.length && (
					<>
						<br />
						<span>({`${cartItems.length} ${declOfNum(cartItems.length, ['товар', 'товара', 'товаров'])}`})</span>
					</>
				)}
			</Heading>
			<Section>
				{!cartItems.length ? (
					<NotFound>
						<p>Ваша корзина пуста</p>
						<BsCartX />
					</NotFound>
				) : (
					<Grid>
						{cartItems.map(e => (
							<CartItem key={e.article} elementData={e} />
						))}
					</Grid>
				)}
				<TotalPrice>
					Общая сумма: <span>{priceRule(totalPrice)}</span>
				</TotalPrice>
				<StyledButton
					disabled={!cartItems.length || !!cartItems.find(e => e.quantity === 0)}
					color='white'
					size='l'
					href={`https://wa.me/${contact.phone}`}>
					Оплатить
					<BsCashStack />
				</StyledButton>
			</Section>
		</>
	);
};

export default CartPage;
