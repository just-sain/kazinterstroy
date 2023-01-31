import { useContext } from 'react';
import { Store } from '../lib/store';
// styles
import styled from '@emotion/styled';
import Link from 'next/link';

const Wrapper = styled.section`
	width: 100%;
`;

const Heading = styled.h1`
	color: rgb(var(--black));
	text-align: center;
	font-size: 3.6rem;
	font-weight: 700;

	@media screen and (max-width: 720px) {
		font-size: 3rem;
	}
	@media screen and (max-width: 520px) {
		font-size: 2.4rem;
	}
	@media screen and (max-width: 320px) {
		word-break: break-all;
		font-size: 2rem;
	}
`;

const Grid = styled.div`
	margin-top: 3rem;

	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 3rem;

	@media screen and (max-width: 1240px) {
		grid-template-columns: repeat(3, 1fr);
	}
	@media screen and (max-width: 900px) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media screen and (max-width: 570px) {
		grid-template-columns: 1fr;
	}
`;

export const Category = ({ ...props }) => {
	const { state } = useContext(Store);
	const { catalog } = state;

	return (
		<Wrapper {...props}>
			<Heading>Наши категории</Heading>
			<Grid>{!!catalog && catalog.map(c => <Item key={c.id} catalogData={c} />)}</Grid>
		</Wrapper>
	);
};

const Flex = styled(Link)`
	height: 30rem;
	padding: 3rem;
	z-index: 1;
	cursor: pointer;

	display: flex;
	justify-content: center;
	align-items: center;

	box-shadow: var(--outer-shadow), var(--inner-shadow-0);
	background: rgba(var(--real-white), 1);
	border-radius: 1.5rem;

	position: relative;
	transition: box-shadow 0.3s ease 0s;

	&:hover {
		box-shadow: var(--outer-shadow-0), var(--inner-shadow);
	}
`;

const Icon = styled.img`
	width: 80%;
	height: 80%;
	z-index: -1;
	opacity: 0.15;

	pointer-events: none;
	object-fit: contain;
	object-position: center;

	position: absolute;
	top: 50%;
	left: 50%;

	transform: translate(-50%, -50%);
`;

const Text = styled.p`
	color: rgb(var(--primary));
	text-align: center;
	text-transform: uppercase;
	text-shadow: 0 0 1.5rem rgba(var(--primary), 0.4);
	font-size: 3rem;
	font-weight: 700;

	@media screen and (max-width: 720px) {
		font-size: 2.4rem;
	}
`;

const Item = ({ catalogData, ...props }) => {
	return (
		<Flex href={`/catalog/${catalogData.id}`} {...props}>
			<Icon src={`https:${catalogData.icon}`} alt={catalogData.name} />
			<Text>{catalogData.name}</Text>
		</Flex>
	);
};
