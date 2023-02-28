import { useReducedMotion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../lib/store';
// components
import { Article } from './article';
import { MirageArticle } from './mirage-article';
// icons
import { MdOutlineSort } from 'react-icons/md';
// styles
import styled from '@emotion/styled';

export const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 3rem;

	@media screen and (max-width: 1050px) {
		grid-template-columns: repeat(3, 1fr);
	}
	@media screen and (max-width: 720px) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media screen and (max-width: 400px) {
		grid-template-columns: 1fr;
	}
`;

// sort
const Panel = styled.div`
	width: 100%;
`;

const Sort = styled.div`
	margin-bottom: 3rem;

	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 1rem;

	h3 {
		color: rgb(var(--black));
		font-size: 2rem;
		font-weight: 400;
	}
`;

const Menu = styled.div`
	width: 20rem;

	cursor: pointer;
	background: rgb(var(--primary));
	border-start-end-radius: 0.75rem;
	border-start-start-radius: 0.75rem;

	color: rgb(var(--white));
	font-size: 1.6rem;
	font-weight: 400;

	position: relative;

	p {
		padding: 0.75rem 1.5rem;

		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
`;

const DropDownMenu = styled.div`
	width: 100%;
	z-index: 5;
	overflow: hidden;

	background: rgb(var(--bg));
	border-end-end-radius: 0.75rem;
	border-end-start-radius: 0.75rem;

	position: absolute;
	top: 100%;
	left: 0;

	transition: opacity 0.4s ease 0s, transform 0.4s ease 0s;
`;

const DropDownMenuItem = styled.div`
	width: 100%;
	height: auto;
	padding: 1rem 1.5rem;

	border-bottom: 0.1rem solid rgb(var(--primary));
	${({ active }) => (active ? `background: rgb(var(--black));` : ``)}

	color: rgb(var(--${({ active }) => (active ? `white` : `primary`)}));

	&:last-of-type {
		border-bottom: none;
	}
`;

// elements: []
export const Elements = ({ elements }) => {
	const shouldReduceMotion = useReducedMotion(); // for animation on sort
	const { state, dispatch } = useContext(Store);
	const {
		cart: { cartItems },
	} = state;

	// sort
	const sorts = [
		{ name: 'Сначала дешевые', property: 'price-down-to-up' },
		{ name: 'Сначала дорогие ', property: 'price-up-to-down' },
		{ name: 'от А до Я', property: 'title' },
		{ name: 'от Я до А', property: 'title-reverse' },
	];

	// states
	const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState(false);
	const [selectedSort, setSelectedSort] = useState(sorts[0]);
	const [sortedElements, setSortedElements] = useState([]);

	useEffect(() => {
		if (!!elements && elements.length > 0) {
			setSortedElements(sortElements(0));
			setSelectedSort(sorts[0]);
			setIsDropDownMenuOpen(false);
		}
	}, [elements]);

	const sortElements = i => {
		if (sorts[i].property === 'price-up-to-down') {
			return elements.sort((a, b) => (a.price2 > b.price2 ? -1 : 1));
		} else if (sorts[i].property === 'price-down-to-up') {
			return elements.sort((a, b) => (a.price2 < b.price2 ? -1 : 1));
		} else if (sorts[i].property === 'title') {
			return elements.sort((a, b) => {
				const nameA = a.name.toLowerCase(),
					nameB = b.name.toLowerCase();

				if (nameA < nameB) return -1; // from a to z
				if (nameA > nameB) return 1;
				return 0; // not sort
			});
		} else if (sorts[i].property === 'title-reverse') {
			return elements.sort((a, b) => {
				const nameA = a.name.toLowerCase(),
					nameB = b.name.toLowerCase();

				if (nameA > nameB) return -1; // from z to a
				if (nameA < nameB) return 1;
				return 0; // not sort
			});
		} else {
			return elements;
		}
	};

	const handleDropDownMenuClick = i => {
		setIsDropDownMenuOpen(false);
		setSelectedSort(sorts[i]);

		if (!!elements.length) {
			setSortedElements(sortElements(i));
		}
	};

	return (
		<>
			<Panel>
				<Sort>
					<h3>Сортировка</h3>
					<Menu>
						<p onClick={() => setIsDropDownMenuOpen(!isDropDownMenuOpen)}>
							<MdOutlineSort />
							{selectedSort.name}
						</p>
						{isDropDownMenuOpen && (
							<DropDownMenu>
								{sorts.map((s, i) => (
									<DropDownMenuItem
										key={s.property}
										onClick={() => handleDropDownMenuClick(i)}
										active={selectedSort.property === s.property}>
										{s.name}
									</DropDownMenuItem>
								))}
							</DropDownMenu>
						)}
					</Menu>
				</Sort>
			</Panel>
			{!!sortedElements.length ? (
				<Grid>
					{!!sortedElements.length &&
						sortedElements.map(a => (
							<Article
								key={a.article}
								articleData={a}
								href={`/category/${a.category}/${a.article}`}
								layout={shouldReduceMotion ? false : true}
								isInCart={cartItems.find(e => e.article === Number(a.article))}
								dispatch={dispatch}
							/>
						))}
				</Grid>
			) : (
				<Grid>
					<MirageArticle />
					<MirageArticle />
					<MirageArticle />
					<MirageArticle />
					<MirageArticle />
					<MirageArticle />
					<MirageArticle />
				</Grid>
			)}
		</>
	);
};
