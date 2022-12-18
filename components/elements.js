import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Article } from './article';
import { MirageArticle } from './mirage-article';
import { MdOutlineSort } from 'react-icons/md';

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
	padding: 0.75rem 1.5rem;

	cursor: pointer;
	background: rgb(var(--primary));
	border-start-end-radius: 0.75rem;
	border-start-start-radius: 0.75rem;

	color: rgb(var(--white));
	font-size: 1.6rem;
	font-weight: 400;

	position: relative;

	p {
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

// elements: []
export const Elements = ({ isReady, elements, setElements }) => {
	// sort
	const sorts = [
		{ name: 'По новинке', property: 'newest' },
		{ name: 'По популярности', property: 'popular' },
		{ name: 'По цене', property: 'price' },
		{ name: 'По алфавиту', property: 'title' }
	];
	const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState(false);
	const [selectedSort, setSelectedSort] = useState(sorts[0]);

	useEffect(() => {
		if (isReady && elements.length) {
			if (selectedSort.property === 'newest') {
				console.log(selectedSort.property);
				const sortedElements = [];
				sortedElements.push(...elements.filter(e => e.isnew));
				sortedElements.push(...elements.filter(e => !e.isnew));
				setElements(sortedElements);
			} else if (selectedSort.property === 'price') {
				setElements(elements.sort((a, b) => (a.price1 > b.price2 ? -1 : 1)));
				console.log();
			} else if (selectedSort.property === 'title') {
				console.log(selectedSort.property);
				setElements(elements.sort((a, b) => a.name - b.name));
			}
		}
	}, [selectedSort]);

	const handleDropDownMenuClick = i => {
		setSelectedSort(sorts[i]);
		setIsDropDownMenuOpen(false);
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
				</Sort>
			</Panel>
			<Grid>
				{isReady ? (
					<>
						{elements.length &&
							elements.map(e => (
								<Article key={e.article} articleData={e} href={`/category/${e.category}/${e.article}`} />
							))}
					</>
				) : (
					<>
						<MirageArticle />
						<MirageArticle />
						<MirageArticle />
						<MirageArticle />
						<MirageArticle />
						<MirageArticle />
						<MirageArticle />
					</>
				)}
			</Grid>
		</>
	);
};
