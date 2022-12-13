import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
// components
import Head from 'next/head';
import Link from 'next/link';
import { Error404Page } from '../../404';
import { Button } from '../../../components/button';
import styled from '@emotion/styled';
import { AiFillCaretLeft } from 'react-icons/ai';
import { Breadcrumb } from '../../../components/breadcrumb';
import { AppContext } from '../../../components/context';

const Wrapper = styled.div`
	width: 100%;
`;

const Heading = styled.div`
	margin-bottom: 2rem;

	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 1rem;

	h1 {
		text-align: center;
		font-size: 3.2rem;
		font-weight: 400;
	}
`;

const Back = styled(Link)`
	padding: 0.5rem;

	display: flex;
	align-items: flex-end;

	background: rgb(var(--error));
	border-radius: 0.5rem;

	color: rgb(var(--white));
	font-size: 2.4rem;
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

const Category = ({ categoryId }) => {
	const { query } = useRouter();
	const { menu } = useContext(AppContext);

	const [categoryData, setCategoryData] = useState(menu && menu.find(m => m.id === Number(categoryId)));
	const [categoryItems, setCategoryItems] = useState(
		menu &&
			menu
				.filter(m => m.level === 2)
				.filter(second => categoryData.left < second.left && second.right < categoryData.right)
	);

	const breadcrumbData = [
		{ name: 'Каталог', href: '/category' },
		{ name: categoryData.name, href: `/category/${categoryData.id}` }
	];

	useEffect(() => {
		if (!query?.category || isNaN(query?.category)) return <Error404Page />;
		if (query.category === categoryData.id) return;

		setCategoryData(menu && menu.find(m => m.id === Number(query.category)));
		setCategoryItems(
			menu &&
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
				<Breadcrumb links={breadcrumbData} withMarginBottom />
				<Heading>
					<Back href={`/category`} title='Назад'>
						<AiFillCaretLeft />
					</Back>
					<h1>{categoryData.name}</h1>
				</Heading>
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
