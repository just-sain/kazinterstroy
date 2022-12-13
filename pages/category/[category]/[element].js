import { useContext, useState } from 'react';
import axios from 'axios';
import { declOfNum } from '../../../helpers/declaration';
// components
import Head from 'next/head';
import { Breadcrumb } from '../../../components/breadcrumb';
import { Article } from '../../../components/article';
import styled from '@emotion/styled';
import { AppContext } from '../../../components/context';

const Wrapper = styled.div`
	width: 100%;
`;

const Heading = styled.h1`
	margin-bottom: 3rem;

	color: rgb(var(--black));
	text-align: center;
	font-size: 3.2rem;
	font-weight: 400;

	span {
		color: rgb(var(--light-gray));
		font-weight: 100;
	}
`;

const Box = styled.div`
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

const Category = ({ elements, categoryId, elementId }) => {
	const { menu } = useContext(AppContext);

	const [categoryData] = useState(menu && menu.find(m => m.id === Number(categoryId)));
	const [elementData] = useState(menu && menu.find(m => m.id === Number(elementId)));

	const breadcrumbData = [
		{ name: 'Каталог', href: '/category' },
		{ name: categoryData.name, href: `/category/${categoryData.id}` },
		{ name: elementData.name, href: `/category/${categoryData.id}/${elementData.id}` }
	];

	console.log(elements);

	return (
		<>
			<Head>
				<title>{elementData.name} / KazInterStroy</title>
			</Head>
			<Wrapper>
				<Breadcrumb links={breadcrumbData} withMarginBottom />
				<Heading>
					{elementData.name}
					<br />
					<span>
						({elements.length} {declOfNum(elements.length, ['элемент', 'элемента', 'элементов'])})
					</span>
				</Heading>
				<Box>
					{elements.map(e => (
						<Article
							key={e.article}
							articleData={e}
							href={`/category/${categoryData.id}/${elementData.id}/${e.article}`}
						/>
					))}
				</Box>
			</Wrapper>
		</>
	);
};

export default Category;

export const getServerSideProps = async ctx => {
	if (
		!ctx?.query ||
		!ctx.query.category ||
		isNaN(ctx.query.category) ||
		!ctx.query.element ||
		isNaN(ctx.query.element)
	) {
		return { notFound: true };
	}

	// menu
	const { data: menu } = await axios.get(
		`${process.env.NEXT_PUBLIC_API}/categories?access-token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
	);

	// elements
	const { data: elements } = await axios.get(
		`${process.env.NEXT_PUBLIC_API}/elements?access-token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&limit=250&category=${ctx.query.element}&additional_fields=url,brand,images`
	);

	return {
		props: {
			menu,
			elements,
			categoryId: ctx.query.category,
			elementId: ctx.query.element
		}
	};
};
