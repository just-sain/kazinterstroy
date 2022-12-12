import { useContext, useEffect, useState } from 'react';
import { AppContext } from './context';
// components
import Link from 'next/link';
import styled from '@emotion/styled';
import { Container } from './container';
import { List } from './list';
import { Button } from './button';
import { css } from '@emotion/css';

const StyledMenu = styled.menu`
	width: 100%;
	max-height: calc(100vh - var(--header-height));
	z-index: 90;
	padding: 3rem 0 5rem;
	overflow: hidden;

	background: rgba(var(--primary), 0.9);
	backdrop-filter: blur(0.5rem);

	color: rgb(var(--white));

	position: fixed;
	top: var(--header-height);
	left: 0;

	transform: translateY(${({ isOpen }) => (isOpen ? `0` : `-200%`)});
	transition: transform 0.4s ease 0s;
`;

const StyledContainer = styled(Container)`
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	gap: 3rem;
`;

// isOpen: boolean;

export const Menu = ({ isOpen, setIsMenuOpen, ...props }) => {
	const { menu } = useContext(AppContext);
	const [filteredMenu, setFilteredMenu] = useState(menu.filter(m => m.level === 1).filter((m, i) => i < 10));

	return (
		<StyledMenu isOpen={isOpen} {...props}>
			<StyledContainer maxW='m'>
				<List color='white' columns='1' gap='s'>
					<h6>Каталог</h6>
					{filteredMenu.map(m => (
						<li key={m.id}>
							<Link href={`/category/${m.id}`} onClick={() => setIsMenuOpen(false)}>
								{m.name}
							</Link>
						</li>
					))}
					<li
						className={css`
							margin-top: 0.5rem;
						`}>
						<Button size='s' background='white' color='black' href='/category' withArrow>
							Просмотреть Все
						</Button>
					</li>
				</List>
				<List color='white' columns='1' gap='s'>
					<h6>Медиа</h6>
					<li>
						<Link href='/'>Главная</Link>
					</li>
					<li>
						<Link href='/contact'>О нас</Link>
					</li>
					<li>
						<Link href='/contact'>Контакты</Link>
					</li>
				</List>
			</StyledContainer>
		</StyledMenu>
	);
};
