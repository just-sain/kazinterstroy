// components
import styled from '@emotion/styled';
import Link from 'next/link';
import { BsCart } from 'react-icons/bs';
import { FaPhoneAlt } from 'react-icons/fa';
import { Container } from './container';

const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	z-index: 90;
	padding: calc(var(--header-height) + 5rem) 0 5rem;
	overflow-x: hidden;
	overflow-y: auto;

	background: rgba(var(--primary), 0.9);
	backdrop-filter: blur(0.5rem);

	color: rgb(var(--white));

	position: fixed;
	top: 0;
	left: 0;

	transform-origin: left;
	transform: scaleX(${({ isOpen }) => (isOpen ? `1` : `0`)});
	transition: transform 0.8s ease 0s;

	@media screen and (min-width: 1040px) {
		display: none;
	}
`;

const StyledContainer = styled(Container)`
	height: 100%;

	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: flex-start;
	gap: 2rem;
`;

const Cart = styled(Link)`
	width: 70%;
	margin: 0 auto;
	padding: 1.5rem 2rem;
	cursor: pointer;

	border-radius: 0.5rem;
	background: rgb(var(--white));

	display: flex;
	justify-content: center;
	align-items: center;

	color: rgb(var(--primary));

	transition: background 0.4s ease 0s;

	&:hover {
		background: rgb(var(--secondary));
		color: rgb(var(--white));
	}

	svg {
		transform: scale(1.75);
		transition: color 0.4s ease 0s;
	}
`;

const Phones = styled.div`
	width: 100%;

	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: flex-start;
	gap: 1rem;
`;

const Phone = styled(Link)`
	padding: 1rem 1.5rem;

	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 0.5rem;

	background: rgb(var(--white));
	border-radius: 1rem;

	color: rgb(var(--primary));
	font-size: 1.8rem;
	font-weight: 600;

	transition: color 0.4s ease 0s, background 0.4s ease 0s;

	&:hover {
		background: rgb(var(--secondary));
		color: rgb(var(--white));
	}
`;

const Icon = styled(FaPhoneAlt)`
	width: 2.2rem;
	height: 2.2rem;
`;

const StyledMenu = styled.menu`
	width: 100%;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1rem;

	li {
		padding: 0.5rem 1rem;

		border-radius: 1rem;

		color: rgb(var(--white));
		font-size: 4rem;
		font-weight: 600;

		transition: background 0.4s ease 0s;

		&:hover {
			background: rgb(var(--secondary));
		}
	}
`;

// isOpen: boolean;
export const Menu = ({ isOpen, setIsBurgerMenuOpen, ...props }) => {
	return (
		<Wrapper isOpen={isOpen} {...props}>
			<StyledContainer maxW='m'>
				<Cart href='/cart'>
					<BsCart />
				</Cart>
				<StyledMenu>
					<li>
						<Link href='/'>Главная</Link>
					</li>
					<li>
						<Link href='/cart'>Корзина</Link>
					</li>
					<li>
						<Link href='/about'>О компании</Link>
					</li>
					<li>
						<Link href='/contact'>Контакты</Link>
					</li>
				</StyledMenu>
				<Phones>
					<Phone href='tel:+77013597588'>
						<Icon />
						<span>+7 (708) 326 64 20</span>
					</Phone>
					<Phone href='tel:+77273231030'>
						<Icon />
						<span>+7 (727) 32 31 030</span>
					</Phone>
				</Phones>
			</StyledContainer>
		</Wrapper>
	);
};
