import { memo } from 'react';
import { declOfNum } from '../helpers/declaration';
// components
import Link from 'next/link';
import styled from '@emotion/styled';

const Grid = styled.div`
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

const Item = styled(Link)`
	padding: 2rem 1.5rem;
	overflow: hidden;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	gap: 1rem;

	border-radius: 1.25rem;

	color: rgb(var(--white));
	text-align: center;

	position: relative;

	transform: scale(1, 1);
	transition: transform 0.6s ease 0s;

	&::before {
		content: '';
		width: 100%;
		height: 100%;
		z-index: -2;

		border-radius: 1.25rem;
		background: rgb(var(--primary));

		position: absolute;
		top: 0;
		left: 0;
	}

	&::after {
		content: '';
		width: 100%;
		height: 100%;
		z-index: -1;

		border-radius: 1.25rem;
		background: rgb(var(--secondary));

		position: absolute;
		top: 0;
		left: 0;

		transform: scaleX(0);
		transform-origin: right;
		transition: transform 0.4s ease 0s;
	}

	&:hover {
		transform: scale(1.1);

		&::after {
			transform: scaleX(1);
			transform-origin: left;
		}
	}

	h3 {
		font-weight: 500;
	}

	p {
		color: rgb(var(--black));
	}
`;

export const SecondLevel = memo(({ categoryItems, categoryId }) => {
	return (
		<>
			<Grid>
				{categoryItems.map(i => (
					<Item href={`/category/${categoryId}/${i.id}`} key={i.id}>
						<h3>{i.name}</h3>
						<p>
							{i.elements} {declOfNum(i.elements, ['элемент', 'элемента', 'элементов'])}
						</p>
					</Item>
				))}
			</Grid>
		</>
	);
});
