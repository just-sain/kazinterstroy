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

	console.log(catalog);

	return (
		<Wrapper {...props}>
			<Heading>Наши категории</Heading>
			<Grid>{!!catalog && catalog.map(c => <Item key={c.id} catalogData={c} />)}</Grid>
		</Wrapper>
	);
};

const Flex = styled(Link)`
	height: 30rem;
	padding: 3rem 1.5rem;
	z-index: 1;
	cursor: pointer;

	display: flex;
	justify-content: center;
	align-items: center;

	border-radius: 1rem;

	position: relative;

	&:nth-child(1n + 1) {
		background: linear-gradient(
			165deg,
			rgba(0, 159, 255, 0.85) 0%,
			rgba(255, 1, 181, 0.85) 47%,
			rgba(255, 0, 0, 0.85) 100%
		);
	}

	&:nth-child(2n + 1) {
		background: linear-gradient(
			344deg,
			rgba(255, 1, 181, 0.85) 0%,
			rgba(0, 159, 255, 0.85) 24%,
			rgba(255, 0, 176, 0.85) 64%,
			rgba(255, 0, 0, 0.85) 100%
		);
	}

	&:nth-child(3n + 1) {
		background: linear-gradient(
			168deg,
			rgba(153, 0, 255, 0.85) 0%,
			rgba(255, 0, 0, 0.85) 50%,
			rgba(255, 149, 0, 0.85) 100%
		);
	}
`;

const BgItem = styled.img`
	width: 65%;
	height: 65%;
	z-index: -1;
	opacity: 0.4;
	filter: invert(100%);

	pointer-events: none;
	object-fit: contain;
	object-position: center;

	position: absolute;
	top: 50%;
	left: 50%;

	transform: translate(-50%, -50%);
`;

const Text = styled.p`
	color: rgb(var(--white));
	text-align: center;
	text-transform: uppercase;
	text-shadow: 0 0 2.5rem rgb(var(--white));
	font-size: 3rem;
	font-weight: 700;

	@media screen and (max-width: 720px) {
		font-size: 2.4rem;
	}
`;

const Item = ({ catalogData, ...props }) => {
	return (
		<Flex href={`/catalog/${catalogData.id}`} {...props}>
			<BgItem src={`https:${catalogData.icon}`} />
			<Text>{catalogData.name}</Text>
		</Flex>
	);
};
