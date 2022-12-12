import { useState } from 'react';
import axios from 'axios';
// components
import Head from 'next/head';
import styled from '@emotion/styled';
import Link from 'next/link';

const Wrapper = styled.div`
	width: 100%;
`;
const Category = ({ menu, elements, categoryId, elementId }) => {
	// const [categoryData] = useState(menu.find(m => m.id === Number(categoryId)));
	// const [categoryItems] = useState(
	// 	menu
	// 		.filter(m => m.level === 2)
	// 		.filter(second => categoryData.left < second.left && second.right < categoryData.right)
	// );
	// console.log(categoryItems);

	console.log(elementId);
	console.log(elements);

	return (
		<>
			<Head>
				<title>{'asdf'} / KazInterStroy</title>
			</Head>
			<div>yeahh...</div>
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
		`${process.env.NEXT_PUBLIC_API}/elements?access-token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&limit=250&category=${ctx.query.element}`
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
