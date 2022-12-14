// components
import Link from 'next/link';
import styled from '@emotion/styled';
import { Container } from './container';

const StyledMenu = styled.menu`
	width: 100vw;
	height: 100vh;
	z-index: 90;
	padding: calc(var(--header-height) + 3rem) 0 5rem;
	overflow: hidden;

	background: rgba(var(--primary), 0.9);
	backdrop-filter: blur(0.5rem);

	color: rgb(var(--white));

	position: fixed;
	top: 0;
	left: 0;

	transform-origin: left;
	transform: scaleX(${({ isOpen }) => (isOpen ? `1` : `0`)});
	transition: transform 0.8s ease 0s;
`;

const StyledContainer = styled(Container)`
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	gap: 3rem;
`;

// isOpen: boolean;

export const Menu = ({ isOpen, setIsMenuOpen, ...props }) => {
	return (
		<StyledMenu isOpen={isOpen} {...props}>
			<StyledContainer maxW='m'>
				<div>this is menu</div>
			</StyledContainer>
		</StyledMenu>
	);
};
