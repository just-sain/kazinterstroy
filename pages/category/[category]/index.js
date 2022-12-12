import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
// components
import Head from 'next/head';
import Link from 'next/link';
import styled from '@emotion/styled';
import { Error404Page } from '../../404';

const Wrapper = styled.div`
	width: 100%;
`;

const Heading = styled.h1`
	margin-bottom: 2rem;

	text-align: center;
	font-size: 3.2rem;
	font-weight: 300;
`;

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

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	gap: 1rem;

	background: rgb(var(--primary));
	border-radius: 1.25rem;

	color: rgb(var(--white));
	text-align: center;

	h3 {
		font-weight: 500;
	}

	p {
		color: rgb(var(--black));
	}
`;

const Category = ({ menu, categoryId }) => {
	const { query } = useRouter();
	const [categoryData, setCategoryData] = useState(menu.find(m => m.id === Number(categoryId)));
	const [categoryItems, setCategoryItems] = useState(
		menu
			.filter(m => m.level === 2)
			.filter(second => categoryData.left < second.left && second.right < categoryData.right)
	);

	useEffect(() => {
		if (!query?.category || isNaN(query?.category)) return <Error404Page />;
		if (query.category === categoryData.id) return;

		setCategoryData(menu.find(m => m.id === Number(query.category)));
		setCategoryItems(
			menu
				.filter(m => m.level === 2)
				.filter(second => categoryData.left < second.left && second.right < categoryData.right)
		);
	}, [query]);

	return (
		<>
			<Head>
				<title>{categoryData.name} / KazInterStroy</title>
			</Head>
			<Wrapper>
				<Heading>{categoryData.name}</Heading>
				<Grid>
					{categoryItems.map(i => (
						<Item href={`/category/${categoryData.id}/${i.id}`} key={i.id}>
							<h3>{i.name}</h3>
							<p>
								{i.elements} {i.elements === 1 ? 'элемент' : i.elements < 6 ? 'элемента' : 'элементов'}
							</p>
						</Item>
					))}
				</Grid>
			</Wrapper>
		</>
	);
};

export default Category;

export const getServerSideProps = async ctx => {
	if (!ctx?.query || !ctx.query.category || isNaN(ctx.query.category)) return { notFound: true };

	// menu
	const { data: menu } = await axios.get(
		`${process.env.NEXT_PUBLIC_API}/categories?access-token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
	);

	return {
		props: {
			menu,
			categoryId: ctx.query.category
		}
	};
};
