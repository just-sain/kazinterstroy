import { useContext, useState } from 'react';
import { Store } from '../lib/store';
import { sendPostRequest } from '../lib/api';
import { declOfNum } from '../utils/declaration';
import { priceRule } from '../utils/price';
// components
import Head from 'next/head';
import { CartItem } from '../components/cartItem';
// icons
import { BsCartX, BsCashStack } from 'react-icons/bs';
// styles
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

// form
const Title = styled.h2`
	margin-top: 5rem;

	color: rgba(var(--black));
	text-align: center;
	font-size: 2.4rem;
	font-weight: 00;
`;

const StyledForm = styled.form`
	width: 100%;
	margin-top: 3rem;
`;

const InputContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 2rem 1rem;

	@media screen and (max-width: 720px) {
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}
`;

const Input = styled.input`
	width: 100%;
	padding: 1rem 1.5rem;

	background: rgba(var(--real-gray), 0.3);
	border-radius: 0.75rem;

	font-family: var(--font-family);
	font-size: 1.6rem;
	font-weight: 400;

	transition: background 0.3s ease 0s;

	&::placeholder {
		color: rgba(var(--gray));
	}

	&:hover,
	&:focus {
		background: rgba(var(--real-gray), 0.55);
	}

	@media screen and (max-width: 570px) {
		padding: 1rem;

		font-size: 1.4rem;
	}
`;

const Textarea = styled.textarea`
	width: 100%;
	height: 20rem;
	padding: 1rem;
	resize: none;

	grid-area: 3 / 1 / 4 / 3;
	background: rgba(var(--real-gray), 0.3);
	border-radius: 0.75rem;

	text-indent: 1rem;
	font-family: var(--font-family);
	font-size: 1.6rem;
	font-weight: 400;

	transition: background 0.3s ease 0s;

	&::placeholder {
		color: rgba(var(--gray));
	}

	&:hover,
	&:focus {
		background: rgba(var(--real-gray), 0.55);
	}

	@media screen and (max-width: 720px) {
		grid-area: auto;
	}
	@media screen and (max-width: 570px) {
		height: 15rem;
		padding: 1rem;

		font-size: 1.4rem;
	}
`;

const StyledButton = styled.button`
	max-width: 45rem;
	width: 100%;
	margin: 3rem auto 0;
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

const TotalPrice = styled.p`
	margin-top: 2rem;

	text-align: center;
	color: rgb(var(--gray));
	font-size: 2.2rem;
	font-weight: 400;

	span {
		font-weight: 600;
	}
`;

const CartPage = () => {
	const { state, dispatch } = useContext(Store);
	const {
		cart: { cartItems }
	} = state;

	const [isSending, setIsSending] = useState(false);
	const [formState, setFormState] = useState({
		name: '',
		surname: '',
		email: '',
		phone: '',
		note: ''
	});

	// for collect total price
	let totalPrice = 0;
	if (cartItems.length) {
		for (let i in cartItems) {
			totalPrice += cartItems[i].price1;
		}
	}

	// events
	const onSubmit = async e => {
		e.preventDefault();

		setIsSending(true);
		const data = {
			contacts: formState,
			cart: {
				cartItems: cartItems,
				totalPrice: totalPrice
			}
		};

		try {
			const response = await sendPostRequest(data, '/api/email');

			if (response.data.success) {
				alert('Ваша заявка успешно отправлена! В скором временем мы свяжемся с вами');
			} else {
				alert('Что-то пошло не так, пожалуйста попробуйте позже');
			}
		} catch {
			alert('Что-то пошло не так, пожалуйста попробуйте позже');
		}

		setIsSending(false);
	};

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
							<CartItem key={e.article} elementData={e} dispatch={dispatch} />
						))}
					</Grid>
				)}
				<Title>Заполните поля чтобы оставить заявку на покупку</Title>
				<StyledForm>
					<InputContainer>
						<Input
							type='text'
							placeholder='Имя*'
							required
							value={formState.name}
							onChange={e => setFormState({ ...formState, name: e.target.value })}
						/>
						<Input
							type='text'
							placeholder='Фамилия*'
							required
							value={formState.surname}
							onChange={e => setFormState({ ...formState, surname: e.target.value })}
						/>
						<Input
							type='email'
							placeholder='Email*'
							required
							value={formState.email}
							onChange={e => setFormState({ ...formState, email: e.target.value })}
						/>
						<Input
							type='text'
							placeholder='Телефон*'
							required
							value={formState.phone}
							onChange={e => setFormState({ ...formState, phone: e.target.value })}
						/>
						<Textarea
							placeholder='Примечание'
							value={formState.note}
							onChange={e => setFormState({ ...formState, note: e.target.value })}
						/>
					</InputContainer>
					<StyledButton
						disabled={
							!cartItems.length ||
							isSending ||
							!formState.email ||
							!formState.name ||
							!formState.phone ||
							!formState.surname
						}
						color='white'
						size='l'
						type='submit'
						onClick={onSubmit}>
						Оставить заявку на покупку
						<BsCashStack />
					</StyledButton>
				</StyledForm>
				<TotalPrice>
					Общая сумма: <span>{priceRule(totalPrice)}</span>
				</TotalPrice>
			</Section>
		</>
	);
};

export default CartPage;
