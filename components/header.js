import { memo } from 'react';
// components
import styled from '@emotion/styled';
import Link from 'next/link';
import { Container } from './container';
import { Search } from './search';
import { FaPhoneAlt } from 'react-icons/fa';
import { css } from '@emotion/react';

const StyledHeader = styled.header`
	width: 100%;
	height: var(--header-height);
	z-index: 100;
	opacity: 0;

	background: rgba(${({ isMenuOpen }) => (isMenuOpen ? `var(--bg), 1` : `var(--primary), 0.3`)});
	backdrop-filter: blur(0.5rem);

	color: rgb(var(--black));

	position: fixed;
	top: 0;
	left: 0;

	transition: background 0.4s ease 0.2s;

	animation: fade-down 0.5s ease 0.6s forwards;
`;

const StyledContainer = styled(Container)`
	height: 100%;

	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const LeftBlock = styled.div`
	width: 100%;

	opacity: 0;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	gap: 1rem;

	animation: fade-down 0.5s ease 1.2s forwards;
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

		img {
			width: auto;
			height: 5rem;
		}
	}
`;

const HeaderMenu = styled.menu`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 1rem;

	color: rgb(var(--black));
	font-size: 2rem;
	font-weight: 400;

	@media screen and (max-width: 1040px) {
		display: none;
	}
`;

const RightBlock = styled.div`
	opacity: 0;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 1rem;

	animation: fade-down 0.5s ease 1.2s forwards;
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
	max-width: 25rem;

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
			props.isMenuOpen &&
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

// isMenuOpen: boolean

export const Header = memo(({ isMenuOpen, setIsMenuOpen }) => {
	return (
		<StyledHeader isMenuOpen={isMenuOpen}>
			<StyledContainer maxW='l'>
				<LeftBlock>
					<Logo>
						<Link href='/'>
							<img src='/logo.png' />
							KazInterStroy
						</Link>
					</Logo>
					<HeaderMenu>
						<li>
							<Link href='/'>Главная</Link>
						</li>
						<li>
							<Link href='/category'>Каталог</Link>
						</li>
						<li>
							<Link href='/about'>О нас</Link>
						</li>
						<li>
							<Link href='/contacts'>Контакты</Link>
						</li>
					</HeaderMenu>
				</LeftBlock>
				<RightBlock>
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
					<StyledSearch onSearch={text => router.push(`/search?search=${text}`)} />
					<Burger onClick={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen}>
						<div />
						<div />
						<div />
					</Burger>
				</RightBlock>
			</StyledContainer>
		</StyledHeader>
	);
});
