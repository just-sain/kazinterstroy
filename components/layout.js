import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// components
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
const Main = styled.main`
	max-width: var(--container-s);
	width: 100%;
	margin: 0 auto;
	padding: calc(var(--header-height) + 3rem) 0 15rem;
	z-index: 10;

	display: grid;
	justify-items: center;
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
			<Footer />
		</Wrapper>
	);
};

export default Layout;
