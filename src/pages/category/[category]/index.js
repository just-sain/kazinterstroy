import styled from '@emotion/styled';
import axios from 'axios';
import Head from 'next/head';
import { Breadcrumb } from '../../../components/breadcrumb';
import { Elements } from '../../../components/elements';
import { sendDefaultPagePropsRequest } from '../../../lib/api';
import { declOfNum } from '../../../utils/declaration';

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

const Category = ({ categoryData, elementsData }) => {
	const breadcrumbData = [
		{ name: 'Каталог', href: '/' },
		{ name: categoryData.name, href: `/category/${categoryData.id}` },
	];

	return (
		<>
			<Head>
				<meta name='robots' content='index, follow' />
				<meta name='googlebot' content='index, follow' />

				<meta
					name='description'
					content={`${categoryData.name}. Рассмотрите наши продукты и выберите себе нужный товар / KazInterStroy`}
				/>
				<meta
					name='keywords'
					content={`kazinterstroy, интернет магазин, kazstroy, казинтерстрой, казстрой, каталог, категория, меню, товары, ${categoryData.name}`}
				/>

				<meta property='og:title' content={`${categoryData.name} / KazInterStroy`} />
				<meta
					property='og:description'
					content={`${categoryData.name}. Рассмотрите наши продукты и выберите себе нужный товар / KazInterStroy`}
				/>

				<meta name='twitter:title' content={`${categoryData.name} / KazInterStroy`} />
				<meta
					name='twitter:description'
					content={`${categoryData.name}. Рассмотрите наши продукты и выберите себе нужный товар / KazInterStroy`}
				/>

				<title>{categoryData.name} / KazInterStroy</title>
			</Head>
			<Wrapper>
				<Breadcrumb links={breadcrumbData} withMarginBottom />
				<Heading>
					{categoryData.name}
					<br />
					<span>
						({elementsData.length} {declOfNum(elementsData.length, ['товар', 'товара', 'товаров'])})
					</span>
				</Heading>
				<Elements elements={elementsData} />
			</Wrapper>
		</>
	);
};

export default Category;

export const getStaticPaths = async () => {
	const paths = [];

	const { data: categoryData } = await axios.get(
		`${process.env.NEXT_PUBLIC_API}/categories?access-token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&`
	);

	for (const c of categoryData) {
		paths.push({ params: { category: String(c.id) } });
	}

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps = async ({ params }) => {
	// default props
	const defaultData = await sendDefaultPagePropsRequest();

	// category data
	if (!params || !params.category || isNaN(params.category)) return { notFound: true };

	const { data: categoryData } = await axios.get(
		`${process.env.NEXT_PUBLIC_API}/categories?access-token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&id=${params.category}`
	);
	if (!categoryData || !categoryData.length) return { notFound: true };

	// elements data
	const additionalFields = 'additional_fields=url,brand,images';

	const { data: elementsData } = await axios.get(
		`${process.env.NEXT_PUBLIC_API}/elements?access-token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&limit=250&category=${params.category}&${additionalFields}`
	);

	return {
		props: {
			// default props
			contactData: defaultData.contactData,
			catalogData: defaultData.catalogData,
			menuData: defaultData.menuData,
			// another
			categoryData: categoryData[0],
			categoryId: params.category,
			elementsData: elementsData,
		},
		revalidate: 300,
	};
};
