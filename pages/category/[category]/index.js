import axios from 'axios';
import { declOfNum } from '../../../helpers/declaration';
// components
import Head from 'next/head';
import { Breadcrumb } from '../../../components/breadcrumb';
import { SecondLevel } from '../../../components/secondLevel';
import styled from '@emotion/styled';

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

const Category = ({ categoryData, categoryItems }) => {
	const breadcrumbData = [
		{ name: 'Каталог', href: '/category' },
		{ name: categoryData.name, href: `/category/${categoryData.id}` }
	];

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
						({categoryItems.length} {declOfNum(categoryItems.length, ['элемент', 'элемента', 'элементов'])})
					</span>
				</Heading>
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

	const categoryData = menu.find(m => m.id === Number(ctx.query.category));
	if (!categoryData) return { notFound: true };

	// categoryItems
	const categoryItems = menu
		.filter(m => m.level === 2)
		.filter(second => categoryData.left < second.left && second.right < categoryData.right);

	return {
		props: {
			categoryData,
			categoryItems
		}
	};
};
