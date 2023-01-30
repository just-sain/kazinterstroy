import { memo, useContext, useState } from 'react';
import { Store } from '../lib/store';
// components
import Image from 'next/image';
import { Container } from './container';
import { Preloader } from './preloader';
// icons
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';
// styles
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Link from 'next/link';

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
	max-width: var(--container-l);
	height: calc(100vh - var(--header-height));
	margin: 0 auto;
`;

export const Catalog = memo(({ closeCatalog, ...props }) => {
	const { state } = useContext(Store);
	const { menu, catalog } = state;

	return (
		<Wrapper {...props}>
			<StyledContainer maxW='l'>
				{!menu || !catalog ? <Preloader /> : <Category menu={menu} catalog={catalog} closeCatalog={closeCatalog} />}
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

	@media screen and (max-width: 220px) {
		word-break: break-all;
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
	grid-template-columns: auto 1fr auto;
	align-items: center;
	gap: 0.5rem;

	cursor: pointer;
	border-radius: 1rem;

	font-size: 1.6rem;
	font-weight: 500;

	transition: background 0.4s ease 0s, left 0.3s ease 0s, top 0.3s ease 0s, color 0.3s ease 0s;

	svg {
		font-size: 2rem;

		@media screen and (max-width: 570px) {
			display: none;
		}
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

	@media screen and (max-width: 570px) {
		grid-template-columns: auto 1fr;
	}
`;

const LeftSideIcon = styled.div`
	width: 2.2rem;
	height: 2.2rem;

	position: relative;
`;

// right side
const RightSide = styled.div`
	width: 100%;
	padding: 1rem 0 2rem 3rem;
	opacity: 0;
	overflow-x: hidden;
	overflow-y: auto;

	animation: fade-left 0.5s ease 0s forwards;

	@media screen and (max-width: 850px) {
		padding: 0.5rem 1rem 0.5rem 0;

		display: ${({ isMenuSelect }) => (!isMenuSelect ? `none` : `block`)};
	}
`;

const Heading = styled.h3`
	margin-bottom: 3rem;

	color: rgb(var(--black));
	font-size: 3rem;
	font-weight: 700;

	@media screen and (max-width: 850px) {
		margin-bottom: 1.5rem;
	}

	@media screen and (max-width: 570px) {
		font-size: 2.4rem;
	}
`;

const BackIcon = styled.div`
	width: min-content;
	margin-bottom: 2rem;

	display: none;
	align-items: center;
	justify-content: flex-start;
	gap: 0.5rem;
	cursor: pointer;

	color: rgba(var(--black));
	font-size: 1.6rem;
	font-weight: 500;

	svg {
		font-size: 2rem;
	}

	@media screen and (max-width: 850px) {
		display: flex;
	}
`;

const ListContainer = styled.div`
	width: 100%;

	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	justify-items: flex-start;
	align-items: flex-start;
	gap: 1.5rem;

	@media screen and (max-width: 850px) {
		grid-template-columns: 1fr 1fr;
	}

	@media screen and (max-width: 570px) {
		grid-template-columns: 1fr;
	}
`;

const ListColumn = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	justify-items: flex-start;
	align-items: flex-start;
	gap: 3rem;
`;

const List = styled.ul`
	padding-left: 0.5rem;

	display: grid;
	align-content: flex-start;
	gap: 1rem;
`;

const ListTitle = styled.h4`
	color: rgb(var(--black));
	font-size: 1.8rem;
	font-weight: 700;

	@media screen and (max-width: 570px) {
		font-size: 1.6rem;
	}
`;

const ListItem = styled.li`
	color: rgb(var(--gray));
	font-size: 1.4rem;
	font-weight: 500;

	a:hover {
		text-decoration: underline;
		color: rgb(var(--primary));
	}
`;

const Category = memo(({ menu, catalog, closeCatalog, ...props }) => {
	const [selectCatalog, setSelectCatalog] = useState(catalog[0]);
	const [isCatalogSelect, setIsCatalogSelect] = useState(false);
	const [selectCatalogCategories, setSelectCatalogCategories] = useState(
		menu.filter(el => selectCatalog.categories.indexOf(el.id) > -1)
	);

	//  for divide category to 3 columns
	let selectCatalogCategoriesColumns = [];
	for (let i = 0; i < selectCatalogCategories.length + 1; i += Math.ceil(selectCatalogCategories.length / 3)) {
		const nextValue = i + Math.ceil(selectCatalogCategories.length / 3);
		const menuPart = selectCatalogCategories.slice(i, nextValue);

		selectCatalogCategoriesColumns.push(menuPart);
	}

	// events
	const onCatalogClick = selectedCatalog => {
		setSelectCatalog(selectedCatalog);
		setSelectCatalogCategories(menu.filter(el => selectedCatalog.categories.indexOf(el.id) > -1));
		setIsCatalogSelect(true);
	};

	return (
		<Box {...props}>
			<LeftSide isMenuSelect={isCatalogSelect}>
				{catalog.map(item => (
					<LeftSideItem
						key={item.id}
						isSelected={selectCatalog.id === item.id}
						onClick={() => onCatalogClick(item)}>
						<LeftSideIcon>
							<Image src={item.icon} alt={item.name} fill priority />
						</LeftSideIcon>
						<span>{item.name}</span>
						<BsChevronRight />
					</LeftSideItem>
				))}
			</LeftSide>
			<RightSide isMenuSelect={isCatalogSelect}>
				<Heading>
					<BackIcon onClick={() => setIsCatalogSelect(false)}>
						<BsChevronLeft />
						<span>Назад</span>
					</BackIcon>
					{selectCatalog.name}
				</Heading>
				<ListContainer>
					{selectCatalogCategoriesColumns.map(columnArray => (
						<ListColumn key={columnArray.id}>
							{columnArray.map(firstLevel => (
								<List key={firstLevel.id}>
									<ListTitle>{firstLevel.name}</ListTitle>
									{menu
										.filter(
											secondLevel =>
												firstLevel.left < secondLevel.left && secondLevel.right < firstLevel.right
										)
										.map(secondLevel => (
											<ListItem key={secondLevel.id}>
												<Link href={`/category/${secondLevel.id}`} onClick={closeCatalog}>
													{secondLevel.name}
												</Link>
											</ListItem>
										))}
								</List>
							))}
						</ListColumn>
					))}
				</ListContainer>
			</RightSide>
		</Box>
	);
});

/*
? code for divide category to 3 columns
const menu = [1, 3, 4, 1, 4, 1, 2, 1, 1, 1];
let result = [];

console.log('/', Math.ceil(menu.length / 3))

for (let i = 0; i < menu.length + 1; i += Math.ceil(menu.length / 3)) {
    const nextValue = i + Math.ceil(menu.length / 3);
    const menuPart = menu.slice(i, nextValue);

    console.log('part', i, nextValue, menuPart);
    result.push(menuPart);
}

console.log('result:', result);
*/
