import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// components
import styled from '@emotion/styled';
import Image from 'next/image';
import { Footer } from './footer';
import { Header } from './header';
import { Menu } from './menu';

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
			<Footer />
		</Wrapper>
	);
};

export default Layout;
