import { useEffect, useState } from 'react';
import axios from 'axios';
import { declOfNum } from '../../../utils/declaration';
// components
import Head from 'next/head';
import { Breadcrumb } from '../../../components/breadcrumb';
import { Elements } from '../../../components/elements';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

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

const Category = ({ categoryData, categoryId }) => {
	const { query } = useRouter();
	const [elements, setElements] = useState(null);
	const [isReady, setIsReady] = useState(false);

	const getCategoryElementsData = () => {
		const additionalFields = 'additional_fields=url,brand,images';

		axios
			.get(
				`${process.env.NEXT_PUBLIC_API}/elements?access-token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&limit=250&category=${categoryData.id}&${additionalFields}`
			)
			.then(res => {
				if (!res.data || !res.data?.length) setElements([]);
				else {
					setElements(res.data);
					setIsReady(true);
				}
			});
	};

	useEffect(() => {
		if (!!query.category && !isNaN(query.category)) {
			if (Number(query.category) !== categoryId) {
				setIsReady(false);
			}
		}

		getCategoryElementsData();
	}, [categoryData]);

	const breadcrumbData = [
		{ name: 'Каталог', href: '/' },
		{ name: categoryData.name, href: `/category/${categoryData.id}` }
	];

	return (
		<>
			<Head>
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
						({isReady && elements.length} {isReady && declOfNum(elements.length, ['товар', 'товара', 'товаров'])})
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

	return {
		props: {
			categoryData: categoryData[0],
			categoryId: ctx.query.category
		}
	};
};
