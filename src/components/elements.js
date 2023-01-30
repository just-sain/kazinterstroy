import { useContext, useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Store } from '../lib/store';
// components
import { Article } from './article';
import { MirageArticle } from './mirage-article';
// icons
import { MdOutlineSort } from 'react-icons/md';
import { BiHide } from 'react-icons/bi';
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
	width: 18rem;

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

	color: rgb(var(--primary));

	&:last-of-type {
		border-bottom: none;
	}
`;

const HideIcon = styled.button`
	height: 100%;
	cursor: pointer;

	display: flex;
	align-items: center;

	color: rgb(var(--${({ active }) => (active ? `primary` : `black`)}));
	font-size: 2.8rem;

	transition: color 0.3s ease 0s;

	&:hover {
		color: rgb(var(--secondary));
	}
`;

// elements: []
export const Elements = ({ isReady, elements }) => {
	const shouldReduceMotion = useReducedMotion(); // for animation on sort
	const { state, dispatch } = useContext(Store);
	const {
		cart: { cartItems }
	} = state;

	// sort
	const sorts = [
		{ name: 'По цене', property: 'price' },
		{ name: 'По алфавиту', property: 'title' }
	];
	const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState(false);
	const [selectedSort, setSelectedSort] = useState(sorts[0]);
	const [sortedElements, setSortedElements] = useState([]);
	const [showHidden, setShowHidden] = useState(true);

	useEffect(() => {
		if (!!elements && elements.length > 0) {
			setSortedElements(elements.sort((a, b) => (a.price1 > b.price1 ? -1 : 1)));
			handleShowHidden();
		}
	}, [elements]);

	// events
	const handleShowHidden = () => {
		setShowHidden(!showHidden);

		if (!showHidden) {
			// hide elements which quantity equal 0
			setSortedElements(sortedElements.filter(el => el.quantity !== 0));
		} else {
			// show all elements
			handleSortElements(sorts.findIndex(s => s.property === selectedSort.property));
		}
	};

	const handleSortElements = i => {
		if (isReady && elements.length) {
			if (selectedSort.property === sorts[i].property) {
				setSortedElements(elements.reverse());
			} else if (sorts[i].property === 'price') {
				setSortedElements(elements.sort((a, b) => (a.price1 > b.price1 ? -1 : 1)));
			} else if (sorts[i].property === 'title') {
				setSortedElements(
					elements.sort((a, b) => {
						var nameA = a.name.toLowerCase(),
							nameB = b.name.toLowerCase();
						if (nameA < nameB) return -1;
						if (nameA > nameB) return 1;
						return 0;
					})
				);
			}
		}
	};

	const handleDropDownMenuClick = i => {
		setIsDropDownMenuOpen(false);
		setSelectedSort(sorts[i]);
		handleSortElements(i);
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
									<DropDownMenuItem key={s.property} onClick={() => handleDropDownMenuClick(i)}>
										{s.name}
									</DropDownMenuItem>
								))}
							</DropDownMenu>
						)}
					</Menu>
					<HideIcon title='скрыть элементы которых нет в наличии' active={showHidden} onClick={handleShowHidden}>
						<BiHide />
					</HideIcon>
				</Sort>
			</Panel>
			<>
				{isReady && !!sortedElements.length ? (
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
		</>
	);
};
