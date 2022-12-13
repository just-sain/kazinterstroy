import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import format from 'date-fns/format';
// components
import Link from 'next/link';
import { Container } from './container';
import { List } from './list';
import { Search } from './search';
import { Menu } from './menu';
import { AiOutlineUser } from 'react-icons/ai';
import styled from '@emotion/styled';
import { css } from '@emotion/css';

const Wrapper = styled.div`
	min-height: 100vh;

	background: rgb(var(--bg));

	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 1fr auto;
`;

// header
const Header = styled.header`
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

const Logo = styled.div`
	opacity: 0;

	animation: fade-down 0.5s ease 0.9s forwards;

	a {
		display: flex;
		align-items: center;
		gap: 1rem;

		color: rgb(var(--primary));
		line-height: 1rem;
		font-size: 2.6rem;
		font-weight: var(--font-bold);

		img {
			width: auto;
			height: 5rem;
		}
	}
`;

const Block = styled.div`
	opacity: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 2rem;

	animation: fade-down 0.5s ease 1.2s forwards;
`;

const Burger = styled.div`
	width: 4rem;
	height: 2.5rem;
	cursor: pointer;

	display: flex;
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
			`
			background: rgb(var(--error));

			&:first-of-type {
				transform: rotate(45deg) translate(1rem, .2rem);
			}
			&:nth-of-type(2) {
				transform: rotate(-45deg) translate(.6rem, .1rem);
			}

			&:last-of-type { opacity: 0; }
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
`;

// main
const Main = styled.main`
	max-width: var(--container-s);
	width: 100%;
	margin: 0 auto;
	padding: calc(var(--header-height) + 3rem) 0 15rem;
	z-index: 10;

	display: grid;
	justify-items: center;

	@keyframes fade-down {
		from {
			opacity: 0;
			transform: translateY(-5rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
`;

// footer
const Footer = styled.footer`
	width: 100%;
	padding: 5rem 0 3rem;
	z-index: 50;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: start;

	background: rgb(var(--black));

	color: rgb(var(--white));

	h6 {
		color: rgb(var(--primary));
	}
`;

const Map = styled.iframe`
	width: 100%;
	height: 25rem;

	border: none;
	border-radius: 1.5rem;

	@media screen and (max-width: 720px) {
		height: 30rem;
	}
	@media screen and (max-width: 500px) {
		height: 25rem;
	}
	@media screen and (max-width: 350px) {
		height: 20rem;
	}
`;

const Layout = ({ children }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { events } = useRouter();

	useEffect(() => {
		const handleRouteChange = url => {
			setIsMenuOpen(false);
		};

		events.on('routeChangeStart', handleRouteChange);

		return () => {
			events.off('routeChangeStart', handleRouteChange);
		};
	}, []);

	return (
		<Wrapper>
			<Header isMenuOpen={isMenuOpen}>
				<Container
					maxW='l'
					className={css`
						height: 100%;

						display: flex;
						justify-content: space-between;
						align-items: center;
					`}>
					<Logo>
						<Link href='/'>
							<img src='/logo.png' />
							KazInterStroy
						</Link>
					</Logo>
					<Block>
						<Search onSearch={text => router.push(`/search?search=${text}`)} />
						<AiOutlineUser
							className={css`
								width: 2.8rem;
								height: 2.8rem;

								cursor: pointer;
								fill: rgb(var(--black));

								transition: fill 0.4s ease 0s;

								&:hover {
									fill: rgb(var(--primary));
								}
							`}
						/>
						<Burger onClick={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen}>
							<div />
							<div />
							<div />
						</Burger>
					</Block>
				</Container>
			</Header>
			<Menu isOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
			<Main>{children}</Main>
			<Footer>
				<Container
					maxW='l'
					className={css`
						display: flex;
						flex-direction: column;
						align-items: flex-start;
						gap: 3rem;
					`}>
					<Container
						maxW='m'
						className={css`
							display: grid;
							grid-template-columns: 1fr 1fr 1fr 40rem;
							align-items: flex-start;
							gap: 3rem;

							@media screen and (max-width: 1050px) {
								grid-template-columns: 1fr 2fr;
								align-items: flex-start;
								gap: 2rem;

								ul {
									grid-column: 2 3;
									grid-row: 2 3;
								}
							}

							@media screen and (max-width: 720px) {
								grid-template-columns: 1fr;
								align-items: flex-start;
								gap: 2rem;
							}
						`}>
						<List>
							<h6>Контакты</h6>
							<li>
								<a href='tel:+77083266420'>+7 (708) 326 64 20</a>
							</li>
							<li>Городской: 323 10 30</li>
							<li>
								<a href='mailto:kazinterstroy@mail.ru'>kazinterstroy@mail.ru</a>
							</li>
							<li>
								<a href='tel:+77013597588'>Обратиться к менеджеру</a>
							</li>
						</List>
						<List>
							<h6>Адрес</h6>
							<li>Республика Казахстан, г. Алматы, ул. Масанчи 78 офис 400</li>
							<li>Индекс: 050012</li>
							<li>Режим работы: ПН - ПТ, 9:00 - 18:00</li>
						</List>
						<List>
							<h6>Партнерам</h6>
							<li>
								<a href='#'>API</a>
							</li>
							<li>
								<a href='#'>Новости</a>
							</li>
							<li>
								<a href='#'>Акции</a>
							</li>
							<li>
								<a href='#'>Продукция под заказ</a>
							</li>
						</List>
						<Map src='https://yandex.ru/map-widget/v1/?um=constructor%3A09c7f4a4a087808079f28245bf8ab598e9609a06e555f8a5586d6e7ed9ab7da3&amp;source=constructor'></Map>
					</Container>
					<div
						className={css`
							color: rgb(var(--light-gray));
						`}>
						Авторское право © {format(new Date(), 'yyyy')} KazInterStroy All rights reserved.
					</div>
				</Container>
			</Footer>
		</Wrapper>
	);
};

export default Layout;
