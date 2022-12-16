import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// components
import { motion } from 'framer-motion';
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
	max-width: var(--container-s);
	width: 100%;
	margin: 0 auto;
	padding: calc(var(--header-height) + 3rem) 0 15rem;
	z-index: 10;

	display: grid;
	justify-items: center;

	@media screen and (max-width: 1070px) {
		padding: calc(var(--header-height) + 3rem) 1rem 15rem;
	}
`;

const BgItem = styled.img`
	width: 100%;
	height: auto;
	opacity: 0.05;

	pointer-events: none;
	object-fit: contain;
	object-position: center;

	position: fixed;
	top: 45%;
	left: 50%;

	transform: translate(-50%, -50%);

	@media screen and (max-width: 900px) {
		width: 120%;
	}
	@media screen and (max-width: 600px) {
		width: 60rem;
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
			<Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
			<Menu isOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
			<Main>{children}</Main>
			<BgItem src='/bg-item.png' />
			<Footer />
		</Wrapper>
	);
};

export default Layout;
