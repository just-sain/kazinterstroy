import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
// components
import Head from 'next/head';
import styled from '@emotion/styled';
import { Breadcrumb } from '../../../components/breadcrumb';
import { SecondLevel } from '../../../components/secondLevel';

const Wrapper = styled.div`
	width: 100%;
`;

const Heading = styled.h1`
	margin-bottom: 2rem;

	text-align: center;
	font-size: 3.2rem;
	font-weight: 400;
`;

const Category = ({ categoryId, menu }) => {
	const { query } = useRouter();

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

	// checking menu state
	useEffect(() => {
		if (!!query?.category && !isNaN(query?.category)) {
			setCategoryData(menu && menu.find(m => m.id === Number(query.category)));
			setCategoryItems(
				menu &&
					menu
						.filter(m => m.level === 2)
						.filter(second => categoryData.left < second.left && second.right < categoryData.right)
			);
		}
	}, [query]);

	return (
		<>
			<Head>
				<title>{categoryData.name} / KazInterStroy</title>
			</Head>
			<Wrapper>
				<Breadcrumb links={breadcrumbData} withMarginBottom />
				<Heading>{categoryData.name}</Heading>
				<SecondLevel categoryItems={categoryItems} categoryId={categoryData.id} />
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
