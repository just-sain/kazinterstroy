import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// components
import Image from 'next/image';
import { Header } from './header';
import { Menu } from './menu';
import { Footer } from './footer';
import styled from '@emotion/styled';

const Wrapper = styled.div`
	min-height: 100vh;

	background: rgb(var(--bg));

	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 1fr auto;
`;

// main
const Main = styled.div`
	max-width: var(--container-l);
	width: 100%;
	margin: 0 auto;
	padding: calc(var(--header-height) + 3rem) 0 15rem;
	z-index: 10;

	display: grid;
	justify-items: center;

	@media screen and (max-width: 1470px) {
		padding: calc(var(--header-height) + 3rem) 1rem 15rem;
	}
`;

const Bg = styled.div`
	width: 100%;
	height: 100%;

	position: fixed;
	top: 45%;
	left: 50%;
`;

const BgImg = styled(Image)`
	opacity: 0.05;
	filter: grayscale(100%);

	pointer-events: none;
	object-fit: contain;
	object-position: center;

	transform: translate(-50%, -50%);

	@media screen and (max-width: 900px) {
		width: 120%;
	}
	@media screen and (max-width: 600px) {
		width: 60rem;
	}
`;

const SnowEffect = styled.div`
	width: 100%;
	height: 100%;
	opacity: 0.2;

	pointer-events: none;
	background-image: url('/snow1.png'), url('/snow2.png'), url('/snow3.png');

	position: fixed;
	top: 0;
	left: 0;

	animation: snow 30s linear infinite;
`;

const Layout = ({ children }) => {
	const { events } = useRouter();
	const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

	useEffect(() => {
		const handleRouteChange = url => {
			setIsBurgerMenuOpen(false);
		};

		events.on('routeChangeStart', handleRouteChange);

		return () => {
			events.off('routeChangeStart', handleRouteChange);
		};
	}, []);

	return (
		<Wrapper>
			<Header isBurgerMenuOpen={isBurgerMenuOpen} setIsBurgerMenuOpen={setIsBurgerMenuOpen} />
			<Menu isOpen={isBurgerMenuOpen} setIsBurgerMenuOpen={setIsBurgerMenuOpen} />
			<Main>{children}</Main>
			<Bg>
				<BgImg src='/bg-item.png' alt='bg' priority fill sizes='100%' />
			</Bg>
			<SnowEffect />
			<Footer />
		</Wrapper>
	);
};

export default Layout;
