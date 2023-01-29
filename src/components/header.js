import { memo, useContext, useEffect, useRef, useState } from 'react';
import { Store } from '../lib/store';
// components
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Container } from './container';
import { Catalog } from './catalog';
import { Search } from './search';
// icons
import { BsCart } from 'react-icons/bs';
import { FaPhoneAlt, FaListUl, FaRegWindowClose } from 'react-icons/fa';
// styles
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const StyledHeader = styled(motion.header)`
	width: 100%;
	height: var(--header-height);
	z-index: 100;

	background: rgba(${({ ismenuopen }) => (ismenuopen ? `var(--bg), 1` : `var(--white), 0.85`)});
	backdrop-filter: blur(0.5rem);

	transition: background 0.4s ease 0.2s;

	position: fixed;
	top: 0;
	left: 0;
`;

const StyledContainer = styled(Container)`
	height: calc(var(--header-height) - 6rem);

	display: flex;
	justify-content: space-between;
	align-items: center;
`;

//

// left block
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

// right block
const RightBlock = styled(motion.div)`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 1rem;
`;

const Phones = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	gap: 3rem;

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

// bottom side, it is also sticky
const Sticky = styled.div`
	width: 100%;
	height: calc(var(--header-height) - 6rem);

	position: sticky;
	top: 0;
	left: 0;
`;

const BottomSide = styled(StyledContainer)`
	margin: 0 auto;

	justify-content: space-between;
	gap: 1.5rem;
`;

const CatalogButton = styled.button`
	padding: 1rem 1.75rem;

	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;

	background: rgb(var(--primary));
	border-radius: 1rem;

	color: rgb(var(--white));
	font-size: 1.6rem;
	font-weight: 600;

	transition: background 0.4s ease 0s, color 0.4s ease 0s;

	&:hover {
		background: rgba(var(--primary-dark), 0.85);
	}

	@media screen and (max-width: 570px) {
		padding: 0 0;

		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0;

		background: none;
		border-radius: none;

		color: rgb(var(--primary));
		font-size: 2rem;

		span {
			display: none;
		}

		&:hover {
			background: none;
			color: rgb(var(--black));
		}
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

	// events
	const onCatalogClick = () => {
		setIsCatalogOpen(!isCatalogOpen);
	};

	return (
		<>
			{isCatalogOpen && <Catalog closeCatalog={() => setIsCatalogOpen(false)} />}
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
						<Burger onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)} ismenuopen={isBurgerMenuOpen ? 1 : 0}>
							<div />
							<div />
							<div />
						</Burger>
					</RightBlock>
				</StyledContainer>
				<Sticky>
					<BottomSide maxW='m'>
						<CatalogButton onClick={onCatalogClick}>
							{!isCatalogOpen ? <FaListUl /> : <FaRegWindowClose />}
							<span>Каталог</span>
						</CatalogButton>
						<Search />
						<Cart href='/cart'>
							<BsCart />
							<span>{!cartItems.length ? '0' : cartItems.length}</span>
						</Cart>
					</BottomSide>
				</Sticky>
			</StyledHeader>
		</>
	);
});
