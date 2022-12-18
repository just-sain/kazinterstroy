import { useState } from 'react';
import axios from 'axios';
import { declOfNum } from '../../../helpers/declaration';
// components
import Head from 'next/head';
import { Breadcrumb } from '../../../components/breadcrumb';
import styled from '@emotion/styled';
import { Elements } from '../../../components/elements';

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

const Category = ({ categoryData, elements }) => {
	const breadcrumbData = [
		{ name: 'Каталог', href: '/category' },
		{ name: categoryData.name, href: `/category/${categoryData.id}` }
	];

	const [isReady, setIsReady] = useState(true);

	console.log('asdf');

	return (
		<>
			<Head>
				<title>{categoryData.name} / KazInterStroy</title>
			</Head>
			<Wrapper>
				<Breadcrumb links={breadcrumbData} withMarginBottom />
				<Heading>
					{categoryData.name}
					<br />
					<span>
						({elements.length} {declOfNum(elements.length, ['элемент', 'элемента', 'элементов'])})
					</span>
				</Heading>
				<Elements isReady={isReady} elements={elements} />
			</Wrapper>
		</>
	);
};

export default Category;

export const getServerSideProps = async ctx => {
	if (!ctx?.query || !ctx.query.category || isNaN(ctx.query.category)) return { notFound: true };

	// category data
	const { data: categoryData } = await axios.get(
		`${process.env.NEXT_PUBLIC_API}/categories?access-token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&id=${ctx.query.category}`
	);
	if (!categoryData || !categoryData.length) return { notFound: true };

	// items
	const additionalFields = 'additional_fields=url,brand,images';
	const { data: elements } = await axios.get(
		`${process.env.NEXT_PUBLIC_API}/elements?access-token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&limit=250&category=${ctx.query.category}&${additionalFields}`
	);

	if (!elements || !elements.length) return { notFound: true };

	return {
		props: {
			categoryData: categoryData[0],
			elements
		}
	};
};
