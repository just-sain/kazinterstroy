import { useRouter } from 'next/router';
import { memo, useContext, useState } from 'react';
import { Store } from '../utils/store';
import { catalogData } from '../data/catalog';
// components
import { BsChevronRight } from 'react-icons/bs';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Container } from './container';

const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	padding-top: var(--header-height);
	z-index: 80;

	background: rgb(var(--bg));

	position: fixed;
	top: 0;
	left: 0;
`;

const StyledContainer = styled(Container)`
	width: var(--container-l);
	height: calc(100vh - var(--header-height));
	margin: 0 auto;
`;

// loader
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

export const Catalog = memo(({ ...props }) => {
	const { state } = useContext(Store);
	const { menu } = state;

	return (
		<Wrapper>
			<StyledContainer maxW='l'>
				{!menu ? (
					<LoaderContainer>
						<Loader />
					</LoaderContainer>
				) : (
					<Category menu={menu} />
				)}
			</StyledContainer>
		</Wrapper>
	);
});

// Category
const Box = styled.div`
	width: 100%;
	height: calc(100vh - var(--header-height));
	display: grid;
	grid-template-columns: 30rem 1fr;

	@media screen and (max-width: 850px) {
		grid-template-columns: 1fr;
	}
`;

// left side
const LeftSide = styled.ul`
	width: 100%;
	padding: 0.5rem 1rem 0.5rem 0;
	opacity: 0;
	overflow-x: hidden;
	overflow-y: auto;

	display: grid;
	align-content: flex-start;
	gap: 1rem;

	animation: fade-right 0.5s ease 0s forwards;

	@media screen and (max-width: 850px) {
		display: ${({ isMenuSelect }) => (isMenuSelect ? `none` : `grid`)};
	}
`;

const LeftSideItem = styled.li`
	padding: 1rem;

	display: grid;
	grid-template-columns: 1.5rem 1fr 1.5rem;
	align-items: center;
	gap: 1rem;

	cursor: pointer;
	border-radius: 1rem;

	font-size: 1.6rem;
	font-weight: 500;

	transition: background 0.4s ease 0s, left 0.3s ease 0s, top 0.3s ease 0s, color 0.3s ease 0s;

	svg {
		font-size: 2rem;
	}

	&:hover {
		background: rgba(var(--real-gray), 0.15);
		color: rgb(var(--secondary));
	}

	${({ isSelected }) =>
		isSelected &&
		css`
			background: rgba(var(--real-gray), 0.25);
			color: rgb(var(--primary));
		`}
`;

// right side
const RightSide = styled.div`
	width: 100%;
	padding: 1rem 0 0.5rem 2rem;
	opacity: 0;
	overflow-x: hidden;
	overflow-y: auto;

	animation: fade-left 0.5s ease 0s forwards;

	@media screen and (max-width: 850px) {
		display: ${({ isMenuSelect }) => (!isMenuSelect ? `none` : `block`)};
	}
`;

const Heading = styled.h3`
	margin-bottom: 3rem;

	font-size: 2.8rem;
	font-weight: 700;
`;

const ListContainer = styled.div`
	width: 100%;

	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 3rem;
`;

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
			<LeftSide isMenuSelect={isMenuSelect}>
				{catalogData.map(item => (
					<LeftSideItem
						key={item.id}
						isSelected={selectMenu.id === item.id}
						onClick={() => onFirstLevelMenuClick(item)}>
						{item.icon}
						<span>{item.name}</span>
						<BsChevronRight />
					</LeftSideItem>
				))}
			</LeftSide>
			<RightSide isMenuSelect={isMenuSelect}>
				<Heading>
					{selectMenu.name}
					<br />
					<span style={{ color: 'green' }}>id: {selectMenu.id}</span>
				</Heading>

				<ListContainer>
					{/* {secondLevel
						.filter(second => selectMenu.left < second.left && second.right < selectMenu.right)
						.map(second => (
							<li key={second.id} onClick={() => router.push(`/category/${second.id}`)}>
								{second.name}
							</li>
						))} */}
				</ListContainer>
			</RightSide>
		</Box>
	);
});
