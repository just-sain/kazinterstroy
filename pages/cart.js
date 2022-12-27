import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { declOfNum } from '../helpers/declaration';
// components
import Head from 'next/head';
import { CartItem } from '../components/cartItem';
import { Button } from '../components/button';
import { BsCartX, BsCashStack } from 'react-icons/bs';
import styled from '@emotion/styled';
import { AppContext } from '../context/app.context';

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
	gap: 3rem;
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

const StyledButton = styled(Button)`
	max-width: 45rem;
	width: 100%;
	margin: 5rem auto 0;

	text-align: center;
	justify-content: center;

	svg {
		margin-left: 1rem;
		font-size: 2.8rem;
	}
`;

const CartPage = () => {
	const { contact } = useContext(AppContext);
	const [elements, setElements] = useState([]);
	const [isReady, setIsReady] = useState(false);
	const [notFound, setNotFound] = useState(false);

	useEffect(() => {
		const storageItemsId = localStorage.getItem('cart');

		if (storageItemsId) {
			if (!!storageItemsId.split(',')) {
				axios
					.get(
						`${process.env.NEXT_PUBLIC_API}/element-info?access-token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&article=${storageItemsId}&additional_fields=brand,images`
					)
					.then(res => {
						if (!res.data || res.data?.status === 'error') setNotFound(true);
						else {
							setElements(res.data);
							setIsReady(true);
						}
					});
			} else setNotFound(true);
		} else {
			setNotFound(true);
		}
	}, [elements]);

	return (
		<>
			<Head>
				<title>Корзина / KazInterStroy</title>
			</Head>
			<Heading>
				Корзина
				<br />
				{isReady && elements.length && (
					<span>({`${elements.length} ${declOfNum(elements.length, ['элемент', 'элемента', 'элементов'])}`})</span>
				)}
			</Heading>
			<Section>
				{notFound ? (
					<NotFound>
						<p>Ваша корзина пуста</p>
						<BsCartX />
					</NotFound>
				) : (
					<Grid>
						{elements.map(e => (
							<CartItem key={e.article} elementData={e} />
						))}
					</Grid>
				)}
				<StyledButton
					disabled={true}
					background='cash'
					color='white'
					size='l'
					href={`https://wa.me/${contact.phone}`}>
					Купить
					<BsCashStack />
				</StyledButton>
			</Section>
		</>
	);
};

export default CartPage;
