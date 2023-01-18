import { memo, useContext, useState } from 'react';
// components
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from './button';
import { Container } from './container';
import { Catalog } from './catalog';
import { Search } from './search';
import { BsCart } from 'react-icons/bs';
import { FaPhoneAlt } from 'react-icons/fa';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Store } from '../utils/store';

const StyledHeader = styled(motion.header)`
	width: 100%;
	height: var(--header-height);
	z-index: 100;

	background: rgba(${({ ismenuopen }) => (ismenuopen ? `var(--bg), 1` : `var(--white), 0.85`)});
	backdrop-filter: blur(0.5rem);

	color: rgb(var(--black));

	position: fixed;
	top: 0;
	left: 0;

	transition: background 0.4s ease 0.2s;
`;

const StyledContainer = styled(Container)`
	height: 100%;

	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const LeftBlock = styled(motion.div)`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	gap: 2rem;
`;

const Logo = styled.div`
	a {
		display: flex;
		align-items: center;
		gap: 1rem;

		color: rgb(var(--primary));
		line-height: 1rem;
		font-size: 2.6rem;
		font-weight: 700;

		@media screen and (max-width: 300px) {
			font-size: 0;
		}
	}
`;

const LogoImage = styled.div`
	width: 5rem;
	height: 5rem;

	position: relative;

	img {
		width: auto;
		height: 5rem;

		object-fit: contain;
		object-position: center;
	}
`;

const HeaderMenu = styled.menu`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 1.5rem;

	color: rgb(var(--black));
	font-size: 2rem;
	font-weight: 400;

	@media screen and (max-width: 1040px) {
		display: none;
	}

	li {
		cursor: pointer;
	}
`;

const RightBlock = styled(motion.div)`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 1rem;
`;

const Phones = styled.div`
	width: 17rem;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	gap: 0.5rem;

	@media screen and (max-width: 1040px) {
		display: none;
	}
`;

const Phone = styled(Link)`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 0.5rem;

	color: rgb(var(--black));
	font-size: 1.6rem;
	font-weight: 500;

	transition: color 0.4s ease 0s;

	&:hover {
		color: rgb(var(--primary));
	}
`;

const Icon = styled(FaPhoneAlt)`
	width: 2.2rem;
	height: 2.2rem;

	color: rgb(var(--primary));
`;

const StyledSearch = styled(Search)`
	min-width: 20rem;
	width: 20rem;

	@media screen and (max-width: 570px) {
		display: none;
	}
`;

const Burger = styled.div`
	width: 3.5rem;
	height: 2.5rem;
	cursor: pointer;

	display: none;
	flex-direction: column;
	justify-content: space-between;
	align-items: stretch;

	div {
		width: 100%;
		height: 0.2rem;

		background: rgb(var(--black));
		border-radius: 1.5rem;

		transform: rotate(0);

		transition: opacity 0.4s ease 0s, background 0.4s ease 0s, transform 0.4s ease 0s, width 0.4s ease 0s;

		${props =>
			props.ismenuopen &&
			css`
				background: rgb(var(--error));

				&:first-of-type {
					transform: rotate(45deg) translate(1rem, 0.2rem);
				}
				&:nth-of-type(2) {
					transform: rotate(-45deg) translate(0.6rem, 0.1rem);
				}

				&:last-of-type {
					opacity: 0;
				}
			`}
	}

	&:hover div {
		&:first-of-type {
			width: 80%;
		}
		&:last-of-type {
			width: 40%;
		}
	}

	@media screen and (max-width: 1040px) {
		display: flex;
	}
`;

const Cart = styled(Link)`
	margin: 0 1rem;
	cursor: pointer;

	color: rgb(var(--black));

	position: relative;

	svg {
		transform: scale(1.75);
		transition: color 0.4s ease 0s;
	}

	&:hover {
		color: rgb(var(--primary));
	}

	span {
		width: 2rem;
		height: 2rem;

		display: flex;
		justify-content: center;
		align-items: center;

		background: rgb(var(--secondary));
		border-radius: 50%;

		color: rgb(var(--white));
		text-align: center;
		font-size: 1.4rem;
		font-weight: 600;

		position: absolute;
		bottom: -1rem;
		left: -1rem;
	}

	@media screen and (max-width: 570px) {
		display: none;
	}
`;

// isBurgerMenuOpen: boolean

export const Header = memo(({ isBurgerMenuOpen, setIsBurgerMenuOpen }) => {
	const { state } = useContext(Store);
	const {
		cart: { cartItems }
	} = state;

	const [isCatalogOpen, setIsCatalogOpen] = useState(false);

	const onCatalogClick = () => {
		setIsCatalogOpen(!isCatalogOpen);
	};

	return (
		<>
			{isCatalogOpen && <Catalog />}
			<StyledHeader
				ismenuopen={isBurgerMenuOpen ? 1 : 0 || isCatalogOpen ? 1 : 0}
				initial={{ opacity: 0, translateY: '-100%' }}
				transition={{ delay: 0.6, duration: 0.6 }}
				animate={{ opacity: 1, translateY: 0 }}>
				<StyledContainer maxW='l'>
					<LeftBlock
						initial={{ opacity: 0, translateY: '-100%' }}
						transition={{ delay: 0.8, duration: 0.6 }}
						animate={{ opacity: 1, translateY: 0 }}>
						<Logo>
							<Link href='/'>
								<LogoImage>
									<Image src='/logo.png' alt='KazInterStroy' priority fill sizes='100%' />
								</LogoImage>
								KazInterStroy
							</Link>
						</Logo>
						<HeaderMenu>
							<Button
								onClick={onCatalogClick}
								background={!isCatalogOpen ? 'primary' : 'secondary'}
								color='white'
								size='m'>
								Каталог
							</Button>
							<li>
								<Link href='/'>Главная</Link>
							</li>
							<li>
								<Link href='/contact'>Контакты</Link>
							</li>
						</HeaderMenu>
					</LeftBlock>
					<RightBlock
						initial={{ opacity: 0, translateY: '-100%' }}
						transition={{ delay: 1, duration: 0.6 }}
						animate={{ opacity: 1, translateY: 0 }}>
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
						<StyledSearch />
						<Cart href='/cart'>
							<BsCart />
							<span>{!cartItems.length ? '0' : cartItems.length}</span>
						</Cart>
						<Burger onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)} ismenuopen={isBurgerMenuOpen ? 1 : 0}>
							<div />
							<div />
							<div />
						</Burger>
					</RightBlock>
				</StyledContainer>
			</StyledHeader>
		</>
	);
});
