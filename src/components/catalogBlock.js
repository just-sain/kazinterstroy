import { useRouter } from 'next/router';
import { memo, useContext, useState } from 'react';
import { Store } from '../utils/store';
// components
import Link from 'next/link';
import { BsArrowBarLeft, BsArrowReturnRight, BsArrowBarRight } from 'react-icons/bs';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const Wrapper = styled.div`
	width: 100%;
`;

const Box = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 2fr;

	@media screen and (max-width: 850px) {
		grid-template-columns: 1fr;
	}
`;

const FirstLevelMenu = styled.ul`
	width: 100%;
	padding: 1rem;
	opacity: 0;
	animation: fade-right 0.5s ease 0s forwards;
	@media screen and (max-width: 850px) {
		display: ${({ isMenuSelect }) => (isMenuSelect ? `none` : `block`)};
	}
`;

const MenuItem = styled.li`
	padding: 1rem 2.5rem 1rem 1rem;
	overflow: hidden;
	cursor: pointer;
	background: rgba(var(--primary), 0.2);
	border: 0.1rem solid rgb(var(--bg));
	position: relative;
	top: 0;
	left: 0;
	font-size: 1.6rem;
	font-weight: 500;
	transition: background 0.4s ease 0s, left 0.3s ease 0s, top 0.3s ease 0s, color 0.3s ease 0s;
	div {
		cursor: alias;
		color: rgb(var(--white));
		font-size: 2rem;
		position: absolute;
		top: 50%;
		right: 0.75rem;
		transform: translate(0, -200%);
		transition: transform 0.4s ease 0s;
	}
	svg {
		position: relative;
		top: 0.25rem;
		left: 0.5rem;
	}
	&:hover {
		background: rgb(var(--black));
		border: 0.1rem solid rgb(var(--bg));
		color: rgb(var(--white));
		top: -0.3rem;
		left: 0.8rem;
		div {
			transform: translate(0, -50%);
		}
	}
	${({ isSelected }) =>
		isSelected &&
		css`
			background: rgb(var(--primary));
			border: 0.1rem solid rgb(var(--bg));
			color: rgb(var(--white));
			top: -0.3rem;
			left: -0.8rem;
			a {
				transform: translate(0, -50%);
			}
		`}
`;

const SecondLevelMenu = styled.div`
	width: 100%;
	padding: 2rem;
	opacity: 0;
	background: rgb(var(--light-gray), 0.1);
	border-radius: 0 1.5rem 1.5rem 0;
	animation: fade-left 0.5s ease 0s forwards;
	@media screen and (max-width: 850px) {
		display: ${({ isMenuSelect }) => (!isMenuSelect ? `none` : `block`)};
	}
`;

const Heading = styled.h2`
	margin-bottom: 1.5rem;
	display: flex;
	justify-content: flex-start;
	align-items: flex-end;
	gap: 0.5rem;
	color: rgb(var(--black));
	font-size: 2.4rem;
	font-weight: 500;
	a {
		cursor: alias;
	}
`;

const BackArrow = styled(BsArrowBarLeft)`
	margin-right: 1rem;
	display: none;
	cursor: pointer;
	@media screen and (max-width: 850px) {
		display: block;
	}
`;

const Title = styled.h1`
	margin-bottom: 1.5rem;
	color: rgb(var(--black));
	text-align: center;
	font-size: 3.4rem;
	font-weight: 400;
	a {
		cursor: alias;
	}
`;

const LoaderContainer = styled.div`
	width: 100%;
	padding: 7.5rem 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Loader = styled.span`
	width: 7rem;
	height: 7rem;
	border-radius: 50%;
	display: inline-block;
	position: relative;
	border: 0.5rem solid;
	border-color: rgb(var(--black)) rgb(var(--black)) transparent;
	box-sizing: border-box;
	animation: catalogRotation 1s linear infinite;
	&::after {
		content: '';
		box-sizing: border-box;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		border: 0.4rem solid;
		border-color: transparent rgb(var(--primary));
		width: 5rem;
		height: 5rem;
		border-radius: 50%;
		animation: catalogRotationBack 0.5s linear infinite;
		transform-origin: center center;
	}
`;

export const CatalogBlock = memo(({ ...props }) => {
	const { state } = useContext(Store);
	const { menu } = state;

	return (
		<Wrapper {...props}>
			<Title>Наш Каталог</Title>
			{!menu ? (
				<LoaderContainer>
					<Loader />
				</LoaderContainer>
			) : (
				<Category menu={menu} />
			)}
		</Wrapper>
	);
});

const Category = memo(({ menu, ...props }) => {
	const router = useRouter();

	const [firstLevel] = useState(menu ? menu.filter(m => m.level === 1) : []);
	const [secondLevel] = useState(menu ? menu.filter(m => m.level === 2) : []);
	const [thirdLevel] = useState(menu ? menu.filter(m => m.level === 3) : []);
	const [fourthLevel] = useState(menu ? menu.filter(m => m.level === 4) : []);
	const [fifthLevel] = useState(menu ? menu.filter(m => m.level === 4) : []);
	const [selectMenu, setSelectMenu] = useState(firstLevel[0]);
	const [isMenuSelect, setIsMenuSelect] = useState(false);

	const onFirstLevelMenuClick = selectedMenu => {
		setSelectMenu(selectedMenu);
		setIsMenuSelect(true);
	};

	return (
		<Box {...props}>
			<FirstLevelMenu isMenuSelect={isMenuSelect}>
				{firstLevel.map(first => (
					<MenuItem
						key={first.id}
						isSelected={selectMenu.id === first.id}
						onClick={() => onFirstLevelMenuClick(first)}>
						{first.name}
						<div>
							<BsArrowBarRight />
						</div>
					</MenuItem>
				))}
			</FirstLevelMenu>
			<SecondLevelMenu isMenuSelect={isMenuSelect}>
				<ul>
					<Heading>
						<BackArrow onClick={() => setIsMenuSelect(false)} />
						{selectMenu.name}
					</Heading>
					{secondLevel
						.filter(second => selectMenu.left < second.left && second.right < selectMenu.right)
						.map(second => (
							<MenuItem key={second.id} onClick={() => router.push(`/category/${second.id}`)}>
								{second.name}
								<Link href={`/category/${second.id}`}>
									<BsArrowReturnRight />
								</Link>
							</MenuItem>
						))}
				</ul>
			</SecondLevelMenu>
		</Box>
	);
});
